import ContinentSelect from "./ContinentSelect";
import CountrySelect from "./CountrySelect";
import CitySelect from "./CitySelect";

export default function DestinationForm() {
  return (
    <div className="mx-auto max-w-3xl px-8 py-12">

      <h1 className="text-5xl font-bold">
        Add Destination
      </h1>

      <p className="mt-3 text-white/60">
        Create a new destination in your travel archive.
      </p>

      <div className="mt-12 space-y-8">

        <ContinentSelect />

        <CountrySelect />

        <CitySelect />

        <div>
          <label className="mb-2 block text-sm font-medium">
            📝 Description
          </label>

          <textarea
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-amber-400"
            placeholder="My hometown, where my journey began..."
          />
        </div>

      </div>

      <div className="mt-12 flex justify-end">

        <button className="rounded-xl bg-amber-500 px-8 py-4 font-semibold text-black hover:bg-amber-400 transition">
          Next →
        </button>

      </div>

    </div>
  );
}