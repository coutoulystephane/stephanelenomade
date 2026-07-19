"use client";

import { useEffect, useState } from "react";
import { getDestinations } from "@/lib/archive";

type Destination = {
  geonameId: number;
  name: string;
};

type DestinationSelectProps = {
  countryId: number | null;
  value: number | null;
  onChange: (destinationId: number | null) => void;
};

const USA_ID = 233;
const CANADA_ID = 37;

export default function DestinationSelect({
  countryId,
  value,
  onChange,
}: DestinationSelectProps) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDestinations() {
      if (!countryId) {
        setDestinations([]);
        return;
      }

      setLoading(true);

      try {
        let data: Destination[] = [];

        // 🇺🇸 USA
        if (countryId === USA_ID) {
          console.log("Loading USA JSON...");

          const response = await fetch("/data/countries/UnitedStates.json");
          data = await response.json();
        }

        // 🇨🇦 Canada
        else if (countryId === CANADA_ID) {
          console.log("Loading Canada JSON...");

          const response = await fetch("/data/countries/Canada.json");
          data = await response.json();
        }

        // 🌍 Everything else
        else {
          data = await getDestinations(countryId);
        }

        setDestinations(data);
      } catch (err) {
        console.error(err);
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    }

    loadDestinations();
  }, [countryId]);

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        📍 Destination
      </label>

      <select
        value={value ?? ""}
        disabled={!countryId}
        onChange={(e) =>
          onChange(
            e.target.value === ""
              ? null
              : Number(e.target.value)
          )
        }
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {!countryId ? (
          <option value="" className="bg-[#08121f]">
            Select a country first
          </option>
        ) : loading ? (
          <option value="" className="bg-[#08121f]">
            Loading destinations...
          </option>
        ) : destinations.length === 0 ? (
          <option value="" className="bg-[#08121f]">
            No destinations found
          </option>
        ) : (
          <>
            <option value="" className="bg-[#08121f]">
              Select a destination
            </option>

            {destinations.map((destination) => (
              <option
                key={destination.geonameId}
                value={destination.geonameId}
                className="bg-[#08121f]"
              >
                {destination.name}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
}