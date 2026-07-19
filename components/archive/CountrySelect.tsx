"use client";

import { useEffect, useState } from "react";
import { getCountries } from "@/lib/archive";

type Country = {
  id: number;
  name: string;
};

type CountrySelectProps = {
  continentId: number | null;
  value: number | null;
  onChange: (countryId: number | null) => void;
};

export default function CountrySelect({
  continentId,
  value,
  onChange,
}: CountrySelectProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCountries() {
      // No continent selected yet
      if (!continentId) {
        console.log("No continent selected.");
        setCountries([]);
        return;
      }

      setLoading(true);

      console.log("========== COUNTRY DEBUG ==========");
      console.log("Selected continentId:", continentId);

      const data = await getCountries(continentId);

      console.log("Countries returned:", data);

      setCountries(data);
      setLoading(false);
    }

    loadCountries();
  }, [continentId]);

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        🏳️ Country
      </label>

      <select
        value={value ?? ""}
        disabled={!continentId}
        onChange={(e) =>
          onChange(
            e.target.value === "" ? null : Number(e.target.value)
          )
        }
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {!continentId ? (
          <option value="" className="bg-[#08121f]">
            Select a continent first
          </option>
        ) : loading ? (
          <option value="" className="bg-[#08121f]">
            Loading countries...
          </option>
        ) : countries.length === 0 ? (
          <option value="" className="bg-[#08121f]">
            No countries found
          </option>
        ) : (
          <>
            <option value="" className="bg-[#08121f]">
              Select a country
            </option>

            {countries.map((country) => (
              <option
                key={country.id}
                value={country.id}
                className="bg-[#08121f]"
              >
                {country.name}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
}