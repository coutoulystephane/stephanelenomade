import { supabase } from "./supabase";

export async function getContinents() {
  const { data, error } = await supabase
    .from("continents")
    .select("*")
    .order("name");

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}

export async function getCountries(continentId: number) {
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .eq("continent_id", continentId)
    .order("name");

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}

/* --------------------------------------------------
   MASTER DESTINATIONS
--------------------------------------------------- */

export async function getDestinations(countryId: number) {
  const PAGE_SIZE = 1000;
  let from = 0;
  let allDestinations: any[] = [];

  while (true) {
    const { data, error } = await supabase
      .from("destinations_master")
      .select("geonameId,name")
      .eq("country_id", countryId)
      .order("name", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);

    if (error) {
      console.error(error);
      return [];
    }

    if (!data || data.length === 0) {
      break;
    }

    allDestinations.push(...data);

    if (data.length < PAGE_SIZE) {
      break;
    }

    from += PAGE_SIZE;
  }

  return allDestinations;
}


/* --------------------------------------------------
   NEW SEARCH FUNCTION
--------------------------------------------------- */

export async function searchDestinations(
  countryId: number,
  search: string
) {
  if (!countryId) return [];

  const term = search.trim();

  if (term.length < 2) return [];

  const { data, error } = await supabase
    .from("destinations_master")
    .select("geonameId,name")
    .eq("country_id", countryId)
    .ilike("name", `${term}%`)
    .order("name", { ascending: true })
    .limit(25);

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}

/* --------------------------------------------------
   DESTINATION MANAGER
--------------------------------------------------- */

type SaveDestinationParams = {
  countryId: number;
  name: string;
  visitMonth: string;
  visitYear: number;
  notes: string;
};

export async function saveDestination({
  countryId,
  name,
  visitMonth,
  visitYear,
  notes,
}: SaveDestinationParams) {
  const { data, error } = await supabase
    .from("destinations")
    .insert({
      country_id: countryId,
      name,
      visit_month: visitMonth,
      visit_year: visitYear,
      notes,
      favorite: false,
      published: true,
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving destination:", error);
    throw error;
  }

  return data;
}

/* --------------------------------------------------
   TRAVEL ARCHIVE
--------------------------------------------------- */

type SaveTravelParams = {
  destinationId: number;
  visitMonth: string;
  visitYear: number;
  notes: string;
};

export async function saveTravel({
  destinationId,
  visitMonth,
  visitYear,
  notes,
}: SaveTravelParams) {
  const { data, error } = await supabase
    .from("travel_archive")
    .insert({
      destination_id: destinationId,
      visit_month: visitMonth,
      visit_year: visitYear,
      notes,
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving travel:", error);
    throw error;
  }

  return data;
}