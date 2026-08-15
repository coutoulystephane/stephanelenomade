"use client";

import { useEffect, useState } from "react";
import TravelMarker from "./TravelMarker";
import DestinationCard from "./DestinationCard";
import { calibrateMap } from "@/lib/map/calibrator";

type Destination = {
  geonameId: number;
  name: string;
  latitude: number;
  longitude: number;
  map_x: number | null;
  map_y: number | null;
  countryCode?: string;
  visitMonth?: string;
  visitYear?: number;
  coverImage?: string | null;

  x: number;
  y: number;
};

export default function LiveTravelPins() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [editable, setEditable] = useState(false);
  const [original, setOriginal] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/map");

        if (!response.ok) {
          throw new Error("Failed to load map");
        }

        const data = await response.json();

        const mapped: Destination[] = data.map((d: any) => {
          if (d.map_x != null && d.map_y != null) {
            return {
              ...d,
              x: d.map_x * 100,
              y: d.map_y * 100,
            };
          }

          const point = calibrateMap(d.latitude, d.longitude);

          return {
            ...d,
            x: point.x * 100,
            y: point.y * 100,
          };
        });

        setDestinations(mapped);
        setOriginal(mapped);
      } catch (error) {
        console.error(error);
      }
    }

    load();
  }, []);

  function movePin(id: number, x: number, y: number) {
    setDestinations((pins) =>
      pins.map((pin) =>
        pin.geonameId === id
          ? {
              ...pin,
              x,
              y,
            }
          : pin
      )
    );
  }

  function cancelChanges() {
    setDestinations(original);
    setEditable(false);
  }

  async function saveChanges() {
    try {
      const pins = destinations.map((pin) => ({
        geonameId: pin.geonameId,
        map_x: pin.x / 100,
        map_y: pin.y / 100,
      }));

      const response = await fetch("/api/map/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pins }),
      });

      if (!response.ok) {
        throw new Error("Failed to save pins");
      }

      setOriginal(destinations);
      setEditable(false);

      alert("Map saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Unable to save map.");
    }
  }

  return (
    <>
      {/* Map editor controls */}
      <div className="absolute top-6 right-6 z-50 flex gap-2">
        {!editable ? (
          <button
            onClick={() => setEditable(true)}
            className="rounded-xl bg-black/70 px-4 py-2 text-white backdrop-blur"
          >
            ✏️ Edit
          </button>
        ) : (
          <>
            <button
              onClick={saveChanges}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-white"
            >
              💾 Save
            </button>

            <button
              onClick={cancelChanges}
              className="rounded-xl bg-red-600 px-4 py-2 text-white"
            >
              ❌ Cancel
            </button>
          </>
        )}
      </div>

      <DestinationCard
        geonameId={selectedDestination?.geonameId}
        name={selectedDestination?.name}
        country={selectedDestination?.countryCode}
        visitMonth={selectedDestination?.visitMonth}
        visitYear={selectedDestination?.visitYear}
        coverImage={selectedDestination?.coverImage}
      />

      {destinations.map((destination) => (
        <TravelMarker
          key={destination.geonameId}
          x={destination.x}
          y={destination.y}
          name={destination.name}
          editable={editable}
          onMove={(x, y) => movePin(destination.geonameId, x, y)}
          onClick={() => setSelectedDestination(destination)}
        />
      ))}
    </>
  );
}