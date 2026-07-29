"use client";

import { useEffect, useState } from "react";
import { latLonToMapXY } from "@/lib/map/projection";

const MAP_WIDTH = 2754;
const MAP_HEIGHT = 1397;

type Destination = {
  geonameId: number;
  name: string;
  latitude: number;
  longitude: number;
  countryCode: string;
  visitMonth: string;
  visitYear: number;
};

export default function MapPins() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    async function loadPins() {
      try {
        const response = await fetch("/api/map");
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error("Failed to load map pins:", error);
      }
    }

    loadPins();
  }, []);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {destinations.map((destination) => {
        const point = latLonToMapXY(
          destination.latitude,
          destination.longitude
        );

        return (
          <circle
            key={destination.geonameId}
            cx={point.x * MAP_WIDTH}
            cy={point.y * MAP_HEIGHT}
            r={5}
            fill="#fbbf24"
            stroke="#ffffff"
            strokeWidth={2}
          />
        );
      })}
    </svg>
  );
}