const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const inputFile = path.join(__dirname, "../database/seed/countries.csv");
const outputFile = path.join(__dirname, "../database/seed/countries_import.csv");

const rows = [];

function mapContinent(row) {
  const region = (row.region || "").trim();
  const subregion = (row.subregion || "").trim();

  if (region === "Africa") return 1;

  if (region === "Asia") return 2;

  if (region === "Europe") return 3;

  if (region === "Oceania") return 5;

  // Americas → North America
  if (
    subregion === "Northern America" ||
    subregion === "Central America" ||
    subregion === "Caribbean"
  ) {
    return 4;
  }

  // Americas → South America
  if (subregion === "South America") {
    return 6;
  }

  return null;
}

fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (row) => {

    const continentId = mapContinent(row);

    // Skip Antarctica
    if (continentId === null) return;

    rows.push({
      continent_id: continentId,
      name: row.name,
      iso_code: row.iso2,
      flag: row.emoji,
      latitude: row.latitude,
      longitude: row.longitude,
    });

  })
  .on("end", () => {

    let output =
      "continent_id,name,iso_code,flag,latitude,longitude\n";

    rows.forEach((row) => {
      output += `${row.continent_id},"${row.name}",${row.iso_code},"${row.flag}",${row.latitude},${row.longitude}\n`;
    });

    fs.writeFileSync(outputFile, output, "utf8");

    console.log(`✅ ${rows.length} countries exported successfully!`);

  });