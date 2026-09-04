import Navigation from "@/components/Navigation";
import ContinentHero from "@/components/ContinentHero";
import CountryNavigation from "@/components/CountryNavigation";
import CountrySection from "@/components/continent/CountrySection";

import { africaCountries } from "@/content/countries/africa";
import { getTrips } from "@/lib/archive";

export default async function AfricaPage() {
  const trips = await getTrips();

  return (
    <main className="bg-[#07111f]">
      <Navigation />

      <ContinentHero continent="africa" />

      <CountryNavigation countries={africaCountries} />

      {africaCountries.map((country) => (
        <CountrySection
          key={country.id}
          country={country}
          trips={trips as any}
        />
      ))}
    </main>
  );
}
