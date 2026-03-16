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
