import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import InteractiveMap from "@/components/InteractiveMap";
import ExploreWorld from "@/components/ExploreWorld";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#07111f] text-white">

      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <Hero />

      {/* Where I've Been */}
      <InteractiveMap />

      {/* Explore the World */}
      <ExploreWorld />

    </main>
  );
}