"use client";

import { useState, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "ai";
  content: string;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Hi there! I'm your AI career assistant. I can help you draft professional emails to recruiters or hiring managers! What is the subject, purpose, and who are you writing to?",
    },
  ]);
  const [input, setInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleOpenWithJob = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (!customEvent.detail) return;
      
      const { title, company, description, requirements } = customEvent.detail;
      setIsOpen(true);
      
      const aiMsg = `**Application Review: ${title} at ${company}**\n\nBefore you finalize your application, please review the complete job details below to ensure you meet all requirements.\n\n### Job Description\n${description}\n\n### Requirements & Qualifications\n${requirements}\n\nIf you have all the required skills and documents, you can click the **Confirm Application** button on the job page to submit your application, or let me know if you need help drafting a cover letter!`;
      
      setMessages((prev) => [...prev, { role: "ai", content: aiMsg }]);
    };

    window.addEventListener("openAIAssistantWithJob", handleOpenWithJob);
    return () => window.removeEventListener("openAIAssistantWithJob", handleOpenWithJob);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    const newMessages = [...messages, { role: "user" as const, content: userMsg }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        throw new Error("API response error");
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", content: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Sorry, I am having trouble connecting to my servers right now." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Chat Window */}
      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-80 sm:w-96 h-[450px] flex flex-col shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-300 border-brand-200">
          <CardHeader className="bg-brand-900 text-white rounded-t-xl p-4 flex flex-row items-center space-y-0">
            <div className="flex bg-brand-600 p-1.5 rounded-md mr-3 shadow-sm">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold leading-none">Career Assistant AI</h3>
              <p className="text-xs text-brand-200 mt-1 flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Powered by TalentConnect
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto text-brand-200 hover:text-white hover:bg-brand-800 h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-4 overflow-hidden bg-brand-50/50">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col gap-1 max-w-[85%]",
                    msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap prose prose-sm max-w-none",
                      msg.role === "user"
                        ? "bg-brand-600 text-white rounded-tr-sm shadow-sm prose-invert"
                        : "bg-white border text-brand-950 rounded-tl-sm shadow-sm border-brand-100"
                    )}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex flex-col gap-1 max-w-[85%] mr-auto items-start">
                  <div className="px-4 py-2 rounded-2xl text-sm bg-white border text-brand-500 rounded-tl-sm shadow-sm border-brand-100 italic flex items-center gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="mt-4 flex items-center gap-2">
              <Input
                placeholder="Ask for advice..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
                className="bg-white border-brand-200 focus-visible:ring-brand-500 rounded-full"
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={isLoading}
                className="rounded-full shrink-0 shadow-sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating Action Button */}
      <Button
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 bg-brand-600 hover:bg-brand-700",
          isOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        )}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
}
