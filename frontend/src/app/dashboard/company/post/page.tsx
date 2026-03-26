"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { JOBS } from "@/lib/dummy-data";

export default function PostJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob = {
      id: Math.floor(Math.random() * 10000),
      title,
      description,
      location,
      salary,
      company_id: 1, // Acme Corp by default
      is_active: true,
      created_at: new Date().toISOString()
    };
    JOBS.unshift(newJob as any); // Prepend so it shows up at the top
    router.push('/dashboard/company');
  };

  return (
    <div className="min-h-screen bg-brand-50 pb-20 pt-8">
      <div className="container mx-auto px-4 sm:px-8 max-w-3xl space-y-8">
        <Link href="/dashboard/company" className="text-brand-500 hover:text-brand-900 flex items-center gap-2 text-sm font-medium transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        
        <div>
          <h1 className="text-3xl font-bold text-brand-950 flex items-center gap-3">
            Post a New Job
          </h1>
          <p className="text-brand-600 mt-2">Fill out the details below to publish a position publicly.</p>
        </div>

        <Card className="shadow-smooth border-brand-100">
          <CardHeader className="border-b border-brand-50 pb-4 bg-white/50">
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent className="py-8 space-y-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-brand-900 mb-2">Job Title</label>
                  <Input type="text" required placeholder="e.g. Senior Product Designer" className="h-11 bg-white" value={title} onChange={e => setTitle(e.target.value)} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-900 mb-2">Location</label>
                  <Input type="text" required placeholder="e.g. Remote, Local" className="h-11 bg-white" value={location} onChange={e => setLocation(e.target.value)} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-900 mb-2">Salary Range</label>
                  <Input type="text" required placeholder="e.g. $120k - $150k" className="h-11 bg-white" value={salary} onChange={e => setSalary(e.target.value)} />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-brand-900 mb-2">Job Description</label>
                  <textarea 
                    required 
                    className="w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500 min-h-[150px]"
                    placeholder="Describe the responsibilities, requirements, and perks..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-brand-50">
                <Button type="button" variant="ghost" asChild>
                  <Link href="/dashboard/company">Cancel</Link>
                </Button>
                <Button type="submit" size="lg" className="bg-brand-600">
                  Publish Job
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
