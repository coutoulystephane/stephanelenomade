import Image from "next/image";
import Link from "next/link";
import { continents } from "@/content/continents";

export default function ExploreWorld() {
  return (
    <section className="w-full bg-[#07111f] pt-28 pb-24">
      <div className="mx-auto max-w-[1700px] px-10">

        {/* ================= Header ================= */}

        <div className="mb-20 flex flex-col items-center">

          <div className="mb-5 flex w-full max-w-3xl items-center gap-5">
            <div className="h-px flex-1 bg-[#d4af37]/30" />

            <div className="text-xl text-[#d4af37]">
              ✦
            </div>

            <div className="h-px flex-1 bg-[#d4af37]/30" />
          </div>

          <p className="mb-4 text-sm uppercase tracking-[0.45em] text-[#d4af37]">
            JOURNEYS BY CONTINENT
          </p>

          <h2 className="text-center font-serif text-6xl leading-tight text-white">
            Every continent has
            <br />
            <span className="italic text-[#d4af37]">
              a different story.
            </span>
          </h2>

        </div>

        {/* ================= Cards ================= */}

        <div className="grid grid-cols-3 gap-10">

          {continents.map((continent) => (

            <div
              key={continent.id}
              className="
                group
                overflow-hidden
                rounded-[32px]
                border
                border-[#d4af37]/20
                bg-[#08121d]
                transition-all
                duration-500
                hover:border-[#d4af37]/60
                hover:shadow-[0_0_45px_rgba(212,175,55,0.18)]
              "
            >

              {/* Artwork */}

              <div className="relative h-[280px] overflow-hidden">

                <Image
                  src={continent.image}
                  alt={continent.name}
                  fill
                  className="
                    object-cover
                    object-top
                    transition-transform
                    duration-700
                    group-hover:scale-[1.15]
                  "
                />

              </div>

              {/* Footer */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-t
                  border-[#d4af37]/20
                  bg-[rgba(8,12,20,0.82)]
                  px-8
                  py-[18px]
                  backdrop-blur-xl
                "
              >

                <Link
                  href={continent.href}
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-[#d4af37]/60
                    px-7
                    py-2.5
                    text-sm
                    text-[#d4af37]
                    transition-all
                    duration-300
                    hover:bg-[#d4af37]
                    hover:text-black
                  "
                >
                  Explore →
                </Link>

                <div className="text-right">

                  <div className="text-lg font-semibold text-white">
                    {continent.countries > 0 ? continent.countries : "—"}
                  </div>

                  <div className="text-xs uppercase tracking-[0.18em] text-white/60">
                    {continent.countries > 0
                      ? "Countries"
                      : "Coming Soon"}
                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}