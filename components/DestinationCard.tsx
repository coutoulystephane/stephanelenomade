"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Trip = {
  tripId: number;
  visitMonth: string;
  visitYear: number;
  coverImage: string | null;
};

type DestinationCardProps = {
  geonameId?: number;
  name?: string;
  country?: string;
  trips?: Trip[];
};

export default function DestinationCard({
  geonameId,
  name,
  country,
  trips = [],
}: DestinationCardProps) {
  const router = useRouter();

  const hasDestination = !!name;

  const [selectedTripId, setSelectedTripId] = useState<number | null>(
    trips[0]?.tripId ?? null
  );

  /*
   * When the user clicks another map pin,
   * select the first trip for that destination.
   */
  useEffect(() => {
    setSelectedTripId(trips[0]?.tripId ?? null);
  }, [name, trips]);

  const selectedTrip =
    trips.find((trip) => trip.tripId === selectedTripId) ??
    trips[0] ??
    null;

  return (
    <div
      className={`
        absolute
        bottom-4
        left-1/2
        z-50
        w-[calc(100vw-24px)]
        max-w-[380px]
        -translate-x-1/2
        lg:bottom-[-130px]
        lg:left-auto
        lg:right-[300px]
        lg:w-[380px]
        lg:max-w-none
        lg:translate-x-0
        rounded-[28px]
        border
        border-[#d4af37]/30
        bg-[rgba(12,10,9,0.90)]
        p-5
        text-white
        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        backdrop-blur-2xl
        ${hasDestination ? "block" : "hidden lg:block"}
      `}
    >
      {!hasDestination ? (
        <>
          <h2 className="font-serif text-[27px] text-[#E7C35A]">
            Discover My Journey
          </h2>

          <p className="mt-4 text-[14px] leading-6 text-white/85">
            Every glowing pin marks a place and a story. / Chaque point lumineux marque un lieu et une histoire.
          </p>

          <div className="mt-5 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] uppercase tracking-[0.2em] text-[#E7C35A]">
                Explore the map. / Explorez la carte.
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* DESTINATION HEADER */}
          <div className="border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold leading-none">{name}</h2>

              {country && (
                <>
                  <span className="text-white/20">|</span>

                  <span className="text-gray-300">
                    {country}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* YEAR SELECTOR */}
          {trips.length > 0 && (
            <div className="mt-4">
              <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">
                Journeys
              </div>

              <div className="flex flex-wrap gap-2">
                {trips.map((trip) => {
                  const isSelected =
                    trip.tripId === selectedTrip?.tripId;

                  return (
                    <button
                      key={trip.tripId}
                      type="button"
                      onClick={() =>
                        setSelectedTripId(trip.tripId)
                      }
                      className={`
                        rounded-full
                        border
                        px-4
                        py-2
                        text-sm
                        font-medium
                        transition
                        ${
                          isSelected
                            ? "border-[#E7C35A] bg-[#E7C35A] text-black"
                            : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                        }
                      `}
                    >
                      {trip.visitYear}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SELECTED TRIP */}
          {selectedTrip && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              {/* COVER IMAGE */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                {selectedTrip.coverImage ? (
                  <Image
                    src={selectedTrip.coverImage}
                    alt={`${name} ${selectedTrip.visitYear}`}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-500">
                    No cover image
                  </div>
                )}
              </div>

              {/* TRIP INFORMATION */}
              <div className="p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {selectedTrip.visitMonth}{" "}
                      {selectedTrip.visitYear}
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/journal/${selectedTrip.tripId}`
                        )
                      }
                      className="
                        rounded-lg
                        bg-white/10
                        px-3
                        py-2
                        text-xs
                        transition
                        hover:bg-white/20
                      "
                    >
                      Story
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/gallery/${selectedTrip.tripId}`
                        )
                      }
                      className="
                        rounded-lg
                        bg-white/10
                        px-3
                        py-2
                        text-xs
                        transition
                        hover:bg-white/20
                      "
                    >
                      Gallery
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NO TRIPS */}
          {trips.length === 0 && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 py-6 text-center text-sm text-gray-500">
              No trips recorded.
            </div>
          )}
        </>
      )}
    </div>
  );
}