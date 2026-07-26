"use client";

import { latLonToMapXY } from "@/lib/map/projection";

const MAP_WIDTH = 800;
const MAP_HEIGHT = 600;

export default function MapPins() {
  // Telluride, Colorado
  const point = latLonToMapXY(37.9375, -107.8123);

  const x = point.x * MAP_WIDTH;
  const y = point.y * MAP_HEIGHT;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <circle
        cx={x}
        cy={y}
        r={5}
        fill="#fbbf24"
        stroke="#ffffff"
        strokeWidth={2}
      />
    </svg>
  );
}