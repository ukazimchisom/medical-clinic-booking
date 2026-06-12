import type { Metadata } from "next";
// @ts-expect-error: Allow side-effect CSS import in Next.js app directory
import "./globals.css";
import { Toaster } from "sonner";

import { Roboto } from "next/font/google";
import { Roboto_Mono as RobotoMono } from "next/font/google";
import QueryProvider from "@/components/provider/QueryProvider";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

const robotoMono = RobotoMono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
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
      <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
        <body className="font-sans">{children}</body>
      </html>
    </QueryProvider>
  );
}
