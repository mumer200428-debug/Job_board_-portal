"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, Plus, Users, Eye, MoreHorizontal, TrendingUp } from "lucide-react";

export default function CompanyDashboard() {
  const { user, token, isLoading } = useAuth();
  const [companyJobs, setCompanyJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    if (!isLoading && user?.role === "company") {
      fetch("/api/v1/jobs/")
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            const myJobs = data.filter((j: any) => j.company_id === user.id);
            setCompanyJobs(myJobs);
          }
        })
        .catch(err => console.error("Error fetching jobs:", err))
        .finally(() => setLoadingJobs(false));
    } else if (!isLoading) {
      setLoadingJobs(false);
    }
  }, [user, isLoading]);

  if (isLoading || loadingJobs) {
    return <div className="min-h-screen bg-brand-50 flex items-center justify-center">Loading...</div>;
  }

  if (!user || user.role !== "company") {
    return <div className="min-h-screen bg-brand-50 flex items-center justify-center text-brand-600">You must be logged in as a company to view this dashboard.</div>;
  }

  // Calculate total applicants for this company's jobs (Mocked for now as backend lacks company applicant fetch route)
  // Assuming random applicants between 5 and 50 per job for visual realism.
  let totalApplicants = 0;
  companyJobs.forEach(job => { totalApplicants += (job.id * 7 % 50) + 5; });

  return (
    <div className="min-h-screen bg-brand-50 pb-20 pt-8">
      <div className="container mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-brand-950 flex items-center gap-3">
              <span className="p-2 bg-white rounded-lg shadow-sm border border-brand-100 text-brand-600"><Building2 className="h-6 w-6"/></span>
              {user.name} Dashboard
            </h1>
            <p className="text-brand-600 mt-1">Manage your job postings and applicants</p>
          </div>
          <Button size="lg" className="h-12 px-6 shadow-md bg-brand-900 hover:bg-brand-950 text-white flex gap-2">
            <Plus className="h-5 w-5" /> Post New Job
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm border-brand-100">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-brand-500 mb-1">Active Jobs</p>
                  <h3 className="text-3xl font-bold text-brand-950">{companyJobs.length}</h3>
                </div>
                <div className="p-3 bg-brand-50 text-brand-600 rounded-lg">
                  <BriefcaseIcon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-brand-100">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-brand-500 mb-1">Total Applicants</p>
                  <h3 className="text-3xl font-bold text-brand-950">{totalApplicants}</h3>
                </div>
                <div className="p-3 bg-accent-50 text-accent-600 rounded-lg">
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-brand-100">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-brand-500 mb-1">Interview Rate</p>
                  <h3 className="text-3xl font-bold text-brand-950">24%</h3>
                </div>
                <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Listings Management */}
        <Card className="shadow-sm border-brand-100">
          <CardHeader className="bg-white/50 border-b border-brand-50 pb-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <CardTitle className="text-lg">Posted Jobs</CardTitle>
              <div className="max-w-xs w-full">
                <Input placeholder="Search jobs..." className="h-9 bg-white" />
              </div>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-brand-50/50 text-brand-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Job Title</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Applicants</th>
                  <th className="px-6 py-4">Posted Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100 bg-white">
                {companyJobs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-brand-500">
                      You haven't posted any jobs yet. Click "Post New Job" to get started.
                    </td>
                  </tr>
                ) : companyJobs.map(job => {
                  const jobApplicants = (job.id * 7 % 50) + 5;
                  return (
                    <tr key={job.id} className="hover:bg-brand-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-brand-900">{job.title}</td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
                      </td>
                      <td className="px-6 py-4 text-brand-700">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-brand-400" /> {jobApplicants}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-brand-500">{new Date(job.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8 text-brand-600">
                            <Eye className="h-4 w-4 mr-1"/> View
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-brand-400 hover:text-brand-900">
                            <MoreHorizontal className="h-4 w-4"/>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </div>
  );
}

// Inline Icon to avoid adding to extra imports
function BriefcaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}
