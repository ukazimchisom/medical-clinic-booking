"use server";

import { createClient } from "@/lib/supabase-server";

export async function rescheduleAppointment({
  appointmentId,
  newDate,
  newTime,
}: {
  appointmentId: string;
  newDate: string;
  newTime: string;
}) {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Fetch current appointment details for the email
  const { data: appointment, error: fetchError } = await supabase
    .from("appointments")
    .select(
      `
      appointment_date,
      appointment_time,
      doctors (
        name
      )
    `,
    )
    .eq("id", appointmentId)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !appointment) {
    throw new Error("Appointment not found");
  }

  // Check if the new time slot is already booked
  const { data: existing } = await supabase
    .from("appointments")
    .select("*")
    .eq("doctor_id", appointmentId)
    .eq("appointment_date", newDate)
    .eq("appointment_time", newTime);

  if (existing && existing.length > 0) {
    throw new Error("This time slot is already booked");
  }

  // Update the appointment with the new date and time
  const { error: updateError } = await supabase
    .from("appointments")
    .update({
      appointment_date: newDate,
      appointment_time: newTime,
      status: "scheduled",
    })
    .eq("id", appointmentId)
    .eq("user_id", user.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return true;
}
