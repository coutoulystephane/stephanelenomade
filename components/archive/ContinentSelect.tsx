const continents = [
  { id: "europe", name: "Europe" },
  { id: "asia", name: "Asia" },
  { id: "africa", name: "Africa" },
  { id: "north-america", name: "North America" },
  { id: "south-america", name: "South America" },
  { id: "oceania", name: "Oceania" },
];

export default function ContinentSelect() {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        🌍 Continent
      </label>

      <select
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-400"
        defaultValue="europe"
      >
        {continents.map((continent) => (
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