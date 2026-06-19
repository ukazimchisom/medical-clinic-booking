"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { updateProfile } from "@/app/actions/update-profile";
import Navbar from "@/components/layout/Navbar";
import AuthGuard from "@/components/AuthGuard";
import Image from "next/image";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile } from "@/services/appointment-service";
import ProfileSkeleton from "@/components/ui/ProfileSkeleton";

export default function ProfilePage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getProfile(user!.id),
    enabled: !!user,
  });

  // Sync profile data into local state when it loads
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setPreviewUrl(profile.avatar_url || null);
    }
  }, [profile]);

  // Handle photo selection
  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  // Handle form submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      let photoFormData: FormData | undefined;

      if (photoFile) {
        photoFormData = new FormData();
        photoFormData.append("photo", photoFile);
      }

      await updateProfile({
        fullName,
        photoFile: photoFormData,
      });

      // Invalidate cache so profile refetches fresh data
      await queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });

      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    }

    setLoading(false);
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-50 mt-12">
        <Navbar />
        <div className="max-w-lg mx-auto px-6 py-12">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            My Profile
          </h1>

          {profileLoading ? (
            <ProfileSkeleton />
          ) : (
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Photo upload */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                    <Image
                      src={previewUrl || "/default-avatar.png"}
                      alt="Profile photo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Change photo
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>

                {/* Full name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Email - read only */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profile?.email || user?.email || ""}
                    disabled
                    className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400">
                    Email cannot be changed
                  </p>
                </div>

                {/* Role - read only */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <input
                    type="text"
                    value={profile?.role || ""}
                    disabled
                    className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed capitalize"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </AuthGuard>
  );
}
