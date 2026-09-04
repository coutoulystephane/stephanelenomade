import Navigation from "@/components/Navigation";
import ContinentHero from "@/components/ContinentHero";
import CountryNavigation from "@/components/CountryNavigation";
import CountrySection from "@/components/continent/CountrySection";

import { europeCountries } from "@/content/countries/europe";
import { getTrips } from "@/lib/archive";

export default async function EuropePage() {
  const trips = await getTrips();

  return (
    <main className="bg-[#07111f]">
      <Navigation />

      <ContinentHero continent="europe" />

      <CountryNavigation countries={europeCountries} />

      {europeCountries.map((country) => (
        <CountrySection
          key={country.id}
          country={country}
          trips={trips as any}
        />
      ))}
    </main>
  );
}