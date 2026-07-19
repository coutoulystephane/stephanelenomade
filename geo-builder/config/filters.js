/**
 * Filtering rules for the Master Destinations Database
 */

module.exports = {

  // Minimum population to keep a populated place (PPL)
  MIN_CITY_POPULATION: 5000,

  // Administrative places
  KEEP_CAPITALS: true,
  KEEP_REGIONAL_CAPITALS: true,
  KEEP_CITIES: true,
  KEEP_GHOST_TOWNS: false,

  // Natural destinations
  KEEP_ISLANDS: true,
  KEEP_MOUNTAINS: true,
  KEEP_LAKES: true,
  KEEP_WATERFALLS: true,
  KEEP_CANYONS: true,
  KEEP_PARKS: true,
  KEEP_DESERTS: true,
  KEEP_VOLCANOES: true,

  // Future expansion
  KEEP_UNESCO: false,
  KEEP_MONUMENTS: false,
  KEEP_MUSEUMS: false,
  KEEP_CASTLES: false,

  // Output
  EXPORT_CSV: true,
  EXPORT_JSON: false,

};