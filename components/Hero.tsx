import Image from "next/image";
import Background from "./Background";
import StoryPanel from "./StoryPanel";
import WorldMap from "./WorldMap";
import Stats from "./Stats";
import { getTravelStats } from "@/lib/stats";

export default async function Hero() {
  const stats = await getTravelStats();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#07111f]">
      <Background />

      {/* ========================= */}
      {/* MOBILE HOMEPAGE */}
      {/* ========================= */}
      <div className="relative z-20 flex min-h-screen flex-col lg:hidden">
        {/* Mobile Story */}
        <div className="relative z-40 px-6 pt-8">
          <StoryPanel />
        </div>

        {/* Mobile World Map */}
        <div className="relative z-10 mt-4 w-full px-2">
          <WorldMap />
        </div>

        {/* Mobile Stéphane */}
        <div className="relative z-30 -mt-16 flex justify-center">
          <Image
            src="/images/hero/stephane.png"
            alt="Stephane"
            width={400}
            height={610}
            priority
            className="w-[190px] object-contain"
          />
        </div>

        {/* Mobile Statistics */}
        <div className="relative z-50 mt-auto px-3 pb-3">
          <Stats
            countries={stats.countries}
            cities={stats.cities}
            continents={stats.continents}
            photos={stats.photos}
          />
        </div>
      </div>

      {/* ========================= */}
      {/* DESKTOP HOMEPAGE — LOCKED */}
      {/* ========================= */}
      <div className="relative z-20 mx-auto hidden h-screen max-w-[1800px] lg:block">
        {/* Story */}
        <div className="absolute right-10 bottom-10 z-20">
          <StoryPanel />
        </div>

        {/* World Map */}
        <div className="absolute top-0 left-[8%] z-10 w-[90%]">
          <WorldMap />
        </div>

        {/* Stephane */}
        <div className="absolute bottom-10 left-6 z-40">
          <Image
            src="/images/hero/stephane.png"
            alt="Stephane"
            width={400}
            height={610}
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Desktop Statistics */}
      <div className="absolute bottom-0 left-[5%] z-50 hidden lg:block">
        <Stats
          countries={stats.countries}
          cities={stats.cities}
          continents={stats.continents}
          photos={stats.photos}
        />
      </div>
    </section>
  );
}
