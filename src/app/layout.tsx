import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Roboto } from "next/font/google";
import QueryProvider from "@/components/provider/QueryProvider";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "DocSlot",
  description: "Healthcare appointment booking platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <Toaster position="top-right" richColors />
      <html lang="en">
        <body className={roboto.className}>{children}</body>
      </html>
    </QueryProvider>
  );
}
