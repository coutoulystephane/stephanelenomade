
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Trip = {
  id: number;
  destination_id: number;
  visit_month: string;
  visit_year: number;
  notes: string;
  created_at?: string;
  destinations_master: {
    geonameId: number;
    name: string;
    country_id: number;
    latitude: number;
    longitude: number;
    countryCode: string;
  }[];
  photos: {
    id: number;
    image_url: string;
    is_cover: boolean;
  }[];
};

type Country = {
  id: string;
  name: string;
  flag: string;
  isoCode?: string;
  isoCodes?: string[];
};

type CityGroup = {
  name: string;
  geonameId: number;
  trips: Trip[];
};

type Props = {
  country: Country;
  trips: Trip[];
  continentPath: string;
};

export default function CountrySection({
  country,
  trips,
  continentPath,
}: Props) {
  const router = useRouter();

  const [selectedTrips, setSelectedTrips] = useState<
    Record<number, number>
  >({});

  const countryTrips = trips.filter((trip) => {
    const countryCode =
      trip.destinations_master[0]?.countryCode?.toUpperCase();

    if (!countryCode) return false;

    if (country.isoCodes) {
      return country.isoCodes.some(
        (code) => code.toUpperCase() === countryCode
      );
    }

    return countryCode === country.isoCode?.toUpperCase();
  });

  const cityMap = new Map<string, Trip[]>();

  for (const trip of countryTrips) {
    const destination = trip.destinations_master[0];
    if (!destination) continue;

    const key = destination.geonameId.toString();

    if (!cityMap.has(key)) {
      cityMap.set(key, []);
    }

    cityMap.get(key)!.push(trip);
  }

  const cities: CityGroup[] = Array.from(cityMap.values())
    .map((cityTrips) => {
      const sortedTrips = [...cityTrips].sort((a, b) => {
        if (b.visit_year !== a.visit_year) {
          return b.visit_year - a.visit_year;
        }

        return b.id - a.id;
      });

      const destination = sortedTrips[0].destinations_master[0];

      return {
        name: destination.name,
        geonameId: destination.geonameId,
        trips: sortedTrips,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section
      id={country.id}
      className="scroll-mt-32 border-t border-[#d4af37]/10 bg-[#07111f] py-24"
    >
      <div className="mx-auto max-w-[1500px] px-10">
        <div className="mb-14 text-center">
          <div className="mb-5 flex items-center justify-center gap-5">
            <div className="h-px w-24 bg-[#d4af37]/30" />
            <div className="text-xl text-[#d4af37]">✦</div>
            <div className="h-px w-24 bg-[#d4af37]/30" />
          </div>

          <div className="mb-3 text-5xl">{country.flag}</div>

          <p className="mb-3 text-sm uppercase tracking-[0.4em] text-[#d4af37]">
            MY JOURNEYS
          </p>

          <h2 className="font-serif text-6xl text-white">
            {country.name}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg italic text-white/60">
            Places, memories and stories from my travels through{" "}
            {country.name}.
          </p>
        </div>

        {cities.length === 0 ? (
          <div className="rounded-[28px] border border-[#d4af37]/15 bg-[#08121d] px-8 py-16 text-center">
            <p className="text-lg text-white/40">
              My journeys through {country.name} will appear here soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => {
              const selectedTrip =
                city.trips.find(
                  (trip) =>
                    trip.id === selectedTrips[city.geonameId]
                ) ?? city.trips[0];

              const cover =
                selectedTrip.photos.find(
                  (photo) => photo.is_cover
                )?.image_url ??
                selectedTrip.photos[0]?.image_url;

              const photoCount = selectedTrip.photos.length;

              return (
                <article
                  key={city.geonameId}
                  className="group overflow-hidden rounded-[28px] border border-[#d4af37]/20 bg-[#08121d] transition-all duration-500 hover:border-[#d4af37]/60 hover:shadow-[0_0_40px_rgba(212,175,55,0.16)]"
                >
                  <div className="relative h-[250px] overflow-hidden bg-slate-900">
                    {cover ? (
                      <img
                        src={cover}
                        alt={`${city.name} ${selectedTrip.visit_year}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-white/30">
                        No Photo
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                    <div className="absolute bottom-5 left-6">
                      <h3 className="font-serif text-3xl text-white">
                        {city.name}
                      </h3>

                      <p className="mt-1 text-sm text-white/80">
                        {selectedTrip.visit_year}
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    {city.trips.length > 1 && (
                      <div className="mb-5">
                        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/40">
                          Journeys
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {city.trips.map((trip) => {
                            const isSelected =
                              trip.id === selectedTrip.id;

                            return (
                              <button
                                key={trip.id}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() =>
                                  setSelectedTrips((previous) => ({
                                    ...previous,
                                    [city.geonameId]: trip.id,
                                  }))
                                }
                                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                                  isSelected
                                    ? "border-[#E7C35A] bg-[#E7C35A] text-black"
                                    : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                                }`}
                              >
                                {trip.visit_year}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <p className="mb-2 text-sm font-semibold text-white">
                      {selectedTrip.visit_month}{" "}
                      {selectedTrip.visit_year}
                    </p>

                    <p className="mb-6 line-clamp-3 min-h-[72px] text-sm leading-6 text-white/60">
                      {selectedTrip.notes || "No travel notes yet."}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                        📷 {photoCount}{" "}
                        {photoCount === 1 ? "Photo" : "Photos"}
                      </span>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            router.push(
                              `/journal/${selectedTrip.id}?from=${encodeURIComponent(continentPath)}`
                            )
                          }
                          className="rounded-full border border-[#d4af37]/60 px-4 py-2 text-sm text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black"
                        >
                          Story →
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            router.push(
                              `/gallery/${selectedTrip.id}?from=${encodeURIComponent(continentPath)}`
                            )
                          }
                          className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
                        >
                          Gallery
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
