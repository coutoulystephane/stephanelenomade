const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const FILTER = require("../config/travel-filter");

// ==========================================
// Paths
// ==========================================

const INPUT = path.join(
  __dirname,
  "../output/destinations_master.csv"
);

const OUTPUT = path.join(
  __dirname,
  "../../public/data/countries"
);

if (!fs.existsSync(OUTPUT)) {
  fs.mkdirSync(OUTPUT, { recursive: true });
}

const countries = {
  US: [],
  CA: [],
};

const seen = {
  US: new Set(),
  CA: new Set(),
};

// ==========================================
// Helper
// ==========================================

function shouldKeep(row) {

  const category = (row.category || "").trim();
  const name = (row.name || "").trim();
  const population = Number(row.population || 0);

  // Cities
  if (
    category === "City" &&
    population >= FILTER.MIN_CITY_POPULATION
  ) {
    return true;
  }

  // Parks
  if (
    category === "Park" &&
    FILTER.KEEP_PARK_NAMES.includes(name)
  ) {
    return true;
  }

  // Mountains
  if (
    category === "Mountain" &&
    FILTER.KEEP_MOUNTAINS.includes(name)
  ) {
    return true;
  }
  
// Ski Resorts
if (
  FILTER.KEEP_SKI_RESORTS.includes(name)
) {
  return true;
}

  // Lakes
  if (
    category === "Lake" &&
    FILTER.KEEP_LAKES.includes(name)
  ) {
    return true;
  }

  // Islands
  if (
    category === "Island" &&
    FILTER.KEEP_ISLANDS.includes(name)
  ) {
    return true;
  }

  // Waterfalls
  if (
    category === "Waterfall" &&
    FILTER.KEEP_WATERFALLS.includes(name)
  ) {
    return true;
  }

  // Desert
  if (category === "Desert") {
    return true;
  }

  return false;
}

// ==========================================
// Read CSV
// ==========================================

fs.createReadStream(INPUT)
  .pipe(csv())
  .on("data", (row) => {

    const code = (row.countryCode || "").trim().toUpperCase();

    if (code !== "US" && code !== "CA") return;

    if (!shouldKeep(row)) return;

    const key =
      row.name.toLowerCase() +
      "_" +
      row.category.toLowerCase();

    if (seen[code].has(key)) return;

    seen[code].add(key);

    countries[code].push({
      geonameId: Number(row.geonameId),
      name: row.name,
      latitude: Number(row.latitude),
      longitude: Number(row.longitude),
      category: row.category,
      subcategory: row.subcategory,
      admin1: row.admin1,
      population: Number(row.population || 0),
      featured: row.featured === "true",
      priority: Number(row.priority || 0),
    });

  })

  .on("end", () => {

    countries.US.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    countries.CA.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    fs.writeFileSync(
      path.join(OUTPUT, "UnitedStates.json"),
      JSON.stringify(countries.US, null, 2)
    );

    fs.writeFileSync(
      path.join(OUTPUT, "Canada.json"),
      JSON.stringify(countries.CA, null, 2)
    );

    console.log("");
    console.log("==================================");
    console.log("USA:", countries.US.length);
    console.log("Canada:", countries.CA.length);
    console.log("==================================");
  });