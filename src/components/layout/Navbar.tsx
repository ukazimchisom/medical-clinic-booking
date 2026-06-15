"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserAppointments } from "@/services/appointment-service";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const { data: appointments = [] } = useQuery({
    queryKey: ["appointments", user?.id],
    queryFn: () => getUserAppointments(user!.id),
    enabled: !!user,
  });

  const scheduledCount = appointments.filter(
    (a) => a.status === "scheduled",
  ).length;

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <nav className="w-full border-b bg-white fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 sm:px-12">
        <Link href="/" className="text-lg font-bold text-blue-600">
          DocSlot
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a href="#about" className="hover:text-blue-600">
            About Us
          </a>
          <a href="#services" className="hover:text-blue-600">
            Services
          </a>
          <a href="#footer" className="hover:text-blue-600">
            Contact
          </a>
        </div>

        <div className="hidden md:flex items-center gap-4 text-sm">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 text-gray-700 hover:text-blue-600"
              >
                My Appointments
                {scheduledCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
                    {scheduledCount > 9 ? "9+" : scheduledCount}
                  </span>
                )}
              </Link>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-blue-600"
              >
                My Profile
              </Link>
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
          <a
            href="#about"
            className="hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </a>
          <a
            href="#services"
            className="hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Services
          </a>
          <a
            href="#contact"
            className="hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                My Appointments
                {scheduledCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
                    {scheduledCount > 9 ? "9+" : scheduledCount}
                  </span>
                )}
              </Link>
              <Link
                href="/profile"
                className="hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                My Profile
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="text-left px-4 py-1.5 text-sm rounded-md border border-red-300 text-red-600 bg-white hover:bg-red-600 hover:text-white hover:border-red-600 transition-all w-full"
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
