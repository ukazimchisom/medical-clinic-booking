"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getProfile,
  getUserAppointments,
} from "@/services/appointment-service";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, loading: authLoading } = useAuth();

  const { data: appointments = [] } = useQuery({
    queryKey: ["appointments", user?.id],
    queryFn: () => getUserAppointments(user!.id),
    enabled: !!user && !authLoading,
  });

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getProfile(user!.id),
    enabled: !!user && !authLoading,
  });

  const scheduledCount = appointments.filter(
    (a) => a.status === "scheduled",
  ).length;

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="w-full border-b bg-slate-200 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 sm:px-12">
        <Link href="/" className="text-lg font-bold text-green-600">
          DocSlot
        </Link>

        <div className="hidden md:flex items-center gap-4 text-sm">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 ${isActive("/dashboard") ? "bg-blue-50 text-green-600" : "text-gray-600 hover:text-green-600 hover:bg-green-100"}`}
              >
                My Appointments
                {scheduledCount > 0 && (
                  <span className=" bg-green-600 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
                    {scheduledCount > 9 ? "9+" : scheduledCount}
                  </span>
                )}
              </Link>
              <Link
                href="/profile"
                className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-green-600 ${isActive("/profile") ? " bg-blue-50 text-green-600" : "hover:bg-green-100"}`}
              >
                My Profile
              </Link>
              {profile?.role === "admin" && (
                <Link
                  href="/admin"
                  className="px-4 py-2 rounded-lg text-sm text-red-700 hover:text-red-600 font-medium hover:bg-red-100"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 text-sm rounded-md border border-red-300 text-red-600 bg-white hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="text-gray-700 hover:text-blue-600"
              >
                Sign Up
              </Link>
              <Link href="/login">
                <button className="px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center gap-4">
          {!user && (
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button className="px-4 py-1">Login</Button>
            </Link>
          )}
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <HiX className="w-6 h-6 text-gray-700" />
            ) : (
              <HiMenu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 flex flex-col gap-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 hover:text-green-600"
                onClick={() => setIsOpen(false)}
              >
                My Appointments
                {scheduledCount > 0 && (
                  <span className="bg-green-600 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
                    {scheduledCount > 9 ? "9+" : scheduledCount}
                  </span>
                )}
              </Link>
              <Link
                href="/profile"
                className="hover:text-green-600"
                onClick={() => setIsOpen(false)}
              >
                My Profile
              </Link>
              {profile?.role === "admin" && (
                <Link
                  href="/admin"
                  className="hover:text-purple-600 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="text-center px-4 py-1.5 text-sm rounded-md border border-red-300 text-red-600 bg-white hover:bg-red-600 hover:text-white hover:border-red-600 transition-all w-full"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              href="/register"
              className="hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
