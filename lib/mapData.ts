import { supabase } from "./supabase";

export type MapDestination = {
  geonameId: number;
  name: string;
  latitude: number;
  longitude: number;
  map_x: number | null;
  map_y: number | null;
  countryCode: string;
  visitMonth: string;
  visitYear: number;
  coverImage: string | null;
};

export async function getVisitedDestinations(): Promise<MapDestination[]> {
  const { data: trips, error: tripsError } = await supabase
    .from("trips")
    .select(`
      id,
      destination_id,
      visit_month,
      visit_year,
      photos (
        image_url,
        is_cover
      )
    `);

  if (tripsError) {
    console.error(tripsError);
    return [];
  }

  if (!trips?.length) {
    return [];
  }

  const ids = [...new Set(trips.map((trip) => trip.destination_id))];

  const { data: destinations, error: destinationsError } = await supabase
    .from("destinations_master")
    .select(`
      geonameId,
      name,
      latitude,
      longitude,
      map_x,
      map_y,
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
    .map((trip: any) => {
      const destination = lookup.get(trip.destination_id);

      if (!destination) return null;

      const coverPhoto =
        trip.photos?.find((photo: any) => photo.is_cover) ??
        trip.photos?.[0];

      return {
        geonameId: destination.geonameId,
        name: destination.name,
        latitude: Number(destination.latitude),
        longitude: Number(destination.longitude),
        map_x:
          destination.map_x !== null
            ? Number(destination.map_x)
            : null,
        map_y:
          destination.map_y !== null
            ? Number(destination.map_y)
            : null,
        countryCode: destination.countryCode,
        visitMonth: trip.visit_month,
        visitYear: trip.visit_year,
        coverImage: coverPhoto?.image_url ?? null,
      };
    })
    .filter(
      (item): item is MapDestination =>
        item !== null &&
        !isNaN(item.latitude) &&
        !isNaN(item.longitude)
    );
}