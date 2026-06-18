import { supabase } from "@/lib/supabase-client";
import { Doctor } from "@/types";

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

export async function getDoctor(doctorId: string): Promise<Doctor> {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("id", doctorId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getDoctors(): Promise<Doctor[]> {
  const { data, error } = await supabase.from("doctors").select("*");

  if (error) throw new Error(error.message);

  return data || [];
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

export async function deleteDoctor(doctorId: string) {
  const { error } = await supabase.from("doctors").delete().eq("id", doctorId);

  if (error) throw new Error(error.message);
  return true;
}
