import { supabase } from "./supabase";

export async function getJournalEntry(tripId: number) {
  const { data: trip, error } = await supabase
    .from("trips")
    .select(`
      id,
      destination_id,
      visit_month,
      visit_year,
      notes,
      photos (
        id,
        image_url,
        is_cover
      )
    `)
    .eq("id", tripId)
    .single();

  if (error || !trip) {
    console.error("Error loading journal entry:", error);
    return null;
  }

  const { data: destination, error: destinationError } = await supabase
    .from("destinations_master")
    .select(`
      geonameId,
      name,
      countryCode
    `)
    .eq("geonameId", trip.destination_id)
    .single();

  if (destinationError || !destination) {
    console.error("Error loading destination:", destinationError);
    return null;
  }

  return {
    ...trip,
    destination,
  };
}
