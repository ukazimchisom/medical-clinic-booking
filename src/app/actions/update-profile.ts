"use server";

import { createClient } from "@/lib/supabase-server";

export async function updateProfile({
  fullName,
  photoFile,
}: {
  fullName: string;
  photoFile?: FormData;
}) {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  let photoUrl: string | undefined;

  // Upload photo if provided
  if (photoFile) {
    const file = photoFile.get("photo") as File;

    if (file && file.size > 0) {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/profile.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("profile_photos")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw new Error("Failed to upload photo");
      }

      const { data: publicUrlData } = supabase.storage
        .from("profile_photos")
        .getPublicUrl(filePath);

      photoUrl = publicUrlData.publicUrl;
    }
  }

  // Update profile in database
  const updates: Record<string, string> = {
    full_name: fullName,
  };

  if (photoUrl) {
    updates.avatar_url = photoUrl;
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return true;
}
