import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 sm:px-12 py-12">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-4">
        <div>
          <h2 className="text-white text-2xl font-bold mb-4">DocSlot</h2>
          <p className="text-sm">
            Making healthcare accessible and convenient. Book appointments with
            trusted doctors anytime.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/#about">About</Link>
            </li>
            <li>
              <Link href="/doctors">Doctors</Link>
            </li>
            <li>
              <Link href="/#services">Services</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Appointment Booking</li>
            <li>Online Consultation</li>
            <li>24/7 Support</li>
            <li>Medical Records</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@docslot.com</li>
            <li>Phone: +234 800 000 0000</li>
            <li>Location: Nigeria</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        © {new Date().getFullYear()} DocSlot. All rights reserved.
      </div>
    </footer>
  );
}
