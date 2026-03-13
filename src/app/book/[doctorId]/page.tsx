"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";

import {
  appointmentSchema,
  AppointmentFormData,
} from "@/lib/validators/appointment";

export default function BookAppointmentPage() {
  const params = useParams();
  const doctorId = params.doctorId as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(data: AppointmentFormData) {
    console.log("Form submitted", data);
    if (!user) {
      alert("You must be logged in");
      return;
    }

    setLoading(true);
    setServerError(null);

    // Check if slot already booked

    // Insert new appointment
    const { error } = await supabase.from("appointments").insert([
      {
        user_id: user.id,
        doctor_id: doctorId,
        appointment_date: data.appointment_date,
        appointment_time: data.appointment_time,
      },
    ]);

    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        setServerError("This time slot is already booked.");
      } else {
        setServerError(error.message);
      }
      return;
    }

    alert("Appointment booked successfully!");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-xl mx-auto px-6 py-12">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6">Book Appointment</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {serverError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md">
                {serverError}
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Appointment Date</label>

              <input
                type="date"
                {...register("appointment_date")}
                className="w-full border rounded-md px-3 py-2 mt-1"
                onChange={() => setServerError(null)}
              />

              {errors.appointment_date && (
                <p className="text-red-500 text-sm">
                  {errors.appointment_date.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Appointment Time</label>

              <select
                {...register("appointment_time")}
                className="w-full border rounded-md px-3 py-2 mt-1"
                onChange={() => setServerError(null)}
              >
                <option value="">Select a time</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
              </select>

              {errors.appointment_time && (
                <p className="text-red-500 text-sm">
                  {errors.appointment_time.message}
                </p>
              )}
            </div>

            <Button type="submit">
              {loading ? "Booking..." : "Confirm Appointment"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
