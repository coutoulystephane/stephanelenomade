import { supabase } from "./supabase";

export async function getCityTrips(geonameId: number) {
  // Get all trips for this destination.
  const { data: trips, error: tripsError } = await supabase
    .from("trips")
    .select(`
      id,
      destination_id,
      visit_month,
      visit_year,
      notes,
      created_at,
      photos (
        id,
        image_url,
        is_cover
      )
    `)
    .eq("destination_id", geonameId)
    .order("visit_year", { ascending: true })
    .order("created_at", { ascending: true });

  if (tripsError) {
    console.error("Error loading city trips:", tripsError);
    return null;
  }

  if (!trips || trips.length === 0) {
    return null;
  }

  // Get the destination information.
  const { data: destination, error: destinationError } =
    await supabase
      .from("destinations_master")
      .select(`
        geonameId,
        name,
        country_id,
        countryCode,
        latitude,
        longitude
      `)
      .eq("geonameId", geonameId)
      .single();

  if (destinationError || !destination) {
    console.error(
      "Error loading city destination:",
      destinationError
    );
    return null;
  }

  // Combine all photos from every visit.
  const photos = trips.flatMap((trip) =>
    (trip.photos ?? []).map((photo) => ({
      ...photo,
      tripId: trip.id,
      visitYear: trip.visit_year,
    }))
  );

  // Combine the years without duplicates.
  const years = [
    ...new Set(trips.map((trip) => trip.visit_year)),
  ].sort((a, b) => a - b);

  // Combine the existing travel notes.
  const stories = trips
    .filter((trip) => trip.notes?.trim())
    .map((trip) => ({
      tripId: trip.id,
      year: trip.visit_year,
      month: trip.visit_month,
      notes: trip.notes,
    }));

  return {
    destination,
    trips,
    years,
    photos,
    stories,
  };
}