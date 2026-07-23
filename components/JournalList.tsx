"use client";

import { useEffect, useState } from "react";
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
      <p className="text-white text-lg">
        Loading journal...
      </p>
    );
  }

  if (trips.length === 0) {
    return (
      <p className="text-gray-400 text-lg">
        No trips yet.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {trips.map((trip) => (
        <div
          key={trip.id}
          className="rounded-xl border border-white/10 bg-white/5 p-6"
        >
          <h2 className="text-2xl font-semibold text-white">
            {trip.destinations_master?.name ?? "Unknown Destination"}
          </h2>

          <p className="mt-2 text-gray-300">
            {trip.visit_month} {trip.visit_year}
          </p>

          <p className="mt-4 text-gray-400">
            {trip.notes}
          </p>

          <p className="mt-4 text-sm text-gray-500">
            Photos: {trip.photos?.length ?? 0}
          </p>
        </div>
      ))}
    </div>
  );
}