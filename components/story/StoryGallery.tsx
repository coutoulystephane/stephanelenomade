"use client";

type Photo = {
  id: number;
  image_url: string;
  is_cover: boolean;
};

type StoryGalleryProps = {
  photos: Photo[];
};

export default function StoryGallery({
  photos,
}: StoryGalleryProps) {
  if (photos.length === 0) {
    return (
      <p className="text-center text-gray-400">
        No photos uploaded.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="w-[260px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-amber-400/40"
        >
          <div className="relative">
            <img
              src={photo.image_url}
              alt=""
              className="w-full h-auto transition duration-300 hover:scale-105"
            />

            {photo.is_cover && (
              <div className="absolute left-3 top-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                ⭐ Cover
              </div>
            )}
          </div>

          <div className="p-4">
            {photo.is_cover ? (
              <div className="rounded-lg bg-emerald-600 py-2 text-center text-sm font-semibold text-white">
                Current Cover
              </div>
            ) : (
              <button
                disabled
                className="w-full rounded-lg bg-white/10 py-2 text-sm text-gray-400 transition hover:bg-white/20"
              >
                Set as Cover
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}