import Image from "next/image";
import Background from "./Background";
import StoryPanel from "./StoryPanel";
import WorldMap from "./WorldMap";
import Stats from "./Stats";
import { getTravelStats } from "@/lib/stats";

export default async function Hero() {
  const stats = await getTravelStats();

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background */}
      <Background />

      {/* Main Content */}
      <div className="relative z-20 mx-auto h-screen max-w-[1800px]">
        {/* Story */}
        <div className="absolute left-12 top-12 z-20">
          <StoryPanel />
        </div>

        {/* World Map */}
        <div className="absolute top-6 left-[14%] z-10 w-[100%]">
          <WorldMap />
        </div>

        {/* Stephane */}
        <div className="absolute bottom-0 left-10 z-40">
          <Image
            src="/images/hero/stephane.png"
            alt="Stephane"
            width={440}
            height={670}
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="absolute bottom-[58px] left-[27.5%] z-50">
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