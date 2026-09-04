import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getCityTrips } from "@/lib/city";
import GalleryPhotoViewer from "@/components/gallery/GalleryPhotoViewer";

type Props = {
  params: Promise<{
    geonameId: string;
  }>;
};

export default async function CityPage({ params }: Props) {
  const { geonameId } = await params;

  const cityId = Number(geonameId);

  if (!Number.isInteger(cityId)) {
    notFound();
  }

  const city = await getCityTrips(cityId);

  if (!city) {
    notFound();
  }

  const coverPhoto =
    city.photos.find((photo) => photo.is_cover)?.image_url ??
    city.photos[0]?.image_url;

  return (
    <main className="min-h-screen bg-[#07111f] text-white">

      {/* ================= Back Navigation ================= */}

      <div className="mx-auto max-w-6xl px-6 pt-8">
        <Link
          href="/europe"
          className="
            inline-flex
            items-center
            text-sm
            uppercase
            tracking-[0.2em]
            text-[#d4af37]
            transition
            hover:text-[#f6d979]
          "
        >
          ← Back to Europe
        </Link>
      </div>

      {/* ================= Cover ================= */}

      {coverPhoto && (
        <section className="mx-auto mt-8 max-w-5xl px-6">
          <div className="overflow-hidden rounded-[32px] bg-black shadow-2xl">
            <div className="relative h-[380px]">
              <Image
                src={coverPhoto}
                alt={city.destination.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute bottom-8 left-8">
                <h1 className="font-serif text-6xl text-white">
                  {city.destination.name}
                </h1>

                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/70">
                  {city.destination.countryCode} ·{" "}
                  {city.years.join(" · ")}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= Header if no cover ================= */}

      {!coverPhoto && (
        <section className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="font-serif text-6xl">
            {city.destination.name}
          </h1>

          <p className="mt-4 text-sm uppercase tracking-[0.3em] text-white/60">
            {city.destination.countryCode} ·{" "}
            {city.years.join(" · ")}
          </p>
        </section>
      )}

      {/* ================= Journey ================= */}

      <section className="mx-auto max-w-3xl px-6 py-20">

        <div className="mb-14 text-center">

          <div className="mb-5 flex items-center justify-center gap-5">
            <div className="h-px w-20 bg-[#d4af37]/30" />

            <div className="text-xl text-[#d4af37]">
              ✦
            </div>

            <div className="h-px w-20 bg-[#d4af37]/30" />
          </div>

          <h2 className="font-serif text-4xl text-white">
            My Journey
          </h2>

        </div>

        <div className="space-y-12">

          {city.stories.length > 0 ? (
            city.stories.map((story) => (
              <article key={story.tripId}>

                <div className="mb-4 flex items-center gap-4">
                  <h3 className="font-serif text-3xl text-[#d4af37]">
                    {story.year}
                  </h3>

                  <div className="h-px flex-1 bg-[#d4af37]/20" />

                  <span className="text-sm uppercase tracking-[0.2em] text-white/40">
                    {story.month}
                  </span>
                </div>

                <p className="whitespace-pre-wrap text-lg leading-9 text-white/70">
                  {story.notes}
                </p>

              </article>
            ))
          ) : (
            <p className="text-center italic text-white/40">
              No travel story has been written yet.
            </p>
          )}

        </div>

      </section>

      {/* ================= Gallery ================= */}

      <section className="mx-auto max-w-6xl px-6 pb-24">

        <div className="mb-10 flex items-end justify-between border-b border-white/10 pb-5">

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-[#d4af37]">
              Memories
            </p>

            <h2 className="font-serif text-4xl">
              Gallery
            </h2>
          </div>

          <span className="text-sm uppercase tracking-[0.3em] text-white/40">
            {city.photos.length} Photos
          </span>

        </div>

        {city.photos.length > 0 ? (
          <GalleryPhotoViewer
            photos={city.photos}
            destinationName={city.destination.name}
          />
        ) : (
          <p className="py-16 text-center text-white/40">
            No photos have been added yet.
          </p>
        )}

      </section>

      {/* ================= Bottom Navigation ================= */}

      <section className="border-t border-white/10">

        <div className="mx-auto flex max-w-6xl justify-center px-6 py-12">

          <Link
            href="/europe"
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-[#d4af37]/50
              bg-[#08121d]/70
              px-8
              py-3
              text-sm
              uppercase
              tracking-[0.2em]
              text-[#E7C35A]
              transition-all
              hover:border-[#E7C35A]
              hover:bg-[#d4af37]/10
              hover:text-[#f6d979]
            "
          >
            ← Back to Europe
          </Link>

        </div>

      </section>

    </main>
  );
}