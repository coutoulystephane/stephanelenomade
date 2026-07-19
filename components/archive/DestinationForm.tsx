import ContinentSelect from "./ContinentSelect";
import CountrySelect from "./CountrySelect";
import DestinationSelect from "./DestinationSelect";

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

        <DestinationSelect />

        <div>
          <label className="mb-2 block text-sm font-medium">
            📅 Month
          </label>

          <select
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-400"
          >
            <option className="bg-[#08121f]">January</option>
            <option className="bg-[#08121f]">February</option>
            <option className="bg-[#08121f]">March</option>
            <option className="bg-[#08121f]">April</option>
            <option className="bg-[#08121f]">May</option>
            <option className="bg-[#08121f]">June</option>
            <option className="bg-[#08121f]">July</option>
            <option className="bg-[#08121f]">August</option>
            <option className="bg-[#08121f]">September</option>
            <option className="bg-[#08121f]">October</option>
            <option className="bg-[#08121f]">November</option>
            <option className="bg-[#08121f]">December</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            📅 Year
          </label>

         <select
  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-400"
>
  {Array.from({ length: 60 }, (_, i) => {
    const year = new Date().getFullYear() - i;

    return (
      <option
        key={year}
        value={year}
        className="bg-[#08121f]"
      >
        {year}
      </option>
    );
  })}
</select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            📝 Notes
          </label>

          <textarea
            rows={5}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-amber-400"
            placeholder="Stayed near the old town. Visited local markets and famous landmarks..."
          />
        </div>

      </div>

      <div className="mt-12 flex justify-end">

        <button className="rounded-xl bg-amber-500 px-8 py-4 font-semibold text-black transition hover:bg-amber-400">
          Save Destination
        </button>

      </div>

    </div>
  );
}