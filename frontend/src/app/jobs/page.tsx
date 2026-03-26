"use client";

import { useState, useEffect } from "react";
import { JobCard } from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Filter } from "lucide-react";

export default function JobsListingPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypes, setJobTypes] = useState<string[]>(['Full-time']);
  const [salaryRanges, setSalaryRanges] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/jobs/")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setJobs(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);
  
  const handleJobTypeChange = (type: string) => {
    setJobTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };
  const handleSalaryRangeChange = (range: string) => {
    setSalaryRanges(prev => prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]);
  };

  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const descMatch = job.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const matchesSearch = titleMatch || descMatch;
    
    const matchesLocation = job.location?.toLowerCase().includes(locationFilter.toLowerCase()) || false;
    
    const typeMatch = jobTypes.length === 0 || jobTypes.some(t => {
      if (t === 'Contract') return job.title?.toLowerCase().includes('contract');
      if (t === 'Part-time') return job.title?.toLowerCase().includes('part');
      return true; // Assume standard ones are Full-time
    });

    const salaryMatch = salaryRanges.length === 0 || salaryRanges.some(r => {
      const sal = job.salary || "";
      if (r === 'Under $100k') return sal.includes('80') || sal.includes('90');
      if (r === '$100k - $150k') return sal.includes('100') || sal.includes('110') || sal.includes('120') || sal.includes('130') || sal.includes('140');
      if (r === '$150k+') return sal.includes('150') || sal.includes('160') || sal.includes('170') || sal.includes('180') || sal.includes('190') || sal.includes('200');
      return true;
    });

    return matchesSearch && matchesLocation && typeMatch && salaryMatch;
  });

  return (
    <div className="min-h-screen bg-brand-50 pb-20">
      {/* Search Header */}
      <div className="bg-brand-950 text-white py-16">
        <div className="container mx-auto px-4 sm:px-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Explore Opportunities</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/20">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-300" />
              <Input 
                placeholder="Job title, keywords, or company" 
                className="pl-10 h-12 bg-white/10 border-transparent text-white placeholder:text-brand-300 focus-visible:ring-brand-400"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-300" />
              <Input 
                placeholder="City, state, or remote" 
                className="pl-10 h-12 bg-white/10 border-transparent text-white placeholder:text-brand-300 focus-visible:ring-brand-400"
                value={locationFilter}
                onChange={e => setLocationFilter(e.target.value)}
              />
            </div>
            <Button size="lg" className="h-12 px-8 bg-accent-500 hover:bg-accent-600 text-white shadow-md">
              Find Jobs
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-8 py-12 flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-6">
          <div className="flex items-center gap-2 font-semibold text-brand-950 border-b border-brand-200 pb-2">
            <Filter className="h-4 w-4" /> Filters
          </div>
          <div>
            <h3 className="text-sm font-semibold text-brand-900 mb-3">Job Type</h3>
            <div className="space-y-2 text-sm text-brand-600">
              <label className="flex items-center gap-2 cursor-pointer hover:text-brand-900"><input type="checkbox" className="rounded accent-brand-600" checked={jobTypes.includes('Full-time')} onChange={() => handleJobTypeChange('Full-time')} /> Full-time</label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-brand-900"><input type="checkbox" className="rounded accent-brand-600" checked={jobTypes.includes('Part-time')} onChange={() => handleJobTypeChange('Part-time')} /> Part-time</label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-brand-900"><input type="checkbox" className="rounded accent-brand-600" checked={jobTypes.includes('Contract')} onChange={() => handleJobTypeChange('Contract')} /> Contract</label>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-brand-900 mb-3">Salary Range</h3>
            <div className="space-y-2 text-sm text-brand-600">
              <label className="flex items-center gap-2 cursor-pointer hover:text-brand-900"><input type="checkbox" className="rounded accent-brand-600" checked={salaryRanges.includes('Under $100k')} onChange={() => handleSalaryRangeChange('Under $100k')} /> Under $100k</label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-brand-900"><input type="checkbox" className="rounded accent-brand-600" checked={salaryRanges.includes('$100k - $150k')} onChange={() => handleSalaryRangeChange('$100k - $150k')} /> $100k - $150k</label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-brand-900"><input type="checkbox" className="rounded accent-brand-600" checked={salaryRanges.includes('$150k+')} onChange={() => handleSalaryRangeChange('$150k+')} /> $150k+</label>
            </div>
          </div>
        </aside>

        {/* Job Listings */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl font-bold text-brand-950">
              {loading ? "Loading..." : `${filteredJobs.length} ${filteredJobs.length === 1 ? 'job' : 'jobs'} found`}
            </h2>
            <div className="text-sm text-brand-600">Sort by: <span className="font-semibold text-brand-900 cursor-pointer">Most Recent</span></div>
          </div>
          
          {loading ? (
            <div className="text-center py-20 bg-white rounded-xl border border-brand-100 shadow-sm text-brand-500">
              Loading jobs...
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid gap-4">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-brand-100 shadow-sm">
              <Search className="h-12 w-12 text-brand-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-brand-900 font-sans">No jobs found</h3>
              <p className="text-brand-500 mt-2">Try adjusting your search or filters to find what you're looking for.</p>
              <Button variant="outline" className="mt-6" onClick={() => { setSearchQuery(""); setLocationFilter(""); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
