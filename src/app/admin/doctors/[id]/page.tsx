"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { doctorSchema, DoctorFormData } from "@/lib/validators/doctor";

import { getDoctorById, updateDoctor } from "@/services/doctor-service";
import AuthGuard from "@/components/AuthGuard";

export default function EditDoctorPage() {
  const params = useParams();
  const doctorId = params.id as string;

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DoctorFormData>({
    resolver: zodResolver(doctorSchema),
  });

  useEffect(() => {
    async function loadDoctor() {
      try {
        const doctor = await getDoctorById(doctorId);

        reset({
          name: doctor.name,
          specialty: doctor.specialty,
          photo: doctor.photo || "",
        });
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

    loadDoctor();
  }, [doctorId, reset]);

  async function onSubmit(data: DoctorFormData) {
    try {
      await updateDoctor(doctorId, data);

      alert("Doctor updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update doctor");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <p className="p-6">Loading doctor...</p>
      </main>
    );
  }

  return (
    <AuthGuard adminOnly>
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="max-w-xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-bold mb-6">Edit Doctor</h1>

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
              Update Doctor
            </button>
          </form>
        </div>
      </main>
    </AuthGuard>
  );
}
