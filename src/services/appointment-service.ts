import { supabase } from "@/lib/supabase-client";

import { Appointment } from "@/types";

export async function getUserAppointments(
  userId: string,
): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from("appointments")
    .select(
      `
      id,
      appointment_date,
      appointment_time,
      status,
      doctors (
        name,
        specialty,
        photo
      )
    `,
    )
    .eq("user_id", userId)
    .order("appointment_date", { ascending: false });

  if (error) throw new Error(error.message);

  return (data || []) as unknown as Appointment[];
}

export async function cancelAppointment(appointmentId: string) {
  // First fetch the appointment details needed for the email
  const { data: appointment, error: fetchError } = await supabase
    .from("appointments")
    .select(
      `
      appointment_date,
      appointment_time,
      doctors (
        name
      ),
      profiles (
        email
      )
    `,
    )
    .eq("id", appointmentId)
    .single();

  if (fetchError || !appointment) {
    throw new Error("Appointment not found");
  }

  // Then update the status to cancelled
  const { error: updateError } = await supabase
    .from("appointments")
    .update({ status: "cancelled" })
    .eq("id", appointmentId);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return appointment;
}

export async function getBookedSlots(
  doctorId: string,
  date: string,
): Promise<string[]> {
  const { data, error } = await supabase
    .from("appointments")
    .select("appointment_time")
    .eq("doctor_id", doctorId)
    .eq("appointment_date", date);

  if (error) throw new Error(error.message);

  return data.map((row) => row.appointment_time);
}
