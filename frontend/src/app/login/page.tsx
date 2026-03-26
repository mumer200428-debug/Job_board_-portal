"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { LogoSVG } from "@/components/Navbar";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Invalid login credentials");
      }

      const data = await res.json();
      const token = data.access_token;

      // Fetch user profile
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
        throw new Error("Unable to load profile data");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <LogoSVG className="mx-auto h-12 w-12 text-brand-600 mb-4" />
        <h2 className="text-3xl font-bold tracking-tight text-brand-950">
          Sign in to your account
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
            <form className="space-y-6" onSubmit={handleLogin}>
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

              <Button type="submit" size="lg" className="w-full text-base font-semibold" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            <div className="text-sm text-center text-brand-500">
              Not registered yet? <Link href="/register" className="font-semibold text-brand-600 hover:text-brand-500">Create an account</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
