export default function CitySelect() {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        🏙️ City
      </label>

      <select
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
      >
        <option className="bg-[#08121f]">
          Cannes
        </option>
      </select>
    </div>
  );
}