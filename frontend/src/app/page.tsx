import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobCard } from "@/components/JobCard";
import { JOBS } from "@/lib/dummy-data";
import { ArrowRight, CheckCircle2, Search, Building2, Users, Star } from "lucide-react";

export default function Home() {
  const featuredJobs = JOBS.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-950 pt-24 pb-32 text-white">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-900 via-brand-800 to-accent-700 opacity-90"></div>
        {/* Subtle grid pattern for SaaS aesthetic */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-8 text-center">
          <Badge variant="secondary" className="mb-6 bg-white/10 hover:bg-white/20 text-brand-50 border-white/20 backdrop-blur-md">
            ✨ Your AI-Powered Career Coach is Live
          </Badge>
          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-6">
            Find Your Dream Job <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-brand-300">Faster</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-brand-100 sm:text-xl mb-10 leading-relaxed">
            AI-powered job platform connecting elite talent with top-tier companies. Skip the noise, land the interview.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-base w-full sm:w-auto bg-white text-brand-900 hover:bg-brand-50 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all" asChild>
              <Link href="/jobs">
                Browse Jobs <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base w-full sm:w-auto border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:text-white" asChild>
              <Link href="/dashboard/company">Post a Job</Link>
            </Button>
          </div>

          <div className="mt-16 flex items-center justify-center gap-4 text-sm text-brand-200">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-brand-900 bg-brand-200" />
              ))}
            </div>
            <p>Join <span className="font-bold text-white">10,000+</span> professionals already hired</p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-brand-100 bg-white py-10">
        <div className="container mx-auto px-4 sm:px-8">
          <p className="text-center text-sm font-semibold text-brand-400 mb-6 uppercase tracking-wider">Trusted by innovative teams worldwide</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-60 grayscale transition-all hover:grayscale-0">
            {/* Dummy Corporate Logos using text for simplicity */}
            <div className="flex items-center gap-2 text-xl font-bold font-serif"><Building2/> Acme Corp</div>
            <div className="flex items-center gap-2 text-xl font-bold font-mono"><Building2/> Vercel</div>
            <div className="flex items-center gap-2 text-xl font-bold"><Building2/> Linear</div>
            <div className="flex items-center gap-2 text-xl font-bold italic"><Building2/> Notion</div>
            <div className="flex items-center gap-2 text-xl font-bold"><Building2/> Figma</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-brand-50">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl">Platform built for modern hiring</h2>
            <p className="mt-4 text-lg text-brand-600">Everything you need to find the perfect role or candidate in record time.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-none shadow-soft group hover:shadow-hover transition-shadow bg-white pb-6">
              <CardContent className="pt-8 text-center flex flex-col items-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 transition-transform group-hover:scale-110">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-brand-950 mb-3">Smart Matching</h3>
                <p className="text-brand-600 leading-relaxed">Our AI analyzes thousands of data points to find the perfect mutual fit between candidates and roles.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-soft group hover:shadow-hover transition-shadow bg-white pb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
              <CardContent className="pt-8 text-center flex flex-col items-center relative z-10 group-hover:text-white">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-brand-950 group-hover:text-white mb-3 transition-colors">One-Click Apply</h3>
                <p className="text-brand-600 group-hover:text-brand-100 leading-relaxed transition-colors">Set up your profile once and apply to hundreds of curated roles with a single click. No more repetitive forms.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-soft group hover:shadow-hover transition-shadow bg-white pb-6">
              <CardContent className="pt-8 text-center flex flex-col items-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-100 text-accent-600 transition-transform group-hover:scale-110">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-brand-950 mb-3">Direct Access</h3>
                <p className="text-brand-600 leading-relaxed">Skip the line and chat directly with hiring managers. Real-time feedback and transparent pipelines.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-brand-950">Featured Roles</h2>
              <p className="mt-2 text-brand-600">Top opportunities recently posted by verified companies.</p>
            </div>
            <Button variant="outline" asChild className="mt-4 sm:mt-0">
              <Link href="/jobs">View All Jobs</Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {featuredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-brand-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-brand-600 rounded-full blur-[100px] opacity-50"></div>
        <div className="container relative z-10 mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Don't just take our word for it</h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-brand-900 border-none text-white shadow-xl">
                <CardContent className="p-8">
                  <div className="flex gap-1 text-yellow-400 mb-4">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <p className="text-brand-200 leading-relaxed text-lg mb-6">
                    "{["TalentConnect made finding my next gig incredibly seamless. The AI assistant helped tailor my resume perfectly.", "We hired our entire engineering team through the platform. The candidate quality is consistently top-tier.", "The sleek UI and one-click applications literally saved me dozens of hours per week."][i-1]}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-brand-700 flex items-center justify-center font-bold">
                      {["S", "A", "M"][i-1]}
                    </div>
                    <div>
                      <div className="font-semibold">{["Sarah Chen", "Alex Rivera", "Michael Ross"][i-1]}</div>
                      <div className="text-xs text-brand-400">{["Frontend Dev at Acme Corp", "VP Eng at Linear", "Product Designer"][i-1]}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
