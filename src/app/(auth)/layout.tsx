import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center flex-col justify-center">
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8  ">
          <Link href="/" className="">
            <span className="text-xl font-bold text-green-600">Docslot</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
