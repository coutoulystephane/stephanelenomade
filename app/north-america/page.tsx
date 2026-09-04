import Navigation from "@/components/Navigation";
import ContinentHero from "@/components/ContinentHero";
import CountryNavigation from "@/components/CountryNavigation";
import CountrySection from "@/components/continent/CountrySection";

import { northAmericaCountries } from "@/content/countries/north-america";
import { getTrips } from "@/lib/archive";

export default async function NorthAmericaPage() {
  const trips = await getTrips();

  return (
    <main className="bg-[#07111f]">
      <Navigation />

      <ContinentHero continent="north-america" />

      <CountryNavigation countries={northAmericaCountries} />

      {northAmericaCountries.map((country) => (
        <CountrySection
          key={country.id}
          country={country}
          trips={trips as any}
        />
      ))}
    </main>
  );
}