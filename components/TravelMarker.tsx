"use client";

import { useRef } from "react";

type TravelMarkerProps = {
  x: number;
  y: number;
  name: string;
  editable: boolean;
  onMove: (x: number, y: number) => void;
  onClick: () => void;
};

export default function TravelMarker({
  x,
  y,
  name,
  editable,
  onMove,
  onClick,
}: TravelMarkerProps) {
  const dragging = useRef(false);

  function handleMouseDown() {
    if (!editable) return;
    dragging.current = true;
  }

  function handleMouseUp() {
    dragging.current = false;
  }

  function handleMouseMove(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (!editable || !dragging.current) return;

    const parent = e.currentTarget.parentElement;

    if (!parent) return;

    const rect = parent.getBoundingClientRect();

    const newX = ((e.clientX - rect.left) / rect.width) * 100;
    const newY = ((e.clientY - rect.top) / rect.height) * 100;

    onMove(
      Math.max(0, Math.min(100, newX)),
      Math.max(0, Math.min(100, newY))
    );
  }

  function handleClick() {
    if (editable) return;

    onClick();
  }

  return (
    <div
      className={`absolute group touch-manipulation ${
        editable ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
      }`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        width: "20px",
        height: "20px",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* SHARP OUTER RING */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-5
          w-5
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-amber-300/60
          shadow-[0_0_6px_rgba(251,191,36,0.65)]
          transition-all
          duration-200
          group-hover:scale-125
          group-hover:border-amber-200
        "
      />

      {/* GOLD COMPASS DIAMOND */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-3
          w-3
          -translate-x-1/2
          -translate-y-1/2
          rotate-45
          border
          border-amber-100
          bg-amber-400
          shadow-[0_0_7px_rgba(251,191,36,0.9)]
          transition-all
          duration-200
          group-hover:scale-125
          group-hover:border-white
          group-hover:bg-amber-300
        "
      />

      {/* WHITE CENTER */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-1.5
          w-1.5
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white
          shadow-[0_0_3px_white]
        "
      />

      {/* LARGER INVISIBLE TOUCH AREA FOR IPHONE */}
      <div className="absolute -inset-3" />

      {/* TOOLTIP */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          bottom-8
          -translate-x-1/2
          hidden
          group-hover:block
          whitespace-nowrap
          rounded-xl
          border
          border-[#d4af37]/30
          bg-black/85
          px-3
          py-1.5
          text-sm
          text-white
          shadow-lg
        "
      >
        {name}
      </div>
    </div>
  );
}