"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { getUserAppointments } from "@/services/appointment-service";

type Appointment = {
  id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
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
  }, [user]);

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
              <p>
                <strong>Doctor ID:</strong> {appointment.doctor_id}
              </p>

              <p>
                <strong>Date:</strong> {appointment.appointment_date}
              </p>

              <p>
                <strong>Time:</strong> {appointment.appointment_time}
              </p>

              <p>
                <strong>Status:</strong> {appointment.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
