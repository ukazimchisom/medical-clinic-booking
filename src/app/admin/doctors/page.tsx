"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

import { getDoctors, deleteDoctor } from "@/services/doctor-service";
import AuthGuard from "@/components/AuthGuard";

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  photo?: string;
};

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDoctors() {
      try {
        const data = await getDoctors();
        setDoctors(data || []);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

    loadDoctors();
  }, []);

  async function handleDelete(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this doctor?",
    );

    if (!confirmDelete) return;

    try {
      await deleteDoctor(id);

      setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete doctor.");
    }
  }

  return (
    <AuthGuard adminOnly>
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Doctors</h1>

            <Link
              href="/admin/doctors/new"
              className="text-blue-600 hover:underline"
            >
              Add Doctor
            </Link>
          </div>

          {loading && <p>Loading doctors...</p>}

          {!loading && doctors.length === 0 && <p>No doctors found.</p>}

          <div className="grid md:grid-cols-2 gap-4">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white p-4 rounded-lg shadow">
                {doctor.photo && (
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full mb-3"
                  />
                )}

                <p className="font-semibold">{doctor.name}</p>

                <p className="text-sm text-gray-500">{doctor.specialty}</p>

                <div className="flex gap-4 mt-3 text-sm">
                  <Link
                    href={`/admin/doctors/${doctor.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(doctor.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
