import { supabase } from "./supabase";

export type MapTrip = {
  tripId: number;
  visitMonth: string;
  visitYear: number;
  coverImage: string | null;
};

export type MapDestination = {
  geonameId: number;
  name: string;
  latitude: number;
  longitude: number;
  map_x: number | null;
  map_y: number | null;
  countryCode: string;
  trips: MapTrip[];
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
    `)
    .order("visit_year", { ascending: false })
    .order("created_at", { ascending: false });

  if (tripsError) {
    console.error("Error loading map trips:", tripsError);
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
    console.error("Error loading map destinations:", destinationsError);
    return [];
  }

  const lookup = new Map(
    (destinations ?? []).map((destination: any) => [
      destination.geonameId,
      destination,
    ])
  );

  const grouped = new Map<number, MapDestination>();

  for (const trip of trips as any[]) {
    const destination = lookup.get(trip.destination_id);

    if (!destination) {
      continue;
    }

    const coverPhoto =
      trip.photos?.find((photo: any) => photo.is_cover) ??
      trip.photos?.[0];

    const existing = grouped.get(destination.geonameId);

    const mapTrip: MapTrip = {
      tripId: trip.id,
      visitMonth: trip.visit_month,
      visitYear: trip.visit_year,
      coverImage: coverPhoto?.image_url ?? null,
    };

    if (existing) {
      existing.trips.push(mapTrip);
    } else {
      grouped.set(destination.geonameId, {
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
        trips: [mapTrip],
      });
    }
  }

  return Array.from(grouped.values()).filter(
    (destination) =>
      !isNaN(destination.latitude) &&
      !isNaN(destination.longitude)
  );
}