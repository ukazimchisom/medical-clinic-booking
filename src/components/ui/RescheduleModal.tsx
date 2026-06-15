"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  appointmentSchema,
  AppointmentFormData,
} from "@/lib/validators/appointment";
import { getBookedSlots } from "@/services/appointment-service";
import { rescheduleAppointment } from "@/app/actions/reschedule-appointment";
import Calendar from "@/components/ui/Calendar";
import Modal from "@/components/ui/Modal";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentId: string;
  doctorId: string;
  onSuccess: () => void;
}

const timeSlots = [
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
];

export default function RescheduleModal({
  isOpen,
  onClose,
  appointmentId,
  doctorId,
  onSuccess,
}: RescheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const formattedDate = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;

  // Fetch booked slots for the selected date and doctor
  const { data: bookedSlots = [] } = useQuery({
    queryKey: ["bookedSlots", doctorId, formattedDate],
    queryFn: () => getBookedSlots(doctorId, formattedDate!),
    enabled: !!selectedDate && !!doctorId,
  });

  // Sync selected date with React Hook Form
  useEffect(() => {
    if (selectedDate) {
      setValue("appointment_date", format(selectedDate, "yyyy-MM-dd"), {
        shouldValidate: true,
      });
    }
  }, [selectedDate, setValue]);

  async function onSubmit(data: AppointmentFormData) {
    setLoading(true);
    try {
      await rescheduleAppointment({
        appointmentId,
        newDate: data.appointment_date,
        newTime: data.appointment_time,
      });
      toast.success("Appointment rescheduled successfully");
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
    setLoading(false);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reschedule Appointment">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Date Picker */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Select New Date
          </label>
          <Calendar selected={selectedDate} onSelect={setSelectedDate} />
          {errors.appointment_date && (
            <p className="text-red-500 text-sm mt-1">
              {errors.appointment_date.message}
            </p>
          )}
        </div>

        {/* Time Slots */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Select New Time
          </label>
          <div className="grid grid-cols-3 gap-2 mt-3">
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
                  className={`py-2 rounded-lg border text-sm transition-all
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

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Rescheduling...
            </span>
          ) : (
            "Confirm Reschedule"
          )}
        </button>
      </form>
    </Modal>
  );
}
