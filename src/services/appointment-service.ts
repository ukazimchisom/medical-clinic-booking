import { supabase } from "@/lib/supabase-client";

export async function getUserAppointments(userId: string) {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("user_id", userId)
    .order("appointment_date", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
