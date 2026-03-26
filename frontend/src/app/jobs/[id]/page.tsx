"use client";

import { useState, useEffect } from "react";
import { notFound, useRouter, useParams } from "next/navigation";
import { COMPANIES } from "@/lib/dummy-data";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, DollarSign, Clock, Building2, Briefcase, Share2, Bookmark, CheckCircle2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = parseInt(params.id as string, 10);
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user, appliedJobs, applyForJob } = useAuth();
  const router = useRouter();
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    fetch(`/api/v1/jobs/${jobId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Job not found");
        return res.json();
      })
      .then((data) => setJob(data))
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [jobId]);

  if (loading) {
    return <div className="min-h-screen bg-brand-50 flex items-center justify-center text-brand-500 py-20">Loading job details...</div>;
  }

  if (!job) {
    notFound();
  }

  const company = COMPANIES.find(c => c.id === job.company_id);
  const timeAgo = !isNaN(new Date(job.created_at).getTime()) 
    ? formatDistanceToNow(new Date(job.created_at), { addSuffix: true }) 
    : "Recently";
    
  // Default values for detailed view
  const jobType = "Full-time";
  const experience = "Mid-Senior Level";

  const hasApplied = appliedJobs?.includes(job.id);

  const handleApply = () => {
    if (!user) {
      alert("Please sign in or register to apply for jobs!");
      router.push("/login");
      return;
    }

    if (!hasReviewed) {
      const fullDesc = `${job.description}\nJoin our engineering team to build scalable and modern solutions. We are looking for passionate individuals who thrive in a fast-paced environment and have a deep understanding of standard industry practices.`;
      const reqsText = `* 3+ years of experience in modern web development.\n* Deep knowledge of JavaScript, TypeScript, and React.\n* Experience with Next.js App Router and server-side rendering.\n* Strong understanding of Tailwind CSS.\n* Required Documents: Updated Resume and Cover Letter.`;

      const applyEvent = new CustomEvent("openAIAssistantWithJob", {
        detail: {
          title: job.title,
          company: company?.name || "Company",
          description: fullDesc,
          requirements: reqsText,
          jobId: job.id,
        },
      });
      window.dispatchEvent(applyEvent);
      setHasReviewed(true);
      return;
    }

    applyForJob(job.id);
  };

  return (
    <div className="min-h-screen bg-brand-50 pb-20">
      {/* Header Banner */}
      <div className="bg-brand-950 pt-12 pb-24 text-white">
        <div className="container mx-auto px-4 sm:px-8">
          <Link href="/jobs" className="text-brand-300 hover:text-white mb-8 inline-flex items-center text-sm font-medium transition-colors">
            <ChevronLeft className="mr-1 h-4 w-4" /> Back to Jobs
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex gap-6">
              <div className="h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-600 hidden sm:flex shadow-xl shadow-brand-950/20">
                <Building2 className="h-10 w-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl tracking-tight text-white mb-2">
                  {job.title}
                </h1>
                <div className="flex items-center gap-3 text-brand-200">
                  <span className="font-semibold text-lg">{company?.name || "Company"}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-600"></span>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {job.location}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 shrink-0">
              <Button size="icon" variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white h-12 w-12 rounded-xl">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white h-12 w-12 rounded-xl">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-8 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-100">
              <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-brand-50">
                <div className="flex items-center gap-2 text-brand-600 bg-brand-50 px-4 py-2 rounded-lg font-medium">
                  <DollarSign className="h-5 w-5" /> {job.salary}
                </div>
                <div className="flex items-center gap-2 text-brand-600 bg-brand-50 px-4 py-2 rounded-lg font-medium">
                  <Briefcase className="h-5 w-5" /> {jobType}
                </div>
                <div className="flex items-center gap-2 text-brand-600 bg-brand-50 px-4 py-2 rounded-lg font-medium">
                  <Clock className="h-5 w-5" /> {timeAgo}
                </div>
              </div>

              <div className="prose prose-brand max-w-none">
                <h2 className="text-xl font-bold text-brand-950 mb-4">About the role</h2>
                <p className="text-brand-700 leading-relaxed mb-6">{job.description}</p>
                <p className="text-brand-700 leading-relaxed">
                  Join our engineering team to build scalable and modern solutions. We are looking for passionate individuals who thrive in a fast-paced environment and have a deep understanding of standard industry practices.
                </p>
                
                <h3 className="text-lg font-bold text-brand-950 mt-8 mb-4">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2 text-brand-700">
                  <li>3+ years of experience in modern web development.</li>
                  <li>Deep knowledge of JavaScript, TypeScript, and React.</li>
                  <li>Experience with Next.js App Router and server-side rendering.</li>
                  <li>Strong understanding of Tailwind CSS.</li>
                </ul>

                <h3 className="text-lg font-bold text-brand-950 mt-8 mb-4">What we offer</h3>
                <ul className="list-disc pl-5 space-y-2 text-brand-700">
                  <li>Competitive salary and equity package.</li>
                  <li>Comprehensive health, dental, and vision insurance.</li>
                  <li>Flexible remote work policy.</li>
                  <li>Learning and development stipend.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            <Card className="shadow-sm border-brand-100 sticky top-24">
              <CardContent className="p-6">
                {hasApplied ? (
                  <Button size="lg" className="w-full h-14 text-base font-bold bg-green-500 hover:bg-green-600 text-white shadow-md mb-4" disabled>
                    <CheckCircle2 className="mr-2 h-5 w-5" /> Already Applied
                  </Button>
                ) : (
                  <Button size="lg" className="w-full h-14 text-base font-bold bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white shadow-lg shadow-brand-500/20 mb-4" onClick={handleApply}>
                    {hasReviewed ? "Confirm Application" : "Apply Now"}
                  </Button>
                )}
                
                <p className="text-center text-sm text-brand-500 mb-6">
                  Respond within 3-5 business days.
                </p>

                <div className="space-y-4 pt-6 border-t border-brand-50">
                  <h3 className="font-semibold text-brand-950">Job Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-500">Experience</span>
                      <span className="font-medium text-brand-900">{experience}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-500">Location</span>
                      <span className="font-medium text-brand-900">{job.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-500">Job Type</span>
                      <span className="font-medium text-brand-900">{jobType}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
