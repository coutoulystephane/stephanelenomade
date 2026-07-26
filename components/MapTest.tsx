"use client";

import { latLonToMapXY } from "@/lib/map";

export default function MapTest() {
  const telluride = latLonToMapXY(37.9375, -107.8123);

  return (
    <div className="absolute left-4 top-4 z-50 rounded-lg bg-black/80 p-4 text-sm text-white">
      <div>Telluride</div>
      <div>X: {telluride.x.toFixed(4)}</div>
      <div>Y: {telluride.y.toFixed(4)}</div>
    </div>
  );
}