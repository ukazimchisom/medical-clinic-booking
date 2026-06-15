"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDoctor, getBookedSlots } from "@/services/appointment-service";

import Calendar from "@/components/ui/Calendar";
import { format } from "date-fns";

import { useEffect } from "react";

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

  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const queryClient = useQueryClient();

  const formattedDate = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;

  const { data: bookedSlots = [] } = useQuery({
    queryKey: ["bookedSlots", doctorId, formattedDate],
    queryFn: () => getBookedSlots(doctorId, formattedDate!),
    enabled: !!selectedDate && !!doctorId,
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace(`/login?redirect=/book/${doctorId}`);
    }
  }, [user, authLoading, router, doctorId]);

  useEffect(() => {
    if (selectedDate) {
      setValue("appointment_date", format(selectedDate, "yyyy-MM-dd"), {
        shouldValidate: true,
      });
    }
  }, [selectedDate, setValue]);

  const { data: doctor, isLoading: doctorLoading } = useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: () => getDoctor(doctorId),
    enabled: !!doctorId && !!user && !authLoading,
  });

  async function onSubmit(data: AppointmentFormData) {
    if (!user) {
      toast.error("You must be logged in to book an appointment");
      return;
    }

    if (!doctor) {
      setServerError("Doctor information is not available.");
      return;
    }

    setLoading(true);
    setServerError(null);

    try {
      await bookAppointment({
        email: user.email!,
        doctorId,
        appointment_date: data.appointment_date,
        appointment_time: data.appointment_time,
      });
      queryClient.invalidateQueries({ queryKey: ["appointments", user?.id] });
      router.push(
        `/booking-confirmation?doctor=${encodeURIComponent(doctor.name)}&date=${data.appointment_date}&time=${data.appointment_time}`,
      );
    } catch (error: unknown) {
      setServerError(
        error instanceof Error ? error.message : "An error occurred",
      );
    }

    setLoading(false);
  }

  if (authLoading || doctorLoading || !doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const timeSlots = [
    { value: "09:00", label: "9:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "15:00", label: "3:00 PM" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 mt-12">
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                {timeSlots.map(({ value, label }) => {
                  const isBooked = bookedSlots.includes(value);
                  const isSelected = selectedTime === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      disabled={isBooked}
                      onClick={() => {
                        setSelectedTime(value);
                        setValue("appointment_time", value, {
                          shouldValidate: true,
                        });
                      }}
                      className={`py-2.5 rounded-lg border text-sm transition-all
            ${
              isBooked
                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                : isSelected
                  ? "bg-blue-600 text-white border-blue-600 font-medium"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600"
            }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              {errors.appointment_time && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.appointment_time.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Booking...
                </span>
              ) : (
                "Confirm Appointment"
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
