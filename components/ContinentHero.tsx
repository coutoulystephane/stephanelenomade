import Image from "next/image";
import { continents } from "@/content/continents";

type Props = {
  continent: string;
};

export default function ContinentHero({ continent }: Props) {
  const data = continents.find((c) => c.id === continent);

  if (!data) return null;

  return (
    <section className="relative h-[70vh] overflow-hidden">
      <Image
        src={data.image}
        alt={data.name}
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          <p className="mb-6 uppercase tracking-[0.45em] text-[#d4af37]">
            JOURNEYS THROUGH
          </p>

          <h1 className="font-serif text-7xl text-white">
            {data.name}
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-2xl italic text-white/90">
            {data.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}