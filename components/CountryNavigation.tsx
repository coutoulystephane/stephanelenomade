"use client";

type Country = {
  id: string;
  name: string;
  flag: string;
};

export default function CountryNavigation({
  countries,
}: {
  countries: Country[];
}) {
  return (
    <section className="sticky top-20 z-40 border-y border-[#d4af37]/20 bg-[#07111f]/95 backdrop-blur-xl">

      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4 px-8 py-6">

        {countries.map((country) => (

          <button
            key={country.id}
            onClick={() =>
              document
                .getElementById(country.id)
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
            }
            className="
              rounded-full
              border
              border-[#d4af37]/20
              px-5
              py-2
              text-white
              transition-all
              hover:border-[#d4af37]
              hover:bg-[#d4af37]/10
            "
          >
            {country.flag} {country.name}
          </button>

        ))}

      </div>

    </section>
  );
}