import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Book Medical Appointments Easily
          </h1>

          <p className="text-gray-600 mb-8">
            ClinicFlow helps patients schedule appointments with doctors quickly
            and efficiently. Manage your bookings, view available doctors, and
            receive confirmation emails instantly.
          </p>

          <div className="flex gap-4">
            <Link href="/register">
              <Button>Create Account</Button>
            </Link>

            <Link href="/doctors">
              <Button className="bg-gray-800 hover:bg-gray-900">
                View Doctors
              </Button>
            </Link>
          </div>
        </div>

        <div className="hidden md:block">
          <Image
            src="/medical-hero.jpg"
            alt="medical"
            className="rounded-lg shadow"
            width={600}
            height={400}
          />
        </div>
      </section>
    </main>
  );
}
