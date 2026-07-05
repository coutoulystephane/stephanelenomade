export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#08121f] text-white p-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-2">
          Stéphane le Nomade
        </h1>

        <p className="text-white/60 mb-12">
          Travel Archive Dashboard
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">

          <div className="rounded-2xl bg-white/5 p-6">
            <p className="text-sm text-white/60">Continents</p>
            <p className="text-4xl font-bold">0</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6">
            <p className="text-sm text-white/60">Countries</p>
            <p className="text-4xl font-bold">0</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6">
            <p className="text-sm text-white/60">Cities</p>
            <p className="text-4xl font-bold">0</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6">
            <p className="text-sm text-white/60">Photos</p>
            <p className="text-4xl font-bold">0</p>
          </div>

        </div>

        <button className="rounded-xl bg-amber-500 hover:bg-amber-400 px-8 py-4 font-semibold text-black transition">
          + Add New City
        </button>

      </div>
    </main>
  );
}