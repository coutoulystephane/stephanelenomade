import Image from "next/image";
import Background from "./Background";
import StoryPanel from "./StoryPanel";
import WorldMap from "./WorldMap";
import Stats from "./Stats";
import { getTravelStats } from "@/lib/stats";

export default async function Hero() {
  const stats = await getTravelStats();

  return (
    <section className="relative h-screen min-h-[760px] overflow-hidden">
      {/* Background */}
      <Background />

      {/* Main Content */}
      <div className="relative z-20 mx-auto h-screen max-w-[1800px]">
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

      {/* Statistics */}
      <div className="absolute bottom-0 left-[5%] z-50">
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