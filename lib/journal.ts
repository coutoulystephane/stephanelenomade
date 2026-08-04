import { supabase } from "./supabase";

export async function getJournalEntry(geonameId: number) {
  const { data: trip, error } = await supabase
    .from("trips")
    .select(`
      id,
      destination_id,
      visit_month,
      visit_year,
      notes,
      photos (
        image_url,
        is_cover
      )
    `)
    .eq("destination_id", geonameId)
    .single();

  if (error || !trip) {
    return null;
  }

  const { data: destination } = await supabase
    .from("destinations_master")
    .select(`
      geonameId,
      name,
      countryCode
    `)
    .eq("geonameId", geonameId)
    .single();

  return {
    ...trip,
    destination,
  };
}