import AboutUs from "@/components/layout/AboutUs";
import Hero from "@/components/layout/Hero";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-300 ">
      <Navbar />
      <Hero />
      <AboutUs />
    </main>
  );
}
