import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <main className="bg-[#08121f] text-white">
      <Navigation />
      <Hero />
      <Stats />
    </main>
  );
}