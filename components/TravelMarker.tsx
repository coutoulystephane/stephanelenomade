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
        width: "16px",
        height: "16px",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* -------------------------------------------------- */}
      {/* SUBTLE OUTER GLOW                                  */}
      {/* -------------------------------------------------- */}
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
          bg-amber-400/20
          blur-md
          transition-all
          duration-200
          group-hover:h-8
          group-hover:w-8
          group-hover:bg-amber-400/35
          group-hover:blur-lg
        "
      />

      {/* -------------------------------------------------- */}
      {/* COMPASS HALO                                       */}
      {/* -------------------------------------------------- */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-3
          w-3
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-amber-300/40
          opacity-60
          transition-all
          duration-200
          group-hover:h-6
          group-hover:w-6
          group-hover:border-amber-300/80
          group-hover:opacity-100
        "
      />

      {/* -------------------------------------------------- */}
      {/* GOLD DIAMOND / COMPASS                             */}
      {/* -------------------------------------------------- */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-2
          w-2
          -translate-x-1/2
          -translate-y-1/2
          rotate-45
          border
          border-amber-200
          bg-amber-400
          shadow-[0_0_8px_rgba(251,191,36,0.85)]
          transition-all
          duration-200
          ease-out
          group-hover:h-3.5
          group-hover:w-3.5
          group-hover:border-white
          group-hover:bg-amber-300
          group-hover:shadow-[0_0_20px_rgba(251,191,36,1)]
        "
      />

      {/* -------------------------------------------------- */}
      {/* COMPASS CENTER                                     */}
      {/* -------------------------------------------------- */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-1
          w-1
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white
          opacity-80
          transition-all
          duration-200
          group-hover:h-1.5
          group-hover:w-1.5
          group-hover:opacity-100
        "
      />

      {/* -------------------------------------------------- */}
      {/* TOOLTIP                                            */}
      {/* -------------------------------------------------- */}
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