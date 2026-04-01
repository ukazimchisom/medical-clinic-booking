"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Calendar from "@/components/ui/Calendar";
import { format } from "date-fns";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase-client";

import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";

import { bookAppointment } from "@/app/actions/book-appointment";

import {
  appointmentSchema,
  AppointmentFormData,
} from "@/lib/validators/appointment";
import Image from "next/image";

export default function BookAppointmentPage() {
  const params = useParams();
  const doctorId = params.doctorId as string;

  const [doctor, setDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  useEffect(() => {
    async function fetchDoctor() {
      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .eq("id", doctorId)
        .single();

      if (error) {
        console.error(error);
      } else {
        setDoctor(data);
      }
    }

    if (doctorId) fetchDoctor();
  }, [doctorId]);

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
    if (!user) {
      alert("You must be logged in");
      return;
    }

    if (!selectedDate) {
      alert("Please select a date");
      return;
    }

    setLoading(true);
    setServerError(null);

    try {
      await bookAppointment({
        userId: user.id,
        email: user.email!,
        doctorId,
        doctorName: "Doctor",
        appointment_date: format(selectedDate, "yyyy-MM-dd"),
        appointment_time: data.appointment_time,
      });

      alert("Appointment booked successfully!");
    } catch (error: any) {
      setServerError(error.message);
    }

    setLoading(false);
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 mt-6">
      <Navbar />

      <div className="max-w-xl md:max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-6">Book an Appointment</h1>
        <p className="text-gray-600 mb-6">
          Please select a date and time for your appointment.
        </p>
        <div className="bg-white p-8 rounded-lg ">
          {doctor && (
            <div className="mb-6 p-4 bg-blue-50 rounded-md flex items-center gap-4">
              <Image
                src={doctor.photo || "/default-doctor.jpg"}
                alt={doctor.name}
                width={80}
                height={80}
                className="rounded-full object-cover w-20 h-20"
              />

              <div>
                <h2 className="text-lg font-semibold">{doctor.name}</h2>
                <p className="text-gray-600">{doctor.specialty}</p>
              </div>
            </div>
          )}

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

              <Calendar selected={selectedDate} onSelect={setSelectedDate} />

              {errors.appointment_date && (
                <p className="text-red-500 text-sm">
                  {errors.appointment_date.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Appointment Time</label>

              <select {...register("appointment_time")} className="input">
                <option value="">Select time</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
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
