import Link from "next/link";
import StatsCard from "./StatsCard";

export default function ArchiveDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-8 py-12">

      <h1 className="text-5xl font-bold">
        Travel Archive
      </h1>

      <p className="mt-3 text-white/60">
        Welcome back, Stéphane
      </p>

      <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">

        <StatsCard title="Continents" value="—" />
        <StatsCard title="Countries" value="—" />
        <StatsCard title="Cities" value="—" />
        <StatsCard title="Photos" value="—" />

      </div>

      <div className="mt-14 flex flex-wrap gap-6">

        <Link
          href="/archive/add"
          className="rounded-xl bg-amber-500 px-8 py-4 font-semibold text-black transition hover:bg-amber-400"
        >
          ➕ Add Destination
        </Link>

        <button
          className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold transition hover:bg-white/10"
        >
          📸 Upload Photos
        </button>

      </div>

      <div className="mt-16">

        <h2 className="mb-6 text-2xl font-semibold">
          Recent Destinations
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

          <p className="text-white/40">
            No destinations yet.
          </p>

        </div>

      </div>

    </div>
  );
}