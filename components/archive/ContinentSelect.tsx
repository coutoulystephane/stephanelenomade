"use client";

import { useEffect, useState } from "react";
import { getContinents } from "@/lib/archive";

type Continent = {
  id: number;
  name: string;
};

type ContinentSelectProps = {
  value: number | null;
  onChange: (continentId: number | null) => void;
};

export default function ContinentSelect({
  value,
  onChange,
}: ContinentSelectProps) {
  const [continents, setContinents] = useState<Continent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContinents() {
      setLoading(true);

      const data = await getContinents();

      setContinents(data);
      setLoading(false);
    }

    loadContinents();
  }, []);

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        🌍 Continent
      </label>

      <select
        value={value ?? ""}
        onChange={(e) =>
          onChange(
            e.target.value === "" ? null : Number(e.target.value)
          )
        }
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-400"
      >
        <option value="" className="bg-[#08121f]">
          {loading ? "Loading..." : "Select a continent"}
        </option>

        {!loading &&
          continents.map((continent) => (
            <option
              key={continent.id}
              value={continent.id}
              className="bg-[#08121f]"
            >
              {continent.name}
            </option>
          ))}
      </select>
    </div>
  );
}