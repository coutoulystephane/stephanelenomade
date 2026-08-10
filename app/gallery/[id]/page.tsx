import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalEntry } from "@/lib/journal";
import GalleryPhotoViewer from "@/components/gallery/GalleryPhotoViewer";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function GalleryPage({ params }: Props) {
  const { id } = await params;

  const entry = await getJournalEntry(Number(id));

  if (!entry) {
    notFound();
  }

  const coverPhoto =
    entry.photos?.find((photo: any) => photo.is_cover) ??
    entry.photos?.[0];

  const galleryPhotos =
    entry.photos?.filter(
      (photo: any) => photo.image_url !== coverPhoto?.image_url
    ) ?? [];

  const photoCount = entry.photos?.length ?? 0;

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[45vh] overflow-hidden bg-[#05080d]">

        {coverPhoto?.image_url ? (
          <>
            {/* Blurred background */}
            <Image
              src={coverPhoto.image_url}
              alt=""
              fill
              priority
              className="scale-110 object-cover blur-2xl opacity-40"
            />

            {/* Full original photo — no cropping */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={coverPhoto.image_url}
                alt={entry.destination.name}
                fill
                priority
                className="object-contain"
              />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-[#0b1420]" />
        )}

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#05080d] via-black/10 to-black/25" />

        {/* Navigation */}
        <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 pt-8 lg:px-10">
          <Link
            href={`/journal/${id}`}
            className="text-sm uppercase tracking-[0.25em] text-white/70 transition hover:text-white"
          >
            ← Journal
          </Link>

          <Link
            href="/"
            className="text-sm uppercase tracking-[0.25em] text-white/70 transition hover:text-white"
          >
            World Map
          </Link>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex min-h-[45vh] max-w-7xl items-end px-6 pb-12 lg:px-10 lg:pb-16">
          <div className="max-w-5xl">

            <p className="mb-4 text-xs font-medium uppercase tracking-[0.5em] text-yellow-400">
              Travel Gallery
            </p>

            <h1 className="font-serif text-5xl font-light leading-[0.95] tracking-[0.06em] md:text-7xl lg:text-8xl">
              {entry.destination.name}
            </h1>

            <div className="mt-6 h-px w-20 bg-yellow-500" />

            {/* Metadata */}
            <div className="mt-6 inline-flex flex-wrap items-center gap-x-5 gap-y-3 rounded-full border border-white/10 bg-black/25 px-5 py-3 backdrop-blur-md">
              <span className="text-xs uppercase tracking-[0.25em] text-white/75">
                {entry.destination.countryCode}
              </span>

              <span className="h-1 w-1 rounded-full bg-yellow-500" />

              <span className="text-xs uppercase tracking-[0.25em] text-white/75">
                {entry.visit_month} {entry.visit_year}
              </span>

              <span className="h-1 w-1 rounded-full bg-yellow-500" />

              <span className="text-xs uppercase tracking-[0.25em] text-white/75">
                {photoCount} {photoCount === 1 ? "Photo" : "Photos"}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">

        <div className="mb-12 flex items-end justify-between">

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-yellow-500">
              Memories
            </p>

            <h2 className="font-serif text-4xl font-light tracking-wide md:text-5xl">
              {entry.destination.name}
            </h2>
          </div>

          <span className="text-sm uppercase tracking-[0.25em] text-white/40">
            {photoCount} {photoCount === 1 ? "Photo" : "Photos"}
          </span>

        </div>

        {galleryPhotos.length > 0 ? (
          <GalleryPhotoViewer
            photos={galleryPhotos}
            destinationName={entry.destination.name}
          />
        ) : (
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-8 py-16 text-center">
            <p className="text-lg text-white/50">
              No additional photos have been added yet.
            </p>
          </div>
        )}

      </section>

      {/* Bottom Navigation */}
      <section className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-12 lg:px-10">

          <Link
            href={`/journal/${id}`}
            className="text-sm uppercase tracking-[0.25em] text-white/50 transition hover:text-white"
          >
            ← Read Journal
          </Link>

          <Link
            href="/"
            className="text-sm uppercase tracking-[0.25em] text-yellow-500 transition hover:text-yellow-400"
          >
            World Map
          </Link>

        </div>

      </section>
    </main>
  );
}