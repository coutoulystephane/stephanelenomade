"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTrips } from "@/lib/archive";

type Trip = {
  id: number;
  visit_month: string;
  visit_year: number;
  notes: string;
  destinations_master: {
    geonameId: number;
    name: string;
    country_id: number;
  } | null;
  photos: {
    image_url: string;
    is_cover: boolean;
  }[];
};

export default function JournalList() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrips() {
      const data = await getTrips();
      setTrips(data as Trip[]);
      setLoading(false);
    }

    loadTrips();
  }, []);

  if (loading) {
    return (
      <p className="py-20 text-center text-lg text-white">
        Loading journal...
      </p>
    );
  }

  if (trips.length === 0) {
    return (
      <p className="py-20 text-center text-lg text-gray-400">
        No trips yet.
      </p>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {trips.map((trip) => {
        const cover =
          trip.photos.find((photo) => photo.is_cover)?.image_url ??
          trip.photos[0]?.image_url;

        return (
          <article
            key={trip.id}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition hover:border-amber-400/30 hover:shadow-2xl"
          >
            <div className="relative h-44 w-full bg-slate-800">
              {cover ? (
                <img
                  src={cover}
                  alt={trip.destinations_master?.name ?? ""}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  No Photo
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-5">
                <h2 className="text-3xl font-serif text-white">
                  {trip.destinations_master?.name ?? "Unknown Destination"}
                </h2>

                <p className="text-gray-200">
                  {trip.visit_month} {trip.visit_year}
                </p>
              </div>
            </div>

            <div className="p-5">
              <p className="mb-5 line-clamp-2 text-gray-300">
                {trip.notes || "No travel notes yet."}
              </p>

              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white">
                  📷 {trip.photos.length} Photos
                </span>

                <Link
                  href={`/journal/${trip.id}`}
                  className="rounded-full bg-amber-500 px-5 py-2 font-semibold text-black transition hover:bg-amber-400"
                >
                  Read Story →
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}