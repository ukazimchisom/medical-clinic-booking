import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] overflow-hidden"
    >
      <Image
        src="/doctor-patient-3.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover object-[70%_center]"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 via-teal-500/50 to-transparent" />

      <div className="relative z-10 px-6 sm:px-7 py-20 max-w-6xl mx-auto grid md:grid-cols-2 items-center mt-10">
        <div className="text-white">
          <span className="block font-bold mb-2">
            We are here for your care.
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Book Medical Appointments Easily.
          </h1>

          <p className="mb-8 max-w-md">
            DocSlot helps patients schedule appointments with doctors quickly
            and efficiently.
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
      </div>
    </section>
  );
}
