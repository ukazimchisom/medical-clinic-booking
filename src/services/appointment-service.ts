import { supabase } from "@/lib/supabase-client";

import { Appointment } from "@/types";
import { Doctor } from "@/types";

export async function getUserAppointments(
  userId: string,
): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from("appointments")
    .select(
      `
      id,
      doctor_id,
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
    .order("appointment_date", { ascending: true });

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

export async function getDoctors(): Promise<Doctor[]> {
  const { data, error } = await supabase.from("doctors").select("*");

  if (error) throw new Error(error.message);

  return data || [];
}

interface Profile {
  full_name: string;
  email: string;
  avatar_url: string | null;
  role: string;
}

export async function getProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .select("full_name, email, avatar_url, role")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

//*********************************************************************** */

export async function getAllAppointments() {
  const { data: appointmentsData, error: appointmentsError } = await supabase
    .from("appointments")
    .select(
      `
      id,
      user_id,
      appointment_date,
      appointment_time,
      status,
      doctors (
        name,
        specialty
      )
    `,
    )
    .order("appointment_date", { ascending: true });

  if (appointmentsError) throw new Error(appointmentsError.message);

  // Fetch all profiles to match user_id to email and name
  const { data: profilesData, error: profilesError } = await supabase
    .from("profiles")
    .select("id, full_name, email");

  if (profilesError) throw new Error(profilesError.message);

  // Merge appointments with profile data
  const appointments = (appointmentsData || []).map((apt) => {
    const profile = profilesData?.find((p) => p.id === apt.user_id);
    return {
      ...apt,
      user_email: profile?.email || "Unknown",
      user_name: profile?.full_name || "Unknown",
    };
  });

  return appointments;
}

export async function getAllUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function deleteDoctor(doctorId: string) {
  const { error } = await supabase.from("doctors").delete().eq("id", doctorId);

  if (error) throw new Error(error.message);
  return true;
}
