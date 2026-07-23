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

export async function getCountryIso(countryId: number) {
  const { data, error } = await supabase
    .from("countries")
    .select("iso_code")
    .eq("id", countryId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data?.iso_code?.toLowerCase() ?? null;
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
    .from("trips")
    .insert({
      destination_id: destinationId,
      visit_month: visitMonth,
      visit_year: visitYear,
      notes,
      favorite: false,
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving trip:", error);
    throw error;
  }

  return data;
}
/* --------------------------------------------------
   PHOTO STORAGE
--------------------------------------------------- */

export async function uploadTripPhoto(file: File) {
  const extension = file.name.split(".").pop();

  const fileName = `${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from("trip-photos")
    .upload(fileName, file);

  if (error) {
    console.error("Upload error:", error);
    throw error;
  }

  const { data } = supabase.storage
    .from("trip-photos")
    .getPublicUrl(fileName);

  return {
    fileName,
    imageUrl: data.publicUrl,
  };
}

type SaveTripPhotoParams = {
  tripId: number;
  fileName: string;
  imageUrl: string;
};

export async function saveTripPhoto({
  tripId,
  fileName,
  imageUrl,
}: SaveTripPhotoParams) {
  // Check if this trip already has photos
  const { count } = await supabase
    .from("photos")
    .select("*", { count: "exact", head: true })
    .eq("trip_id", tripId);

  const isCover = (count ?? 0) === 0;

  const { error } = await supabase
    .from("photos")
    .insert({
      trip_id: tripId,
      file_name: fileName,
      image_url: imageUrl,
      is_cover: isCover,
    });

  if (error) {
    console.error("Photo save error:", error);
    throw error;
  }
}
/* --------------------------------------------------
   TRAVEL JOURNAL
--------------------------------------------------- */

export async function getTrips() {
  const { data, error } = await supabase
    .from("trips")
    .select(`
      id,
      visit_month,
      visit_year,
      notes,
      destinations_master!trips_destination_fk (
        geonameId,
        name,
        country_id
      ),
      photos (
       image_url,
       is_cover
     )
    `)
    .order("visit_year", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading trips:", error);
    return [];
  }

  return data ?? [];
}
/* --------------------------------------------------
   SINGLE TRIP
--------------------------------------------------- */

export async function getTrip(id: number) {
  const { data, error } = await supabase
    .from("trips")
    .select(`
      id,
      visit_month,
      visit_year,
      notes,
      destinations_master!trips_destination_fk (
        geonameId,
        name,
        country_id,
        latitude,
        longitude
      ),
      photos (
        id,
        image_url,
        is_cover
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error loading trip:", error);
    return null;
  }

  return data;
}
/* --------------------------------------------------
   COVER PHOTO
--------------------------------------------------- */

export async function setCoverPhoto(
  tripId: number,
  photoId: number
) {
  // Remove the current cover
  const { error: resetError } = await supabase
    .from("photos")
    .update({ is_cover: false })
    .eq("trip_id", tripId);

  if (resetError) {
    console.error("Error resetting cover:", resetError);
    throw resetError;
  }

  // Set the new cover
  const { error: coverError } = await supabase
    .from("photos")
    .update({ is_cover: true })
    .eq("id", photoId);

  if (coverError) {
    console.error("Error setting cover:", coverError);
    throw coverError;
  }
}