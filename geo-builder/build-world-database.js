const fs = require("fs");
const path = require("path");
const readline = require("readline");

const filters = require("./config/filters");
const { parseLine } = require("./lib/parser");
const { exportCSV, exportJSON } = require("./lib/exporter");

// NEW
const countries = require("./config/countries.json");

const INPUT_FILE = path.join(__dirname, "allCountries.txt");
const OUTPUT_FOLDER = path.join(__dirname, "output");

async function main() {
  console.log("");
  console.log("🌍 Stéphane le Nomade - Master Database Builder");
  console.log("================================================");
  console.log("");

  if (!fs.existsSync(INPUT_FILE)) {
    console.error("❌ allCountries.txt not found.");
    return;
  }

  if (!fs.existsSync(OUTPUT_FOLDER)) {
    fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });
  }

  const destinations = [];
  const stats = {};

  const stream = fs.createReadStream(INPUT_FILE);

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  let scanned = 0;

  for await (const line of rl) {
    scanned++;

    const place = parseLine(line);

    if (!place) continue;

    let keep = false;

    switch (place.category) {
      case "City":
        if (
          place.subtype === "Capital" ||
          place.subtype === "Regional Capital" ||
          place.subtype === "County Seat" ||
          place.subtype === "District Seat" ||
          place.subtype === "Local Seat"
        ) {
          keep = true;
        } else if (
          place.subtype === "City" &&
          place.population >= filters.MIN_CITY_POPULATION
        ) {
          keep = true;
        }
        break;

      case "Island":
        keep = filters.KEEP_ISLANDS;
        break;

      case "Mountain":
        keep = filters.KEEP_MOUNTAINS;
        break;

      case "Lake":
        keep = filters.KEEP_LAKES;
        break;

      case "Waterfall":
        keep = filters.KEEP_WATERFALLS;
        break;

      case "Park":
        keep = filters.KEEP_PARKS;
        break;

      case "Desert":
        keep = filters.KEEP_DESERTS;
        break;

      case "Volcano":
        keep = filters.KEEP_VOLCANOES;
        break;

      default:
        keep = false;
    }

    if (!keep) continue;

    // -------------------------------------------------
    // Travel Bible enrichment
    // -------------------------------------------------

    const country = countries[place.countryCode];

    if (country) {
      place.country_id = country.id;
      place.continent = country.continent;
    } else {
      place.country_id = null;
      place.continent = "";
    }

place.description = "";
place.featured = false;

switch (place.category) {
  case "City":
    switch (place.subtype) {
      case "Capital":
        place.priority = 100;
        break;
      case "Regional Capital":
        place.priority = 90;
        break;
      default:
        place.priority = 70;
    }
    break;

  case "Park":
    place.priority = 95;
    break;

  case "Volcano":
    place.priority = 85;
    break;

  case "Waterfall":
    place.priority = 85;
    break;

  case "Mountain":
    place.priority = 80;
    break;

  case "Island":
    place.priority = 80;
    break;

  case "Lake":
    place.priority = 75;
    break;

  case "Desert":
    place.priority = 75;
    break;

  default:
    place.priority = 50;
}

place.hero_image = "";
place.keywords = "";
place.unesco = false;
place.verified = false;

    destinations.push(place);

    stats[place.category] = (stats[place.category] || 0) + 1;
  }

  console.log(`Scanned : ${scanned.toLocaleString()} records`);
  console.log(`Kept    : ${destinations.length.toLocaleString()} destinations`);
  console.log("");

  console.table(stats);

  if (filters.EXPORT_CSV) {
    exportCSV(destinations, OUTPUT_FOLDER);
  }

  if (filters.EXPORT_JSON) {
    exportJSON(destinations, OUTPUT_FOLDER);
  }

  console.log("");
  console.log("✅ Finished.");
}

main().catch(console.error);