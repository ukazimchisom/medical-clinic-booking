"use client";

import { cancelAppointment } from "@/services/appointment-service";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { getUserAppointments } from "@/services/appointment-service";

type Appointment = {
  id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  doctors: {
    name: string;
    specialty: string;
  };
};

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || authLoading) return;

    async function loadAppointments() {
      try {
        const data = await getUserAppointments(user.id);
        setAppointments(data || []);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

    loadAppointments();
  }, [user, authLoading]);

  async function handleCancel(id: string) {
    const confirmCancel = confirm(
      "Are you sure you want to cancel this appointment?",
    );

    if (!confirmCancel) return;

    try {
      await cancelAppointment(id);

      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === id
            ? { ...appointment, status: "cancelled" }
            : appointment,
        ),
      );
    } catch (error) {
      console.error(error);
      alert("Failed to cancel appointment.");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          My Appointments
        </h1>

        {loading && <p>Loading appointments...</p>}

        {!loading && appointments.length === 0 && (
          <p className="text-gray-800">No appointments booked yet.</p>
        )}

        <div className="flex flex-col gap-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <p className="font-semibold">{appointment.doctors.name}</p>

              <p className="text-sm text-gray-500">
                {appointment.doctors.specialty}
              </p>

              <p>
                {new Date(appointment.appointment_date).toLocaleDateString()}
              </p>

              <p>{appointment.appointment_time}</p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    appointment.status === "scheduled"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {appointment.status}
                </span>
              </p>
              {appointment.status === "scheduled" && (
                <button
                  onClick={() => handleCancel(appointment.id)}
                  className="mt-3 text-sm text-red-600 hover:underline"
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
