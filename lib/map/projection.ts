export type MapPoint = {
  x: number;
  y: number;
};

/**
 * Converts latitude / longitude
 * into normalized map coordinates.
 *
 * x and y are between 0 and 1.
 */
export function latLonToMapXY(
  latitude: number,
  longitude: number
): MapPoint {
  // Horizontal position
  const x = (longitude + 180) / 360;

  // Web Mercator
  const latRad = (latitude * Math.PI) / 180;

  const mercator =
    Math.log(
      Math.tan(Math.PI / 4 + latRad / 2)
    );

  let y =
    0.5 -
    mercator /
      (2 * Math.PI);

  // Clamp
  y = Math.max(0, Math.min(1, y));

  return { x, y };
}