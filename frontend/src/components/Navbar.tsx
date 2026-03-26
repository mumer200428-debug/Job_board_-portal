"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, LogOut } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export const LogoSVG = ({ className = "" }: { className?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 26L26 6M26 6H12M26 6V20" stroke="url(#jobspark_grad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="jobspark_grad" x1="0" y1="32" x2="32" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1e3a8a" />
        <stop offset="1" stopColor="#10b981" />
      </linearGradient>
    </defs>
  </svg>
);

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <LogoSVG />
            <span className="text-xl font-bold tracking-tight text-slate-900">
              JobSpark
            </span>
          </Link>
          <div className="hidden lg:flex relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-400" />
            <Input 
              placeholder="Search jobs..." 
              className="pl-9 h-9 bg-brand-50 border-transparent focus-visible:ring-brand-500 rounded-full"
            />
          </div>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/jobs" className="text-sm font-medium text-brand-700 hover:text-brand-900">
            Find Jobs
          </Link>
          <Link href="/dashboard/company" className="text-sm font-medium text-brand-700 hover:text-brand-900">
            For Companies
          </Link>
          <Link href="/dashboard/candidate" className="text-sm font-medium text-brand-700 hover:text-brand-900">
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-3 mr-2">
                <div className="text-sm font-medium text-brand-900">{user.name}</div>
                <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold shrink-0 border border-brand-200">
                  {user.name.charAt(0)}
                </div>
              </div>
              <Button variant="ghost" size="icon" className="hidden lg:inline-flex text-brand-400 hover:text-red-600" onClick={logout} title="Sign Out">
                <LogOut className="h-4 w-4" />
              </Button>
              {user.role === "company" ? (
                 <Button asChild className="bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white border-0 shadow-md">
                   <Link href="/dashboard/company/post">Post a Job</Link>
                 </Button>
              ) : (
                 <Button asChild className="bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white border-0 shadow-md">
                   <Link href="/dashboard/candidate">My Profile</Link>
                 </Button>
              )}
            </>
          ) : (
            <>
              <Button variant="ghost" className="hidden sm:inline-flex" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button variant="outline" className="hidden lg:inline-flex border-brand-200" asChild>
                <Link href="/register">Register</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white border-0 shadow-md">
                <Link href="/dashboard/company/post">Post a Job</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
