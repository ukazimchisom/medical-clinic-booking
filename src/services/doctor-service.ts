import { supabase } from "@/lib/supabase-client";

export async function createDoctor(data: {
  name: string;
  specialty: string;
  photo?: string;
}) {
  const { error } = await supabase.from("doctors").insert([data]);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}

export async function getDoctors() {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteDoctor(id: string) {
  const { error } = await supabase.from("doctors").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}

export async function getDoctorById(id: string) {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateDoctor(
  id: string,
  data: {
    name: string;
    specialty: string;
    photo?: string;
  },
) {
  const { error } = await supabase.from("doctors").update(data).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}
