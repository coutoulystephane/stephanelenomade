"use client";

import Image from "next/image";

export default function InteractiveMap() {
  return (
    <section className="relative w-full bg-[#07111f] pt-36 pb-12">

      {/* ================= Header ================= */}

      <div className="mx-auto mb-12 max-w-7xl px-10">

        <div className="flex flex-col items-center">

          <div className="mb-5 flex w-full max-w-3xl items-center gap-5">

            <div className="h-px flex-1 bg-[#d4af37]/30" />

            <div className="text-xl text-[#d4af37]">
              ✦
            </div>

            <div className="h-px flex-1 bg-[#d4af37]/30" />

          </div>

          <p className="mb-4 text-sm uppercase tracking-[0.45em] text-[#d4af37]">
            WHERE I'VE BEEN
          </p>

          <h2 className="text-center font-serif text-6xl leading-tight text-white">
            Every destination changed me.
            <br />
            Every journey has{" "}
            <span className="italic text-[#d4af37]">
              a story.
            </span>
          </h2>

        </div>

      </div>

      {/* ================= Main Layout ================= */}

      <div className="mx-auto flex max-w-[1800px] gap-12 px-10">

        {/* ================= Map ================= */}

        <div
          className="
            relative
            flex-1
            overflow-hidden
            rounded-[32px]
            border
            border-[#d4af37]/20
            bg-[#08121d]
            shadow-[0_0_80px_rgba(212,175,55,0.08)]
          "
        >

          <Image
            src="/images/hero/world-map-gold.png"
            alt="World Map"
            width={1600}
            height={950}
            className="
             w-full
             h-auto
             object-cover
             scale-[1.07]
             translate-x-10
             -translate-y-24
             brightness-110
            contrast-110
            saturate-110
            drop-shadow-[0_0_35px_rgba(212,175,55,0.35)]
            "
          />

          {/* ================= Map Controls ================= */}

          <div
            className="
              absolute
              left-8
              top-1/2
              -translate-y-1/2
              overflow-hidden
              rounded-2xl
              border
              border-[#d4af37]/20
              bg-black/40
              backdrop-blur-xl
            "
          >

            {["🌐", "◎", "+", "−"].map((item) => (
              <button
                key={item}
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  border-b
                  border-[#d4af37]/10
                  text-2xl
                  text-[#d4af37]
                  transition
                  hover:bg-[#d4af37]/10
                  last:border-b-0
                "
              >
                {item}
              </button>
            ))}

          </div>

          {/* ================= Bottom Stats ================= */}

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              grid
              grid-cols-4
              border-t
              border-[#d4af37]/20
              bg-[rgba(8,8,8,0.55)]
              backdrop-blur-2xl
            "
          >

            <Stat
              number="56"
              title="COUNTRIES"
              subtitle="Visited"
            />

            <Stat
              number="188"
              title="CITIES"
              subtitle="Explored"
            />

            <Stat
              number="142,000"
              title="KM TRAVELLED"
              subtitle=""
            />

            <Stat
              number="6"
              title="CONTINENTS"
              subtitle=""
            />

          </div>

        </div>

        {/* ================= Country Panel ================= */}

        <div
          className="
        w-[370px]
        rounded-[32px]
        border
        border-[#d4af37]/20
        bg-[rgba(18,14,12,0.82)]
        p-8
        backdrop-blur-3xl
          "
        >

          <div className="mb-6 text-5xl">
            🇫🇷
          </div>

          <h3 className="font-serif text-5xl text-[#d4af37]">
            France
          </h3>

          <p className="mb-10 text-2xl italic text-[#d4af37]">
            12 Trips
          </p>

          <City name="Paris" />
          <City name="Lyon" />
          <City name="Nice" />

          <div className="my-10 h-px bg-[#d4af37]/20" />

          <div className="flex justify-between">

            <div>

              <div className="text-5xl font-bold text-white">
                1,248
              </div>

              <div className="text-sm uppercase text-white/60">
                Photos
              </div>

            </div>

            <div>

              <div className="text-5xl font-bold text-white">
                6
              </div>

              <div className="text-sm uppercase text-white/60">
                Journal Entries
              </div>

            </div>

          </div>

          <div className="my-10 h-px bg-[#d4af37]/20" />

          <h4 className="mb-4 uppercase tracking-widest text-[#d4af37]">
            Favorite Memory
          </h4>

          <p className="italic leading-8 text-white/80">
            Watching the sunrise from
            Sacré-Cœur in Montmartre.
          </p>

        </div>

      </div>

    </section>
  );
}

function City({ name }: { name: string }) {
  return (
    <div
      className="
        mb-4
        rounded-xl
        border
        border-white/10
        bg-black/20
        p-4
        text-3xl
        text-white
        transition
        hover:border-[#d4af37]/40
      "
    >
      {name}
    </div>
  );
}

function Stat({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="border-r border-[#d4af37]/10 py-8 text-center last:border-r-0">

      <div className="text-5xl font-bold text-white">
        {number}
      </div>

      <div className="mt-3 text-sm tracking-[0.3em] text-white">
        {title}
      </div>

      {subtitle && (
        <div className="mt-1 text-white/60">
          {subtitle}
        </div>
      )}

    </div>
  );
}