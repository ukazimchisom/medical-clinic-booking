import { supabase } from "@/lib/supabase-client";

export async function getUserAppointments(userId: string) {
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
        specialty
      )
    `,
    )
    .eq("user_id", userId)
    .order("appointment_date", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function cancelAppointment(appointmentId: string) {
  const { error } = await supabase
    .from("appointments")
    .update({ status: "cancelled" })
    .eq("id", appointmentId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return true;
}
