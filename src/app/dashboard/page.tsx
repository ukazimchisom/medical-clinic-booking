"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase-client";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>

          <p className="text-gray-600 mb-6">
            Welcome back, <strong>{user.email}</strong>
          </p>

          <div className="flex gap-4">
            <Button onClick={() => router.push("/doctors")}>
              Book Appointment
            </Button>

            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
