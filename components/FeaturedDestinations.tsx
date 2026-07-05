export default function ExploreWorld() {
  const continents = [
    {
      name: "North America",
      countries: 3,
    },
    {
      name: "Europe",
      countries: 14,
    },
    {
      name: "Asia",
      countries: 9,
    },
    {
      name: "Africa",
      countries: 5,
    },
    {
      name: "Oceania",
      countries: 2,
    },
    {
      name: "South America",
      countries: 0,
    },
  ];

  return (
    <section className="w-full bg-[#07111f] py-36">

      <div className="mx-auto max-w-7xl px-10">

        {/* Header */}

        <div className="mb-20 flex flex-col items-center">

          <div className="mb-5 flex w-full max-w-3xl items-center gap-5">

            <div className="h-px flex-1 bg-[#d4af37]/30" />

            <div className="text-xl text-[#d4af37]">
              ✦
            </div>

            <div className="h-px flex-1 bg-[#d4af37]/30" />

          </div>

          <p className="mb-4 text-sm uppercase tracking-[0.45em] text-[#d4af37]">
            JOURNEYS BY CONTINENT
          </p>

          <h2 className="text-center font-serif text-6xl leading-tight text-white">
            Every continent has
            <br />
            <span className="italic text-[#d4af37]">
              a different story.
            </span>
          </h2>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-3 gap-10">

          {continents.map((continent) => (

            <div
              key={continent.name}
              className="
                group
                h-[520px]
                overflow-hidden
                rounded-[32px]
                border
                border-[#d4af37]/20
                bg-[#0b1624]
                transition
                duration-500
                hover:border-[#d4af37]/40
              "
            >

              <div className="flex h-full flex-col justify-end p-10">

                <p className="mb-3 text-sm uppercase tracking-[0.4em] text-[#d4af37]">
                  CONTINENT
                </p>

                <h3 className="mb-4 font-serif text-5xl text-white">
                  {continent.name}
                </h3>

                <p className="mb-8 text-lg text-white/70">
                  {continent.countries > 0
                    ? `${continent.countries} Countries Explored`
                    : "Future Adventures"}
                </p>

                <button
                  className="
                    w-fit
                    rounded-full
                    border
                    border-[#d4af37]/30
                    px-8
                    py-3
                    text-sm
                    uppercase
                    tracking-[0.3em]
                    text-[#d4af37]
                    transition
                    hover:bg-[#d4af37]
                    hover:text-black
                  "
                >
                  Explore →
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}