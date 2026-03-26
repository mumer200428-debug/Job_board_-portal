"use client";

import { CURRENT_USER, getJobDetails, getCompanyForJob } from "@/lib/dummy-data";
import { useAuth } from "@/lib/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Building2, Calendar, FileText, CheckCircle2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export default function CandidateDashboard() {
  const { user, token, isLoading, appliedJobs } = useAuth();
  
  // Use user from context if loaded, else fallback to null state handling
  const displayUser = user || CURRENT_USER;
  
  const [resumeName, setResumeName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (user?.email) {
      const storedSkills = localStorage.getItem(`elevate_skills_${user.email}`);
      if (storedSkills) {
        setSkills(JSON.parse(storedSkills));
      }
    }
  }, [user]);

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSkill.trim() && user?.email) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      localStorage.setItem(`elevate_skills_${user.email}`, JSON.stringify(updatedSkills));
      setNewSkill("");
      setIsAddingSkill(false);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    if (user?.email) {
      const updatedSkills = skills.filter(s => s !== skillToRemove);
      setSkills(updatedSkills);
      localStorage.setItem(`elevate_skills_${user.email}`, JSON.stringify(updatedSkills));
    }
  };

  useEffect(() => {
    const storedResume = localStorage.getItem("elevate_resume");
    if (storedResume) {
      setResumeName(storedResume);
    }
  }, []);
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const name = e.target.files[0].name;
      setResumeName(name);
      localStorage.setItem("elevate_resume", name);
    }
  };

  const handleDeleteResume = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setResumeName(null);
    localStorage.removeItem("elevate_resume");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (isLoading) {
    return <div className="min-h-screen bg-brand-50 flex items-center justify-center">Loading...</div>;
  }

  if (!user || user.role !== "candidate") {
    return <div className="min-h-screen bg-brand-50 flex items-center justify-center text-brand-600">You must be logged in as a candidate to view this dashboard.</div>;
  }

  return (
    <div className="min-h-screen bg-brand-50 pb-20 pt-8">
      <div className="container mx-auto px-4 sm:px-8 max-w-5xl space-y-8">
        
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white p-8 rounded-2xl shadow-sm border border-brand-100">
          <div className="h-24 w-24 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-3xl font-bold shadow-inner">
            {displayUser.name.charAt(0)}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-brand-950">{displayUser.name}</h1>
            <p className="text-brand-600 mt-1">{displayUser.email} • candidate</p>
            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2 items-center">
              {skills.length === 0 && !isAddingSkill && (
                <span className="text-sm text-brand-400 italic mr-2">No skills added yet.</span>
              )}
              {skills.map((skill, idx) => (
                <Badge key={idx} variant="secondary" className="bg-brand-50 text-brand-700 flex items-center gap-1">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="hover:text-red-500 ml-1 h-3 w-3 inline-flex items-center justify-center rounded-full leading-none">&times;</button>
                </Badge>
              ))}
              {isAddingSkill ? (
                <input 
                  type="text" 
                  value={newSkill} 
                  onChange={(e) => setNewSkill(e.target.value)} 
                  onKeyDown={handleAddSkill}
                  onBlur={() => setIsAddingSkill(false)}
                  className="h-6 text-xs px-2 rounded border border-brand-200 focus:outline-none focus:ring-1 focus:ring-brand-500 w-24 bg-white"
                  autoFocus
                  placeholder="Type & Enter"
                />
              ) : (
                <Badge 
                  variant="outline" 
                  className="border-brand-200 text-brand-500 cursor-pointer hover:bg-brand-50 hover:text-brand-700 transition-colors"
                  onClick={() => setIsAddingSkill(true)}
                >
                  + Add Skill
                </Badge>
              )}
            </div>
          </div>
          <div className="w-full sm:w-auto mt-4 sm:mt-0">
            <div className="bg-green-50 text-green-700 text-sm font-semibold px-4 py-2 rounded-xl flex items-center justify-center gap-2 border border-green-200">
              <CheckCircle2 className="h-4 w-4" /> Open to work
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Applications */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-brand-950 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-brand-500" /> My Applications
            </h2>
            
            {appliedJobs.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-brand-100 border-dashed shadow-sm">
                <div className="h-16 w-16 mx-auto bg-brand-50 rounded-full flex items-center justify-center text-brand-400 mb-4">
                  <Briefcase className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-2">No applications yet</h3>
                <p className="text-brand-500 mb-6 max-w-sm mx-auto">You haven't applied to any roles yet. Start exploring jobs and take the next step in your career!</p>
                <Link href="/jobs" className="inline-flex h-11 items-center justify-center rounded-md bg-brand-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-brand-700">
                  Browse Jobs
                </Link>
              </div>
            ) : (
              appliedJobs.map(jobId => {
                const job = getJobDetails(jobId);
                if (!job) return null;
                const company = getCompanyForJob(job.company_id);
                
                let status = "Pending";
                if (jobId === 1) status = "Accepted";
                if (jobId === 2) status = "Rejected";

                const statusColors = {
                  "Pending": "bg-yellow-100 text-yellow-800",
                  "Accepted": "bg-green-100 text-green-800",
                  "Rejected": "bg-red-100 text-red-800"
                };

                return (
                  <Card key={jobId} className="shadow-sm border-brand-100 group hover:border-brand-300 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex gap-4">
                          <div className="h-12 w-12 rounded-lg bg-brand-50 flex items-center justify-center text-brand-500 shrink-0">
                            <Building2 className="h-6 w-6" />
                          </div>
                          <div>
                            <Link href={`/jobs/${job.id}`} className="font-semibold text-lg text-brand-950 hover:text-brand-600 transition-colors">
                              {job.title}
                            </Link>
                            <div className="text-brand-600 text-sm mt-1">{company?.name || "Company"}</div>
                            <div className="flex items-center gap-4 text-xs font-medium text-brand-400 mt-3">
                              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Just applied</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end justify-between">
                          <div className={`px-2.5 py-1 text-xs font-semibold rounded-md ${statusColors[status as keyof typeof statusColors] || "bg-brand-100 text-brand-800"}`}>
                            {status}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-sm border-brand-100">
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-500" /> Resume & Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeName ? (
                  <div className="p-3 border border-brand-200 rounded-lg flex items-center justify-between text-sm hover:bg-brand-50 transition-colors cursor-pointer group gap-3 overflow-hidden">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-8 w-8 shrink-0 bg-brand-100 text-brand-600 rounded flex items-center justify-center group-hover:bg-brand-200 transition-colors pointer-events-none">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="font-medium text-brand-900 pointer-events-none truncate" title={resumeName}>
                        {resumeName}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-brand-500 bg-brand-50 group-hover:bg-brand-100 px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 hidden sm:inline-block">Updated</span>
                      <button onClick={handleDeleteResume} className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-md transition-colors" title="Delete Resume">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-brand-500 text-center py-4">No resume uploaded</div>
                )}
                
                <label className="w-full py-2 border border-dashed border-brand-300 rounded-lg text-sm font-medium text-brand-600 hover:bg-brand-50 hover:border-brand-400 transition-all flex justify-center items-center gap-2 cursor-pointer">
                  + Upload New Resume
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} ref={fileInputRef} />
                </label>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-brand-100 relative overflow-hidden bg-gradient-to-br from-brand-900 to-accent-700 text-white">
              <CardContent className="p-6 relative z-10">
                <h3 className="font-bold text-lg mb-2">Want to stand out?</h3>
                <p className="text-brand-100 text-sm mb-4 leading-relaxed">
                  Use our floating AI assistant to analyze your resume against specific job descriptions and get tailored improvement tips instantly.
                </p>
                <button className="text-sm font-semibold text-accent-200 hover:text-white transition-colors flex items-center gap-1">
                  Try it now →
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
