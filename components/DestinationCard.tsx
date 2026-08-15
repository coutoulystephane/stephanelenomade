"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTravelStats } from "./useTravelStats";

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
  const stats = useTravelStats();

  const hasDestination = !!name;

  return (
    <div className="absolute bottom-[-205px] right-[220px] z-50 w-[500px] rounded-3xl border border-white/10 bg-black/80 p-4 text-white shadow-2xl backdrop-blur-xl">
      {!hasDestination ? (
        <>
          <h2 className="text-2xl font-bold">
            🌍 Discover My Journey
          </h2>

          <p className="mt-3 leading-relaxed text-gray-300">
            Click any glowing destination on the map to discover the places
            I've visited, the stories behind them, and the memories collected
            around the world.
          </p>

          <div className="mt-5 border-t border-white/10 pt-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-yellow-400">{stats.countries}</p>
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Countries
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-yellow-400">{stats.cities}</p>
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Cities
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-yellow-400">{stats.photos.toLocaleString()}</p>
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Photos
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Cover Image */}
<div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10">
  {coverImage ? (
<div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black border border-white/10">
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
  ) : (
    <div className="flex h-full items-center justify-center bg-white/5 text-gray-500">
      No cover image
    </div>
  )}
</div>

          {/* Destination Row */}
          <div className="mt-4 flex flex-wrap items-center gap-2 border-b border-white/5 pb-3">
            <h2 className="text-3xl font-bold leading-none">
              {name}
            </h2>

            {country && (
              <>
                <span className="text-white/20">|</span>
                <span className="text-gray-300">
                  {country}
                </span>
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