export default function Hero() {
  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">

        <h1 className="text-7xl font-serif text-white mb-6">
          Stéphane le nomade
        </h1>

        <p className="text-3xl italic text-amber-400 mb-10">
          Every pin on the map has a story.
        </p>

        <button className="rounded-full border border-amber-400 px-8 py-4 text-white hover:bg-amber-400 hover:text-black transition">
          Begin the Journey
        </button>

      </div>
    </section>
  );
}