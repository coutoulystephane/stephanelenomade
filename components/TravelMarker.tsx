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
    // Don't open the card while editing
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
      {/* Glow */}
      <div className="absolute inset-0 w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/25 blur-md animate-pulse" />

      {/* Pin */}
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