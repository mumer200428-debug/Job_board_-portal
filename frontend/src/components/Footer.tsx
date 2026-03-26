"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoSVG } from "./Navbar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");
      setMessage("");
    }, 1200);
  };

  return (
    <footer className="border-t border-brand-100 bg-white pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <LogoSVG />
              <span className="text-xl font-bold tracking-tight text-slate-900">
                JobSpark
              </span>
            </Link>
            <p className="max-w-xs text-sm text-brand-600 leading-relaxed mb-6">
              Empowering global talent to find their dream roles in top-tier companies. AI-powered matching that works.
            </p>
            <div className="flex items-center gap-4 text-sm font-medium">
              <Link href="#" className="text-brand-400 hover:text-brand-600">
                X (Twitter)
              </Link>
              <Link href="#" className="text-brand-400 hover:text-brand-600">
                LinkedIn
              </Link>
              <Link href="#" className="text-brand-400 hover:text-brand-600">
                GitHub
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-brand-950 mb-4">Candidates</h4>
            <ul className="space-y-3 text-sm text-brand-600">
              <li><Link href="/jobs" className="hover:text-brand-900">Browse Jobs</Link></li>
              <li><Link href="#" className="hover:text-brand-900">Career Advice</Link></li>
              <li><Link href="/dashboard/candidate" className="hover:text-brand-900">Candidate Dashboard</Link></li>
              <li><Link href="#" className="hover:text-brand-900">Resume Builder</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-brand-950 mb-4">Employers</h4>
            <ul className="space-y-3 text-sm text-brand-600">
              <li><Link href="#" className="hover:text-brand-900">Post a Job</Link></li>
              <li><Link href="#" className="hover:text-brand-900">Search Resumes</Link></li>
              <li><Link href="/dashboard/company" className="hover:text-brand-900">Employer Dashboard</Link></li>
              <li><Link href="#" className="hover:text-brand-900">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-brand-950 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-brand-600">
              <li><Link href="#" className="hover:text-brand-900">About Us</Link></li>
              <li><Link href="#" className="hover:text-brand-900">Contact</Link></li>
              <li><Link href="#" className="hover:text-brand-900">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-brand-900">Terms of Service</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-brand-950 mb-4">Contact Us</h4>
            {isSuccess ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                <span className="font-semibold block mb-1">Message Sent!</span>
                Thank you for reaching out. Our team will get back to you shortly.
              </div>
            ) : (
              <form className="space-y-3" onSubmit={handleSubmit}>
                <Input placeholder="Your email" className="h-9 text-sm" required type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={isSubmitting} />
                <textarea placeholder="How can we help?" className="w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500 min-h-[80px]" required value={message} onChange={e => setMessage(e.target.value)} disabled={isSubmitting}></textarea>
                <Button size="sm" className="w-full bg-brand-600" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-brand-100 pt-8 text-xs text-brand-500">
          <p>© {new Date().getFullYear()} JobSpark Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-brand-900">Privacy</Link>
            <Link href="#" className="hover:text-brand-900">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
