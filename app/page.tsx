import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08121f]">
      <Navigation />

      <section className="flex items-center justify-center h-screen">

        <div className="text-center">

          <h1 className="text-7xl font-serif mb-8 text-white">
            Stéphane le nomade
          </h1>

          <p className="text-3xl italic text-amber-400 mb-10">
            Every pin on the map has a story.
          </p>

          <button className="border border-amber-400 text-white rounded-full px-8 py-4 hover:bg-amber-400 hover:text-black transition">
            Begin the Journey
          </button>

        </div>

      </section>

    </main>
  );
}