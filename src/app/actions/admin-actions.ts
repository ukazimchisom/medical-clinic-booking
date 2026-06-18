"use server";

import { createClient } from "@/lib/supabase-server";

export async function addDoctorAction({
  name,
  specialty,
  photo,
}: {
  name: string;
  specialty: string;
  photo: string;
}) {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  // Check if user is admin
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile || profile.role !== "admin") {
    throw new Error("Unauthorized — admin only");
  }

  // Insert new doctor
  const { error } = await supabase.from("doctors").insert([
    {
      name,
      specialty,
      photo,
    },
  ]);

  if (error) throw new Error(error.message);

  return true;
}

export async function deleteDoctorAction(doctorId: string) {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  // Check if user is admin
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile || profile.role !== "admin") {
    throw new Error("Unauthorized — admin only");
  }

  // Delete doctor
  const { error } = await supabase.from("doctors").delete().eq("id", doctorId);

  if (error) throw new Error(error.message);

  return true;
}
