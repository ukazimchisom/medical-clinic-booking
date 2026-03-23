import Link from "next/link";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="w-full h-[90vh] mx-auto px-6 sm:px-12 py-20 grid md:grid-cols-2 gap-10 items-center bg-hero-pattern bg-no-repeat bg-cover bg-center">
      <div className="sm:px-6">
        <span className="block text-gray-200 font-bold mb-2">
          We are here for your care.
        </span>
        <h1 className="text-4xl font-bold text-white mb-6">
          Book Medical Appointments Easily.
        </h1>

        <p className="text-gray-200 mb-8">
          DocSlot helps patients schedule appointments with doctors quickly and
          efficiently. Manage your bookings, view available doctors, and receive
          confirmation emails instantly.
        </p>

        <div className="flex gap-4">
          <Link href="/register">
            <Button>Create Account</Button>
          </Link>

          <Link href="/doctors">
            <Button className="bg-gray-800 hover:bg-gray-900">
              Book Appointment
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
