"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation"; // fix

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

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

        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600"
              >
                My Appointments
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 transition-colors"
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
                <Button className="px-4 py-1">Login</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}
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

      {/* Mobile menu */}
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
                className="hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                My Appointments
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="text-left text-red-600 hover:text-red-700"
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
