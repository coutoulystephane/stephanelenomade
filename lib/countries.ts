import { countries } from "@/data/countries";

export function getCountries() {
  return countries;
}

export function getCountry(id: string) {
  return countries.find((country) => country.id === id);
}

export function getCountriesByContinent(continent: string) {
  return countries.filter(
    (country) => country.continent === continent
  );
}