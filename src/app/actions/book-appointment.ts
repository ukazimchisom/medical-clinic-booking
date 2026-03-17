"use server";

import { createClient } from "@/lib/supabase-server";
import { sendAppointmentEmail } from "@/lib/email";

export async function bookAppointment({
  email,
  doctorId,
  appointment_date,
  appointment_time,
}: {
  email: string;
  doctorId: string;
  appointment_date: string;
  appointment_time: string;
}) {
  // Create server-side Supabase client
  const supabase = await createClient();

  // Get authenticated user from session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Fetch the real doctor's name from the database
  const { data: doctor, error: doctorError } = await supabase
    .from("doctors")
    .select("name")
    .eq("id", doctorId)
    .single();

  if (doctorError || !doctor) {
    throw new Error("Doctor not found");
  }

  const doctorNameReal = doctor.name;

  // Check if the time slot is already booked
  const { data: existing } = await supabase
    .from("appointments")
    .select("*")
    .eq("doctor_id", doctorId)
    .eq("appointment_date", appointment_date)
    .eq("appointment_time", appointment_time);

  if (existing && existing.length > 0) {
    throw new Error("This time slot is already booked.");
  }

  // Insert the new appointment
  const { error: insertError } = await supabase.from("appointments").insert([
    {
      user_id: user.id,
      doctor_id: doctorId,
      appointment_date,
      appointment_time,
    },
  ]);

  if (insertError) {
    throw new Error(insertError.message);
  }

  // Send confirmation email
  try {
    await sendAppointmentEmail({
      to: email,
      doctorName: doctorNameReal,
      date: appointment_date,
      time: appointment_time,
    });
  } catch (err) {
    console.error("Failed to send email:", err);
  }

  return true;
}
