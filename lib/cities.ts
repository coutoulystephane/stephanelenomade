import { cities } from "@/data/cities";

export function getCities() {
  return cities;
}

export function getCity(id: string) {
  return cities.find((city) => city.id === id);
}

export function getCitiesByCountry(country: string) {
  return cities.filter(
    (city) => city.country === country
  );
}