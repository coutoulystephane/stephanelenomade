import { supabase } from "./supabase";

export type MapDestination = {
  geonameId: number;
  name: string;
  latitude: number;
  longitude: number;
  countryCode: string;
  visitMonth: string;
  visitYear: number;
};

export async function getVisitedDestinations(): Promise<MapDestination[]> {
  // Load trips
  const { data: trips, error: tripsError } = await supabase
    .from("trips")
    .select("destination_id, visit_month, visit_year");

  if (tripsError) {
    console.error(tripsError);
    return [];
  }

  if (!trips?.length) {
    return [];
  }

  // Get unique destination IDs
  const ids = [...new Set(trips.map((trip) => trip.destination_id))];

  // Load matching destinations
  const { data: destinations, error: destinationsError } = await supabase
    .from("destinations_master")
    .select(`
      geonameId,
      name,
      latitude,
      longitude,
      countryCode
    `)
    .in("geonameId", ids);

  if (destinationsError) {
    console.error(destinationsError);
    return [];
  }

  const lookup = new Map(
    (destinations ?? []).map((d: any) => [d.geonameId, d])
  );

  return trips
    .map((trip) => {
      const destination = lookup.get(trip.destination_id);

      if (!destination) return null;

      return {
        geonameId: destination.geonameId,
        name: destination.name,
        latitude: Number(destination.latitude),
        longitude: Number(destination.longitude),
        countryCode: destination.countryCode,
        visitMonth: trip.visit_month,
        visitYear: trip.visit_year,
      };
    })
    .filter(
      (item): item is MapDestination =>
        item !== null &&
        !isNaN(item.latitude) &&
        !isNaN(item.longitude)
    );
}