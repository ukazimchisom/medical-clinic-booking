"use client";

import { useQuery } from "@tanstack/react-query";
import AppointmentSkeleton, {
  StatsSkeleton,
} from "@/components/ui/AppointmentSkeleton";
import { toast } from "sonner";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/hooks/useAuth";
import {
  cancelAppointment,
  getUserAppointments,
} from "@/services/appointment-service";
import { Appointment } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();

  const {
    data: appointments = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["appointments", user?.id],
    queryFn: () => getUserAppointments(user!.id),
    enabled: !!user && !authLoading,
  });

  const scheduled = appointments.filter((a) => a.status === "scheduled");
  const cancelled = appointments.filter((a) => a.status === "cancelled");

  async function handleCancel(id: string) {
    toast("Are you sure you want to cancel this appointment?", {
      action: {
        label: "Yes, cancel",
        onClick: async () => {
          try {
            await cancelAppointment(id);
            await refetch(); // refetch appointments from Supabase
            toast.success("Appointment cancelled successfully");
          } catch (error) {
            console.error(error);
            toast.error("Failed to cancel appointment");
          }
        },
      },
      cancel: {
        label: "No, keep it",
        onClick: () => {},
      },
    });
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-50 mt-12">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">
            My appointments
          </h1>

          {loading && (
            <>
              <StatsSkeleton />
              <div className="flex flex-col gap-3">
                <AppointmentSkeleton />
                <AppointmentSkeleton />
                <AppointmentSkeleton />
              </div>
            </>
          )}
          {!loading && appointments.length === 0 && (
            <div className="bg-white border border-gray-100 rounded-xl px-6 py-12 text-center">
              <p className="text-gray-500 text-sm">
                No appointments booked yet.
              </p>
            </div>
          )}

          {!loading && appointments.length > 0 && (
            <>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  {
                    label: "Total",
                    value: appointments.length,
                    color: "text-gray-800",
                  },
                  {
                    label: "Scheduled",
                    value: scheduled.length,
                    color: "text-blue-600",
                  },
                  {
                    label: "Cancelled",
                    value: cancelled.length,
                    color: "text-red-600",
                  },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <p className={`text-2xl font-medium ${color}`}>{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                {appointments.map((apt, i) => {
                  const isCancelled = apt.status === "cancelled";
                  return (
                    <div
                      key={apt.id}
                      className={`bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-4 transition-opacity ${isCancelled ? "opacity-60" : ""}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden border border-gray-100">
                          <Image
                            src={apt.doctors?.photo || "/default-doctor.jpg"}
                            alt={apt.doctors?.name || "Doctor"}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {apt.doctors?.name || "Unknown Doctor"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {apt.doctors?.specialty || ""}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {new Date(apt.appointment_date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}{" "}
                            · {apt.appointment_time}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              isCancelled
                                ? "bg-red-50 text-red-800"
                                : "bg-green-50 text-green-800"
                            }`}
                          >
                            {apt.status}
                          </span>
                        </div>
                        {!isCancelled && (
                          <button
                            onClick={() => handleCancel(apt.id)}
                            className="text-xs text-red-700 border border-red-200 rounded-md px-2.5 py-1 hover:bg-red-50 transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </AuthGuard>
  );
}
