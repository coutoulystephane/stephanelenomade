import Link from "next/link";
import Image from "next/image";
import { continents } from "@/content/continents";

export default function ExploreWorld() {
  return (
    <section className="min-h-screen bg-[#07111f] px-8 py-20 text-white">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-16 text-center">
          <p className="mb-5 text-sm uppercase tracking-[0.45em] text-[#d4af37]">
            JOURNEYS BY CONTINENT
          </p>

          <h1 className="font-serif text-6xl md:text-7xl">
            Every continent has
            <br />
            a different story.
          </h1>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {continents.map((continent) => (
            <Link
              key={continent.id}
              href={`/${continent.id}`}
              className="
                group
                overflow-hidden
                rounded-[30px]
                border
                border-[#d4af37]/20
                bg-[#08121d]
                transition-all
                duration-500
                hover:border-[#d4af37]/60
                hover:shadow-[0_0_40px_rgba(212,175,55,0.16)]
              "
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={continent.image}
                  alt={continent.name}
                  fill
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>

              <div className="flex items-center justify-between px-7 py-6">
                <span
                  className="
                    rounded-full
                    border
                    border-[#d4af37]/60
                    px-6
                    py-2.5
                    text-sm
                    text-[#d4af37]
                    transition-all
                    duration-300
                    group-hover:bg-[#d4af37]
                    group-hover:text-black
                  "
                >
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/"
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-[#d4af37]/40
              px-7
              py-3
              text-sm
              uppercase
              tracking-[0.2em]
              text-[#d4af37]
              transition-all
              duration-300
              hover:border-[#d4af37]
              hover:bg-[#d4af37]/10
            "
          >
            ← BACK TO MAP
          </Link>
        </div>
      </div>
    </section>
  );
}