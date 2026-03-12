"use client";

import Navbar from "@/components/layout/Navbar";
import DoctorCard from "@/components/ui/DoctorCard";
import { Doctor } from "@/types";

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    photo: "/doctor-2.jpg",
    availability: [],
    created_at: "",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    photo: "/doctor-1.jpg",
    availability: [],
    created_at: "",
  },
  {
    id: "3",
    name: "Dr. Emily Davis",
    specialty: "Pediatrician",
    photo: "/doctor-3.jpg",
    availability: [],
    created_at: "",
  },
];

export default function DoctorsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Our Doctors</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </main>
  );
}
