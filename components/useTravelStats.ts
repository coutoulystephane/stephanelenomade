"use client";

import { useEffect, useState } from "react";

export type TravelStats = {
  countries: number;
  cities: number;
  continents: number;
  photos: number;
};

const emptyStats: TravelStats = {
  countries: 0,
  cities: 0,
  continents: 0,
  photos: 0,
};

export function useTravelStats() {
  const [stats, setStats] = useState<TravelStats>(emptyStats);

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await fetch("/api/stats");

        if (!response.ok) {
          throw new Error("Failed to load travel stats");
        }

        const data: TravelStats = await response.json();

        setStats(data);
      } catch (error) {
        console.error("Failed to load travel stats:", error);
      }
    }

    loadStats();
  }, []);

  return stats;
}
