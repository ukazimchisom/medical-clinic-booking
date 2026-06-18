"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/layout/Navbar";
import {
  getAllAppointments,
  getAllUsers,
  getDoctors,
} from "@/services/appointment-service";
import {
  addDoctorAction,
  deleteDoctorAction,
} from "@/app/actions/admin-actions";
import { toast } from "sonner";
import Image from "next/image";

type Tab = "doctors" | "appointments" | "users";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("doctors");
  const [doctorForm, setDoctorForm] = useState({
    name: "",
    specialty: "",
    photo: "",
  });
  const [addingDoctor, setAddingDoctor] = useState(false);
  const queryClient = useQueryClient();

  // Fetch doctors
  const { data: doctors = [], isLoading: doctorsLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  // Fetch all appointments
  const { data: appointments = [], isLoading: appointmentsLoading } = useQuery({
    queryKey: ["allAppointments"],
    queryFn: getAllAppointments,
    enabled: activeTab === "appointments",
  });

  // Fetch all users
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
    enabled: activeTab === "users",
  });

  async function handleAddDoctor(e: React.FormEvent) {
    e.preventDefault();
    setAddingDoctor(true);
    try {
      await addDoctorAction(doctorForm);
      toast.success("Doctor added successfully");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      setDoctorForm({ name: "", specialty: "", photo: "" });
    } catch (error: any) {
      toast.error(error.message);
    }
    setAddingDoctor(false);
  }

  async function handleDeleteDoctor(doctorId: string) {
    toast("Are you sure you want to delete this doctor?", {
      action: {
        label: "Yes, delete",
        onClick: async () => {
          try {
            await deleteDoctorAction(doctorId);
            toast.success("Doctor deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["doctors"] });
          } catch (error: any) {
            toast.error(error.message);
          }
        },
      },
      cancel: {
        label: "No, keep",
        onClick: () => {},
      },
    });
  }

  const tabs: { label: string; value: Tab }[] = [
    { label: "Doctors", value: "doctors" },
    { label: "Appointments", value: "appointments" },
    { label: "Users", value: "users" },
  ];

  return (
    <AuthGuard adminOnly>
      <main className="min-h-screen bg-gray-50 mt-12">
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Admin Dashboard
          </h1>

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-8 border-b border-gray-200">
            {tabs.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActiveTab(value)}
                className={`px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px ${
                  activeTab === value
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Doctors tab */}
          {activeTab === "doctors" && (
            <div className="flex flex-col gap-6">
              {/* Add doctor form */}
              <div className="bg-white border border-gray-100 rounded-xl p-6">
                <h2 className="text-base font-semibold text-gray-800 mb-4">
                  Add New Doctor
                </h2>
                <form
                  onSubmit={handleAddDoctor}
                  className="flex flex-col gap-3"
                >
                  <input
                    type="text"
                    placeholder="Full name e.g. Dr. John Smith"
                    value={doctorForm.name}
                    onChange={(e) =>
                      setDoctorForm({ ...doctorForm, name: e.target.value })
                    }
                    required
                    className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Specialty e.g. Cardiologist"
                    value={doctorForm.specialty}
                    onChange={(e) =>
                      setDoctorForm({
                        ...doctorForm,
                        specialty: e.target.value,
                      })
                    }
                    required
                    className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Photo URL"
                    value={doctorForm.photo}
                    onChange={(e) =>
                      setDoctorForm({ ...doctorForm, photo: e.target.value })
                    }
                    required
                    className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={addingDoctor}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {addingDoctor ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Adding...
                      </span>
                    ) : (
                      "Add Doctor"
                    )}
                  </button>
                </form>
              </div>

              {/* Doctors list */}
              <div className="flex flex-col gap-3">
                {doctorsLoading && (
                  <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                {!doctorsLoading && doctors.length === 0 && (
                  <div className="bg-white border border-gray-100 rounded-xl px-6 py-12 text-center">
                    <p className="text-gray-500 text-sm">No doctors found.</p>
                  </div>
                )}
                {!doctorsLoading &&
                  doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                          <Image
                            src={doctor.photo || "/default-doctor.jpg"}
                            alt={doctor.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {doctor.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {doctor.specialty}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteDoctor(doctor.id)}
                        className="text-xs text-red-700 border border-red-200 rounded-md px-2.5 py-1 hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Appointments tab */}
          {activeTab === "appointments" && (
            <div className="flex flex-col gap-3">
              {appointmentsLoading && (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {!appointmentsLoading && appointments.length === 0 && (
                <div className="bg-white border border-gray-100 rounded-xl px-6 py-12 text-center">
                  <p className="text-gray-500 text-sm">
                    No appointments found.
                  </p>
                </div>
              )}
              {!appointmentsLoading &&
                appointments.map((apt: any) => (
                  <div
                    key={apt.id}
                    className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800">
                        {apt.user_name || apt.user_email}
                      </p>
                      <p className="text-xs text-gray-500">
                        {apt.user_email} · {apt.doctors?.name} ·{" "}
                        {apt.doctors?.specialty}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-xs text-gray-500">
                        {new Date(apt.appointment_date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}{" "}
                        · {apt.appointment_time}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          apt.status === "cancelled"
                            ? "bg-red-50 text-red-800"
                            : "bg-green-50 text-green-800"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Users tab */}
          {activeTab === "users" && (
            <div className="flex flex-col gap-3">
              {usersLoading && (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {!usersLoading && users.length === 0 && (
                <div className="bg-white border border-gray-100 rounded-xl px-6 py-12 text-center">
                  <p className="text-gray-500 text-sm">No users found.</p>
                </div>
              )}
              {!usersLoading &&
                users.map((user: any) => (
                  <div
                    key={user.id}
                    className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800">
                        {user.full_name || "No name"}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        user.role === "admin"
                          ? "bg-purple-50 text-purple-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>
    </AuthGuard>
  );
}
