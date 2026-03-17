"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

interface AuthGuardProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export default function AuthGuard({ children, adminOnly }: AuthGuardProps) {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      // Fetch role from profiles table
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (error || !profile) {
        router.replace("/login");
        return;
      }

      setUserRole(profile.role);

      if (adminOnly && profile.role !== "admin") {
        router.replace("/dashboard");
      }

      setLoading(false);
    }

    checkAuth();
  }, [router, adminOnly]);

  if (loading) {
    return <p className="p-6">Checking authentication...</p>;
  }

  return <>{children}</>;
}
