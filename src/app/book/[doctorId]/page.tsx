"use client";

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

  function onSubmit(data: AppointmentFormData) {
    console.log("Booking Data:", {
      doctorId,
      ...data,
    });
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
            <div>
              <label className="text-sm font-medium">Appointment Date</label>

              <input
                type="date"
                {...register("appointment_date")}
                className="w-full border rounded-md px-3 py-2 mt-1"
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

            <Button type="submit">Confirm Appointment</Button>
          </form>
        </div>
      </div>
    </main>
  );
}
