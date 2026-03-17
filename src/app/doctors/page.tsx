"use client";

import Navbar from "@/components/layout/Navbar";
import DoctorCard from "@/components/ui/DoctorCard";
import { supabase } from "@/lib/supabase-client";
import { useEffect, useState } from "react";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDoctors() {
      const { data, error } = await supabase.from("doctors").select("*");

      if (error) {
        console.error(error);
      } else {
        setDoctors(data || []);
      }

      setLoading(false);
    }

    loadDoctors();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Our Doctors</h1>

        {loading && <p className="text-gray-500">Loading doctors...</p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </main>
  );
}
