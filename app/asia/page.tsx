import Navigation from "@/components/Navigation";
import ContinentHero from "@/components/ContinentHero";
import CountryNavigation from "@/components/CountryNavigation";
import CountrySection from "@/components/continent/CountrySection";

import { asiaCountries } from "@/content/countries/asia";
import { getTrips } from "@/lib/archive";

export default async function AsiaPage() {
  const trips = await getTrips();

  return (
    <main className="bg-[#07111f]">
      <Navigation />

      <ContinentHero continent="asia" />

      <CountryNavigation countries={asiaCountries} />

      {asiaCountries.map((country) => (
        <CountrySection
          key={country.id}
          country={country}
          trips={trips as any}
        />
      ))}
    </main>
  );
}