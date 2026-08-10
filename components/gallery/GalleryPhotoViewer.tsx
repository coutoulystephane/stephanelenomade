"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryPhoto = {
  id?: number | string;
  image_url: string;
};

type Props = {
  photos: GalleryPhoto[];
  destinationName: string;
};

export default function GalleryPhotoViewer({
  photos,
  destinationName,
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeViewer = () => {
    setActiveIndex(null);
  };

  const showPrevious = () => {
    if (activeIndex === null || photos.length === 0) {
      return;
    }

    setActiveIndex(
      activeIndex === 0 ? photos.length - 1 : activeIndex - 1
    );
  };

  const showNext = () => {
    if (activeIndex === null || photos.length === 0) {
      return;
    }

    setActiveIndex(
      activeIndex === photos.length - 1 ? 0 : activeIndex + 1
    );
  };

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeViewer();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeIndex]);

  if (photos.length === 0) {
    return null;
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <button
            key={photo.id ?? photo.image_url}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative overflow-hidden rounded-[28px] bg-[#0b111a] text-left focus:outline-none focus:ring-2 focus:ring-yellow-500/70"
            aria-label={`Open photo ${index + 1} of ${photos.length}`}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={photo.image_url}
                alt={`${destinationName} photo ${index + 1}`}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/15" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-500 group-hover:opacity-100">
                <span className="rounded-full border border-white/20 bg-black/40 px-5 py-3 text-xs uppercase tracking-[0.3em] text-white backdrop-blur-md">
                  View Photo
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Full-Screen Photo Viewer */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`${destinationName} photo viewer`}
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeViewer}
            className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl text-white/80 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
            aria-label="Close photo viewer"
          >
            ×
          </button>

          {/* Counter */}
          <div className="absolute left-1/2 top-6 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-black/30 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/60 backdrop-blur-md">
            {activeIndex + 1} / {photos.length}
          </div>

          {/* Previous */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-3 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-3xl text-white/80 backdrop-blur-md transition hover:bg-white/10 hover:text-white md:left-8"
              aria-label="Previous photo"
            >
              ‹
            </button>
          )}

          {/* Main Photo */}
          <div className="relative h-[82vh] w-[88vw] max-w-7xl">
            <Image
              src={photos[activeIndex].image_url}
              alt={`${destinationName} photo ${activeIndex + 1}`}
              fill
              priority
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Next */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={showNext}
              className="absolute right-3 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-3xl text-white/80 backdrop-blur-md transition hover:bg-white/10 hover:text-white md:right-8"
              aria-label="Next photo"
            >
              ›
            </button>
          )}

          {/* Keyboard Hint */}
          <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-center text-[10px] uppercase tracking-[0.3em] text-white/35">
            ESC to close · ← → to navigate
          </div>
        </div>
      )}
    </>
  );
}