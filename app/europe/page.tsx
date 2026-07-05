import Navigation from "@/components/Navigation";
import ContinentHero from "@/components/ContinentHero";
import CountryNavigation from "@/components/CountryNavigation";

import { europeCountries } from "@/content/countries/europe";

export default function EuropePage() {
  return (
    <main className="bg-[#07111f]">

      <Navigation />

      <ContinentHero continent="europe" />

      <CountryNavigation countries={europeCountries} />

    </main>
  );
}