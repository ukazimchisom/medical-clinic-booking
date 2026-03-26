import type { Metadata } from "next";
import "./globals.css";

import { Roboto } from "next/font/google";
import { Roboto_Mono as RobotoMono } from "next/font/google";

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
    <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
