"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Clock, Building2 } from "lucide-react";
import { JobResponse, getCompanyForJob } from "@/lib/dummy-data";
import { formatDistanceToNow } from "date-fns";

export function JobCard({ job }: { job: JobResponse }) {
  const company = getCompanyForJob(job.company_id);
  // Safely parse date or fallback
  const createdDate = new Date(job.created_at);
  const timeAgo = !isNaN(createdDate.getTime()) 
    ? formatDistanceToNow(createdDate, { addSuffix: true }) 
    : "Recently";

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-hover hover:-translate-y-1 border-transparent hover:border-brand-200">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-600 sm:flex shadow-sm">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <Link href={`/jobs/${job.id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm focus-visible:ring-offset-2">
                <h3 className="font-semibold text-lg text-brand-950 hover:text-brand-600 transition-colors">
                  {job.title}
                </h3>
              </Link>
              <div className="mt-1 font-medium text-brand-700">
                {company.name}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-brand-500 font-medium">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 shrink-0 text-brand-400" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 shrink-0 text-brand-400" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 shrink-0 text-brand-400" />
                  {timeAgo}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:items-end gap-3 mt-4 sm:mt-0">
            <Badge variant="secondary" className="w-fit">Full-time</Badge>
            <Button asChild size="sm" className="w-full sm:w-auto mt-auto opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <Link href={`/jobs/${job.id}`}>Apply Now</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
