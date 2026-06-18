"use server";

import { createClient } from "@/lib/supabase-server";
import { sendCancellationEmail } from "@/lib/email";

export async function cancelAppointmentAction(appointmentId: string) {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Fetch appointment details needed for the email
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

  // Update the status to cancelled
  const { error: updateError } = await supabase
    .from("appointments")
    .update({ status: "cancelled" })
    .eq("id", appointmentId)
    .eq("user_id", user.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return true;
}
