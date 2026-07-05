import { countries } from "@/data/countries";

export default function CountrySelect() {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        🏳️ Country
      </label>

      <select
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-400"
      >
        {countries.map((country) => (
          <option
            key={country.id}
            value={country.id}
            className="bg-[#08121f]"
          >
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}