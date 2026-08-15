import { supabase } from "./supabase";

export type TravelStats = {
  countries: number;
  cities: number;
  continents: number;
  photos: number;
};

export async function getTravelStats(): Promise<TravelStats> {
  const { data: trips, error: tripsError } = await supabase
    .from("trips")
    .select("destination_id");

  if (tripsError) {
    console.error("Error loading travel stats:", tripsError);

    return {
      countries: 0,
      cities: 0,
      continents: 0,
      photos: 0,
    };
  }

  const destinationIds = [
    ...new Set(
      (trips ?? [])
        .map((trip) => trip.destination_id)
        .filter((id): id is number => id !== null)
    ),
  ];

  let countries = 0;
  let continents = 0;

  if (destinationIds.length > 0) {
    const { data: destinations, error: destinationsError } = await supabase
      .from("destinations_master")
      .select("geonameId,country_id")
      .in("geonameId", destinationIds);

    if (destinationsError) {
      console.error(
        "Error loading destination stats:",
        destinationsError
      );
    } else {
      const countryIds = [
        ...new Set(
          (destinations ?? [])
            .map((destination) => destination.country_id)
            .filter((id): id is number => id !== null)
        ),
      ];

      countries = countryIds.length;

      if (countryIds.length > 0) {
        const { data: countryRows, error: countriesError } = await supabase
          .from("countries")
          .select("id,continent_id")
          .in("id", countryIds);

        if (countriesError) {
          console.error(
            "Error loading continent stats:",
            countriesError
          );
        } else {
          continents = new Set(
            (countryRows ?? [])
              .map((country) => country.continent_id)
              .filter((id): id is number => id !== null)
          ).size;
        }
      }
    }
  }

  const { count: photos, error: photosError } = await supabase
    .from("photos")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (photosError) {
    console.error("Error loading photo stats:", photosError);
  }

  return {
    countries,
    cities: destinationIds.length,
    continents,
    photos: photos ?? 0,
  };
}
