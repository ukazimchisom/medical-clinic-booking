"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { doctorSchema, DoctorFormData } from "@/lib/validators/doctor";

import { createDoctor } from "@/services/doctor-service";
import AuthGuard from "@/components/AuthGuard";

export default function NewDoctorPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorFormData>({
    resolver: zodResolver(doctorSchema),
  });

  async function onSubmit(data: DoctorFormData) {
    try {
      setLoading(true);

      await createDoctor(data);

      alert("Doctor created successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to create doctor");
    }

    setLoading(false);
  }

  return (
    <AuthGuard adminOnly>
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="max-w-xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-bold mb-6">Add Doctor</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow flex flex-col gap-4"
          >
            <div>
              <label className="text-sm font-medium">Doctor Name</label>

              <input
                {...register("name")}
                className="w-full border rounded-md px-3 py-2 mt-1"
              />

              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Specialty</label>

              <input
                {...register("specialty")}
                className="w-full border rounded-md px-3 py-2 mt-1"
              />

              {errors.specialty && (
                <p className="text-red-500 text-sm">
                  {errors.specialty.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Photo URL</label>

              <input
                {...register("photo")}
                className="w-full border rounded-md px-3 py-2 mt-1"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-md"
            >
              {loading ? "Creating..." : "Create Doctor"}
            </button>
          </form>
        </div>
      </main>
    </AuthGuard>
  );
}
