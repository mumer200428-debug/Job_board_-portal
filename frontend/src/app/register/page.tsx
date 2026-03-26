"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { LogoSVG } from "@/components/Navbar";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Registration failed");
      }

      // After successful registration, log them in
      const loginRes = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (loginRes.ok) {
        const loginData = await loginRes.json();
        const token = loginData.access_token;
        
        const profileRes = await fetch("/api/v1/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (profileRes.ok) {
          const userData = await profileRes.json();
          login(userData, token);
          if (userData.role === "company") {
            router.push("/dashboard/company");
          } else {
            router.push("/dashboard/candidate");
          }
        } else {
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-brand-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <LogoSVG className="mx-auto h-12 w-12 text-brand-600 mb-4" />
        <h2 className="text-3xl font-bold tracking-tight text-brand-950">
          Create your JobSpark account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="shadow-smooth border-brand-100">
          <CardContent className="py-8 px-4 sm:px-10 space-y-6">
            {error && (
              <div className="p-3 rounded-md bg-red-50 text-red-600 font-medium text-sm text-center">
                {error}
              </div>
            )}
            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label className="block text-sm font-medium text-brand-900 mb-2">Full Name</label>
                <Input 
                  type="text" 
                  required 
                  placeholder="Jane Doe" 
                  className="h-11 bg-white" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-900 mb-2">Email address</label>
                <Input 
                  type="email" 
                  required 
                  placeholder="you@example.com" 
                  className="h-11 bg-white" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-900 mb-2">Password</label>
                <Input 
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  className="h-11 bg-white" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-900 mb-2">I am a</label>
                <select 
                  className="w-full h-11 rounded-md border border-brand-200 bg-white px-3 py-2 text-sm text-brand-900 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="candidate">Candidate (Looking for a job)</option>
                  <option value="company">Employer (Hiring)</option>
                </select>
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full h-11 bg-brand-600 hover:bg-brand-700 text-white font-medium" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-brand-600">Already have an account? </span>
              <Link href="/login" className="font-medium text-brand-900 hover:text-brand-700">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
