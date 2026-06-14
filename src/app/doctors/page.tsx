"use client";

import Navbar from "@/components/layout/Navbar";
import DoctorCard from "@/components/ui/DoctorCard";
import { supabase } from "@/lib/supabase-client";
import Image from "next/image";
import { useEffect, useState } from "react";
import SearchFilter from "@/components/ui/SearchFilter";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  photo: string;
  availability: string[];
  created_at: string;
  image_url: string;
  [key: string]: unknown;
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  const specialties = [
    "All Specialties",
    ...new Set(doctors.map((d) => d.specialty)),
  ];
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [search, setSearch] = useState("");

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

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty =
      selectedSpecialty === "All Specialties" ||
      doctor.specialty === selectedSpecialty;

    const matchesSearch = doctor.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesSpecialty && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gray-50 py-12 bg-[linear-gradient(135deg,_#0d2d2a_0%,_#134e4a_50%,_#0d9488_100%)]">
        <div className="flex items-center flex-col md:flex-row gap-6 py-12">
          <div className="flex-1 px-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-8 text-white max-w-2xl leading-tight md:leading-[1.3]">
              Find the Right Doctor For Your Health.
            </h1>
            <p className="text-gray-300 max-w-lg text-base md:text-lg leading-relaxed md:leading-7">
              Browse our directory of qualified healthcare professionals <br />
              to find the right doctor for your needs.
            </p>
          </div>

          <div className="flex-1 px-6 md:px-0">
            <Image
              src="/doctor-3.jpg"
              alt="Doctors Hero"
              width={800}
              height={500}
              className="w-full h-[300px] md:h-[450px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
      <section className="mt-10 h-auto max-w-7xl mx-auto px-6 sm:px-12 py-10">
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && doctors.length > 0 && (
          <SearchFilter
            search={search}
            onSearchChange={setSearch}
            selectedSpecialty={selectedSpecialty}
            onSpecialtyChange={setSelectedSpecialty}
            specialties={specialties}
          />
        )}

        {filteredDoctors.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
            </div>
            <p className="text-gray-700 font-medium text-lg">
              No doctors found
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your search or filter to find what you are looking
              for
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
