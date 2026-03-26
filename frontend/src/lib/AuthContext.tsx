"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type MockUser = {
  id: number;
  name: string;
  email: string;
  role: "candidate" | "company";
};

type AuthContextType = {
  user: MockUser | null;
  token: string | null;
  login: (userData: any, token: string) => void;
  logout: () => void;
  appliedJobs: number[];
  applyForJob: (jobId: number) => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token and load profile
    const storedToken = localStorage.getItem("elevate_token");
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken);
    } else {
      setIsLoading(false);
    }

    const storedApps = localStorage.getItem("elevate_applications");
    if (storedApps) {
      try {
        setAppliedJobs(JSON.parse(storedApps));
      } catch (e) {}
    }
  }, []);

  const fetchUserProfile = async (authToken: string) => {
    try {
      const res = await fetch("/api/v1/users/me", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        // Token might be invalid or expired
        logout();
      }
    } catch (err) {
      console.error("Failed to fetch user profile", err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData: MockUser, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("elevate_token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("elevate_token");
  };

  const applyForJob = (jobId: number) => {
    if (!appliedJobs.includes(jobId)) {
      const newApps = [...appliedJobs, jobId];
      setAppliedJobs(newApps);
      localStorage.setItem("elevate_applications", JSON.stringify(newApps));
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, appliedJobs, applyForJob, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
