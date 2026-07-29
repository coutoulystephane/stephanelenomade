"use client";

type TravelMarkerProps = {
  x: number;
  y: number;
  name: string;
};

export default function TravelMarker({
  x,
  y,
  name,
}: TravelMarkerProps) {
  return (
    <div
      className="absolute group"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Glow */}
      <div className="absolute inset-0 w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/25 blur-md animate-pulse" />

      {/* Gold center */}
      <div className="relative w-2.5 h-2.5 rounded-full bg-amber-300 border border-white shadow-lg transition-transform duration-200 group-hover:scale-150" />

      {/* Tooltip */}
      <div
        className="
          absolute
          left-1/2
          bottom-5
          -translate-x-1/2
          hidden
          group-hover:block
          whitespace-nowrap
          rounded-xl
          bg-black/70
          backdrop-blur-md
          border
          border-white/20
          px-3
          py-1
          text-sm
          text-white
        "
      >
        {name}
      </div>
    </div>
  );
}