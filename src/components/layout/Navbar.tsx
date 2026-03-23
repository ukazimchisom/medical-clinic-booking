import Link from "next/link";
import Button from "../ui/Button";

export default function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-bold text-blue-600">
          DocSlot
        </Link>

        <div className="flex items-center text-sm gap-4">
          <Link href="/register" className="text-gray-700 hover:text-blue-600">
            Sign Up
          </Link>

          <Link href="/login">
            <Button className="px-4 py-1">Login</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
