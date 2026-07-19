const fs = require("fs");
const path = require("path");

/**
 * Escape a CSV value
 */
function csv(value) {
  if (value === null || value === undefined) return "";

  const str = String(value).replace(/"/g, '""');

  return `"${str}"`;
}

/**
 * Export CSV
 */
function exportCSV(destinations, outputFolder) {
  const file = path.join(outputFolder, "destinations_master.csv");

  const headers = [
    "geonameId",
    "name",
    "asciiName",
    "continent",
    "countryCode",
    "country_id",
    "category",
    "subcategory",
    "admin1",
    "latitude",
    "longitude",
    "population",
    "description",
    "featured",
    "priority",
    "hero_image",
    "keywords",
    "unesco",
    "verified",
    "timezone",
  ];

  const rows = [
    headers.join(","),
    ...destinations.map((d) =>
      [
        csv(d.geonameId),
        csv(d.name),
        csv(d.asciiName),

        csv(d.continent ?? ""),
        csv(d.countryCode),
        csv(d.country_id ?? ""),

        csv(d.category),
        csv(d.subtype),

        csv(d.admin1),

        csv(d.latitude),
        csv(d.longitude),

        csv(d.population),

        csv(d.description ?? ""),

        csv(false),          // featured
        csv(50),             // priority
        csv(""),             // hero_image
        csv(""),             // keywords
        csv(false),          // unesco
        csv(false),          // verified

        csv(d.timezone),
      ].join(",")
    ),
  ];

  fs.writeFileSync(file, rows.join("\n"), "utf8");

  console.log(
    `✅ Travel Bible CSV written (${destinations.length.toLocaleString()} destinations)`
  );
}

/**
 * Export JSON
 */
function exportJSON(destinations, outputFolder) {
  const file = path.join(outputFolder, "destinations_master.json");

  fs.writeFileSync(
    file,
    JSON.stringify(destinations, null, 2),
    "utf8"
  );

  console.log(
    `✅ JSON written (${destinations.length.toLocaleString()} destinations)`
  );
}

module.exports = {
  exportCSV,
  exportJSON,
};