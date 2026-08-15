"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type DestinationCardProps = {
  geonameId?: number;
  name?: string;
  country?: string;
  visitMonth?: string;
  visitYear?: number;
  coverImage?: string | null;
};

export default function DestinationCard({
  geonameId,
  name,
  country,
  visitMonth,
  visitYear,
  coverImage,
}: DestinationCardProps) {
  const router = useRouter();

  const hasDestination = !!name;

  return (
    <div
      className="
        absolute
        bottom-[-45px]
        right-[80px]
        z-50
        w-[460px]
        rounded-[28px]
        border
        border-white/10
        bg-[rgba(12,10,9,0.78)]
        p-5
        text-white
        shadow-[0_20px_60px_rgba(0,0,0,0.4)]
        backdrop-blur-2xl
      "
    >
      {!hasDestination ? (
        <>
          <div className="flex items-start gap-4">
            <div className="text-3xl text-[#E7C35A]">✦</div>

            <div>
              <h2 className="font-serif text-3xl text-white">
                Discover My Journey
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/70">
                Every glowing pin marks a place I've visited — and every place
                has a story.
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E7C35A]">
              Explore the map
            </span>

            <span className="text-xl text-[#E7C35A]">→</span>
          </div>
        </>
      ) : (
        <>
          {/* Cover Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
            {coverImage ? (
              <Image
                src={coverImage}
                alt={name ?? "Destination"}
                fill
                className="object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-white/5 text-gray-500">
                No cover image
              </div>
            )}
          </div>

          {/* Destination Row */}
          <div className="mt-4 flex flex-wrap items-center gap-2 border-b border-white/5 pb-3">
            <h2 className="text-3xl font-bold leading-none">{name}</h2>

            {country && (
              <>
                <span className="text-white/20">|</span>
                <span className="text-gray-300">{country}</span>
              </>
            )}

            {(visitMonth || visitYear) && (
              <>
                <span className="text-white/20">|</span>
                <span className="text-sm text-yellow-400">
                  Visited {visitMonth} {visitYear}
                </span>
              </>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={() =>
                geonameId && router.push(`/journal/${geonameId}`)
              }
              className="rounded-xl bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
            >
              Read Story
            </button>

            <button
              onClick={() =>
                geonameId && router.push(`/gallery/${geonameId}`)
              }
              className="rounded-xl bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
            >
              Gallery
            </button>
          </div>
        </>
      )}
    </div>
  );
}