export type MapPoint = {
  x: number;
  y: number;
};

/**
 * Converts latitude/longitude
 * into normalized map coordinates (0–1).
 *
 * This will be calibrated to the Stéphane le Nomade map.
 */
export function latLonToMapXY(
  latitude: number,
  longitude: number
): MapPoint {

  // Normalize longitude
  const x = (longitude + 180) / 360;

  // Mercator projection
  const latRad = latitude * Math.PI / 180;

  const mercN = Math.log(
    Math.tan(Math.PI / 4 + latRad / 2)
  );

  const y =
    0.5 -
    mercN /
      (2 * Math.PI);

  return {
    x,
    y,
  };
}