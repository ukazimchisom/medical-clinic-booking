import { z } from "zod";

export const appointmentSchema = z.object({
  appointment_date: z.string().min(1, "Date is required"),
  appointment_time: z.string().min(1, "Time is required"),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
