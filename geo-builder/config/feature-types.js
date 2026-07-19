/**
 * GeoNames Feature Code → Stéphane le Nomade Destination Type
 * https://www.geonames.org/export/codes.html
 */

module.exports = {
  // ===========================
  // Cities & Administrative
  // ===========================

  PPLC: { category: "City", subtype: "Capital" },
  PPLA: { category: "City", subtype: "Regional Capital" },
  PPLA2: { category: "City", subtype: "County Seat" },
  PPLA3: { category: "City", subtype: "District Seat" },
  PPLA4: { category: "City", subtype: "Local Seat" },

  PPL: { category: "City", subtype: "City" },
  PPLG: { category: "City", subtype: "Ghost Town" },

  // ===========================
  // Islands
  // ===========================

  ISL: { category: "Island", subtype: "Island" },
  ISLS: { category: "Island", subtype: "Island Group" },

  // ===========================
  // Mountains
  // ===========================

  MT: { category: "Mountain", subtype: "Mountain" },
  PK: { category: "Mountain", subtype: "Peak" },
  PASS: { category: "Mountain", subtype: "Mountain Pass" },
  CNYN: { category: "Mountain", subtype: "Canyon" },

  // ===========================
  // Water
  // ===========================

  LK: { category: "Lake", subtype: "Lake" },
  RSV: { category: "Lake", subtype: "Reservoir" },
  FLLS: { category: "Waterfall", subtype: "Waterfall" },

  // ===========================
  // Parks
  // ===========================

  PRK: { category: "Park", subtype: "Park" },
  RESN: { category: "Park", subtype: "Nature Reserve" },

  // ===========================
  // Desert
  // ===========================

  DSRT: { category: "Desert", subtype: "Desert" },

  // ===========================
  // Volcano
  // ===========================

  VOL: { category: "Volcano", subtype: "Volcano" },
};