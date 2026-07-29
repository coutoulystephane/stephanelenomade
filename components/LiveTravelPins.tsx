"use client";

import { useEffect, useState } from "react";
import TravelMarker from "./TravelMarker";
import { calibrateMap } from "@/lib/map/calibrator";

type Destination = {
  geonameId: number;
  name: string;
  latitude: number;
  longitude: number;
  visitMonth?: string;
  visitYear?: number;
};

export default function LiveTravelPins() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/map");

        if (!response.ok) {
          throw new Error("Failed to load map data");
        }

        const data: Destination[] = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error("Error loading map destinations:", error);
      }
    }

    load();
  }, []);

  return (
    <>
      {destinations.map((destination, index) => {
        const point = calibrateMap(
          destination.latitude,
          destination.longitude
        );

        return (
          <TravelMarker
            key={`${destination.geonameId}-${index}`}
            x={point.x * 100}
            y={point.y * 100}
            name={destination.name}
          />
        );
      })}
    </>
  );
}