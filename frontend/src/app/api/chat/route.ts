import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop()?.content || "";

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing. Providing mock AI response.");
      
      let mockReply = "I am operating in offline mode because the Gemini API key is missing. However, I can still help! ";
      const msgLower = lastUserMessage.toLowerCase();
      
      if (msgLower.includes("email") || msgLower.includes("write")) {
        mockReply += "**Draft Email:**\n\nSubject: Following up on my application\n\nHi [Hiring Manager],\n\nI recently applied for the open role and wanted to express my strong interest in joining your team.\n\nBest,\n[Your Name]";
      } else if (msgLower.includes("job") || msgLower.includes("find")) {
        mockReply += "To find jobs, visit the 'Find Jobs' tab! There you can filter by Full-time, Part-time, Salary, and Location.";
      } else {
        mockReply += "I am a Job Finder and Career Agent. I can help you write cover letters, emails, and guide your job search. Let me know what you need!";
      }

      // Add a slight delay for realism
      await new Promise(resolve => setTimeout(resolve, 800));
      return NextResponse.json({ text: mockReply });
    }

    // Format messages for Gemini API
    const contents = messages.map((msg: any) => ({
      role: msg.role === "ai" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    // Inject system instruction dynamically into conversational history for gemini-pro compatibility
    const systemPrompt = "You are JobSpark's AI Career Assistant. Act exclusively as a Job Finder and HR expert. You help candidates write professional emails, find jobs on the platform, review their resumes, and provide career advice. If they ask for an email, ask for the subject, purpose, and recipient if missing. Then generate a well-structured professional email. Be extremely helpful and direct. Output in markdown.";
    
    const rawContents = [
      { role: "user", parts: [{ text: "System Instructions: " + systemPrompt }] },
      { role: "model", parts: [{ text: "Understood. I will act strictly as the JobSpark AI Career Assistant." }] },
      ...contents
    ];

    const modifiedContents: any[] = [];
    for (const msg of rawContents) {
      if (modifiedContents.length > 0 && modifiedContents[modifiedContents.length - 1].role === msg.role) {
        modifiedContents[modifiedContents.length - 1].parts[0].text += "\n\n" + msg.parts[0].text;
      } else {
        modifiedContents.push({ role: msg.role, parts: [{ text: msg.parts[0].text }] });
      }
    }

    const payload = {
      contents: modifiedContents,
      generationConfig: { maxOutputTokens: 800, temperature: 0.7 }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API Error:", errorData);
      return NextResponse.json({ error: "Failed to generate response from AI." }, { status: response.status });
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      return NextResponse.json({ error: "No response text found from AI." }, { status: 500 });
    }

    return NextResponse.json({ text: candidateText });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
