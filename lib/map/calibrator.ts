export type MapPoint = {
  x: number;
  y: number;
};

type ControlPoint = {
  latitude: number;
  longitude: number;
  x: number;
  y: number;
};

/*
 * These x/y values are percentages (0–1) on YOUR SVG.
 * We'll refine them as we add more calibration points.
 */
const controlPoints: ControlPoint[] = [
  // San Diego
  {
    latitude: 32.7157,
    longitude: -117.1611,
    x: 0.225,
    y: 0.505,
  },

  // Key West
  {
    latitude: 24.5551,
    longitude: -81.7800,
    x: 0.338,
    y: 0.540,
  },

  // Ajaccio
  {
    latitude: 41.9189,
    longitude: 8.7386,
    x: 0.607,
    y: 0.405,
  },

  // Cannes
  {
    latitude: 43.5528,
    longitude: 7.0174,
    x: 0.628,
    y: 0.395,
  },
];

export function calibrateMap(
  latitude: number,
  longitude: number
): MapPoint {
  // Temporary fallback.
  // Next step we'll interpolate between the control points.
  const x = (longitude + 180) / 360;

  const latRad = (latitude * Math.PI) / 180;

  const mercator =
    Math.log(
      Math.tan(Math.PI / 4 + latRad / 2)
    );

  const y =
    Math.max(
      0,
      Math.min(
        1,
        0.5 - mercator / (2 * Math.PI)
      )
    );

  return { x, y };
}