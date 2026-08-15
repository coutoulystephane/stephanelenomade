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
      className={`absolute group ${
        editable ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
      }`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Outer glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-10
          w-10
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-amber-400/30
          blur-lg
          animate-pulse
        "
      />

      {/* Inner halo */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-6
          w-6
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-amber-300/25
          blur-md
        "
      />

      {/* Pin */}
      <div
        className="
          relative
          h-4
          w-4
          rounded-full
          border-2
          border-white
          bg-amber-300
          shadow-[0_0_14px_rgba(251,191,36,0.95)]
          transition-all
          duration-200
          group-hover:scale-150
          group-hover:bg-white
          group-hover:shadow-[0_0_24px_rgba(251,191,36,1)]
        "
      />

      {/* Tooltip */}
      <div
        className="
          absolute
          left-1/2
          bottom-7
          -translate-x-1/2
          hidden
          group-hover:block
          whitespace-nowrap
          rounded-xl
          border
          border-[#d4af37]/30
          bg-black/75
          px-3
          py-1.5
          text-sm
          text-white
          shadow-lg
          backdrop-blur-md
        "
      >
        {name}
      </div>
    </div>
  );
}