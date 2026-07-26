import Image from "next/image";

type StoryHeroProps = {
  destination: string;
  month: string;
  year: number;
  coverImage?: string;
};

export default function StoryHero({
  destination,
  month,
  year,
  coverImage,
}: StoryHeroProps) {
  return (
    <section className="relative pb-16">
      <div className="mx-auto max-w-7xl px-8">
        <div className="relative overflow-hidden rounded-[36px] shadow-2xl">
          {coverImage ? (
            <>
              <Image
                src={coverImage}
                alt={destination}
                width={1600}
                height={900}
                priority
                className="h-[300px] w-full object-cover object-center md:h-[420px] lg:h-[520px]"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/75 via-[#07111f]/20 to-transparent" />
            </>
          ) : (
            <div className="flex h-[300px] items-center justify-center bg-slate-800 text-gray-400 md:h-[420px] lg:h-[520px]">
              No Cover Photo
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 -mt-16 text-center">
        <div className="inline-block rounded-full border border-amber-400/40 bg-[#07111f]/95 px-7 py-3 shadow-xl backdrop-blur-md">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">
            {month} {year}
          </p>
        </div>

        <h1 className="mt-8 font-serif text-6xl text-white drop-shadow-xl md:text-7xl">
          {destination}
        </h1>
      </div>
    </section>
  );
}