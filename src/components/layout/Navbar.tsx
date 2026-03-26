"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 sm:px-12">
        {/* Logo */}
        <Link href="#home" className="text-lg font-bold text-blue-600">
          DocSlot
        </Link>

        {/* Desktop Links */}
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
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/register" className="text-gray-700 hover:text-blue-600">
            Sign Up
          </Link>
          <Link href="/login">
            <Button className="px-4 py-1">Login</Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <Link href="/login" onClick={() => setIsOpen(false)}>
            <Button className="w-full px-4 py-1">Login</Button>
          </Link>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <HiX className="w-6 h-6 text-gray-700" />
            ) : (
              <HiMenu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
          <Link
            href="/register"
            className="hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
