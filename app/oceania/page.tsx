import Navigation from "@/components/Navigation";
import ContinentHero from "@/components/ContinentHero";
import CountryNavigation from "@/components/CountryNavigation";
import CountrySection from "@/components/continent/CountrySection";

import { oceaniaCountries } from "@/content/countries/oceania";
import { getTrips } from "@/lib/archive";

export default async function OceaniaPage() {
  const trips = await getTrips();

  return (
    <main className="bg-[#07111f]">
      <Navigation />

      <ContinentHero continent="oceania" />

      <CountryNavigation countries={oceaniaCountries} />

      {oceaniaCountries.map((country) => (
        <CountrySection
          key={country.id}
          country={country}
          trips={trips as any}
        />
      ))}
    </main>
  );
}