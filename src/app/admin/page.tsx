import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Doctor Management</h2>

          <Link
            href="/admin/doctors/new"
            className="text-blue-600 hover:underline"
          >
            Add New Doctor
          </Link>
        </div>
      </div>
    </main>
  );
}
