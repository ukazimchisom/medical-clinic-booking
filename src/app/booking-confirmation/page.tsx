"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { Suspense } from "react";

function BookingConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const doctorName = searchParams.get("doctor");
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  // Format date to readable format e.g. June 15, 2026
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <main className="min-h-screen bg-gray-50 mt-12">
      <Navbar />
      <div className="max-w-lg mx-auto px-6 py-20 flex flex-col items-center text-center">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-8 self-start"
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        {/* Success icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Appointment Confirmed
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Your appointment has been successfully booked. A confirmation email
          has been sent to your inbox.
        </p>

        {/* Booking details card */}
        <div className="w-full bg-white border border-gray-100 rounded-xl p-6 mb-8 text-left">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Booking Details
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Doctor</span>
              <span className="text-sm font-medium text-gray-800">
                {doctorName || "N/A"}
              </span>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Date</span>
              <span className="text-sm font-medium text-gray-800">
                {formattedDate || "N/A"}
              </span>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Time</span>
              <span className="text-sm font-medium text-gray-800">
                {time || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View My Appointments
          </button>
          <button
            onClick={() => router.push("/doctors")}
            className="flex-1 bg-white text-gray-700 border border-gray-200 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    </main>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense>
      <BookingConfirmationContent />
    </Suspense>
  );
}
