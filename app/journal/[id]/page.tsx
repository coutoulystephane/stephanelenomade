import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalEntry } from "@/lib/journal";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JournalPage({ params }: Props) {
  const { id } = await params;

  const entry = await getJournalEntry(Number(id));

  if (!entry) {
    notFound();
  }

  const coverPhoto =
    entry.photos?.find((photo: any) => photo.is_cover) ??
    entry.photos?.[0];

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">

      {/* Back Navigation */}
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm tracking-wide text-gray-400 transition hover:text-white"
        >
          ← Back to World Map
        </Link>
      </div>

      {/* Cover Image */}
      {coverPhoto?.image_url && (
        <section className="mx-auto mt-8 max-w-4xl px-6">
          <div className="overflow-hidden rounded-[32px] bg-black shadow-2xl">

            <div className="relative flex h-[320px] items-center justify-center">
              <Image
                src={coverPhoto.image_url}
                alt={entry.destination.name}
                fill
                priority
                className="object-contain"
              />
            </div>

          </div>
        </section>
      )}

      {/* Destination Header */}
      <section className="mx-auto max-w-4xl px-6 py-6 text-center">

        <h1 className="text-5xl font-light tracking-[0.25em] uppercase">
          {entry.destination.name}
        </h1>

        <div className="mx-auto mt-6 h-px w-20 bg-yellow-500" />

        <p className="mt-4 text-lg tracking-[0.35em] uppercase text-gray-400">
          {entry.destination.countryCode} • {entry.visit_month} {entry.visit_year}
        </p>

      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-6 pb-16">

        <h2 className="mb-8 text-center text-3xl font-light tracking-widest uppercase">
          My Journey
        </h2>

        {entry.notes ? (
          <div className="space-y-8 text-xl leading-10 text-gray-300">
            <p className="whitespace-pre-wrap">
              {entry.notes}
            </p>
          </div>
        ) : (
          <p className="text-center italic text-gray-500">
            No travel story has been written yet.
          </p>
        )}

      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-3xl px-6 pt-4 pb-24">

        <div className="mb-10 flex items-center justify-between">

          <h2 className="text-3xl font-light tracking-widest uppercase">
            Gallery
          </h2>

          <span className="text-sm uppercase tracking-[0.3em] text-gray-500">
            {entry.photos?.length ?? 0} Photos
          </span>

        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">

          {entry.photos?.map((photo: any) => (
            <div
              key={photo.image_url}
              className="group relative aspect-square overflow-hidden rounded-3xl bg-neutral-900 shadow-xl"
            >
              <Image
                src={photo.image_url}
                alt={entry.destination.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
          ))}

        </div>

      </section>

      {/* Bottom Navigation */}
      <section className="border-t border-white/10">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-12">

          <button className="text-sm uppercase tracking-[0.25em] text-gray-400 transition hover:text-white">
            ← Previous Destination
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-yellow-500 transition hover:text-yellow-400"
          >
            ← World Map
          </Link>

          <button className="text-sm uppercase tracking-[0.25em] text-gray-400 transition hover:text-white">
            Next Destination →
          </button>

        </div>

      </section>

    </main>
  );
}