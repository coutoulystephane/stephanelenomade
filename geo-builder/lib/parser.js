const featureTypes = require("../config/feature-types");

/**
 * Convert one GeoNames line into a structured object.
 * Returns null for invalid rows.
 */
function parseLine(line) {
  if (!line) return null;

  const cols = line.split("\t");

  if (cols.length < 19) return null;

  const feature = featureTypes[cols[7]] || {
    category: "Other",
    subtype: cols[7],
  };

  return {
    geonameId: Number(cols[0]),
    name: cols[1],
    asciiName: cols[2],
    alternateNames: cols[3],

    latitude: Number(cols[4]),
    longitude: Number(cols[5]),

    featureClass: cols[6],
    featureCode: cols[7],

    category: feature.category,
    subtype: feature.subtype,

    countryCode: cols[8],

    admin1: cols[10],
    admin2: cols[11],
    admin3: cols[12],
    admin4: cols[13],

    population: Number(cols[14]),

    elevation: cols[15] ? Number(cols[15]) : null,
    dem: cols[16] ? Number(cols[16]) : null,

    timezone: cols[17],

    modificationDate: cols[18],
  };
}

module.exports = {
  parseLine,
};