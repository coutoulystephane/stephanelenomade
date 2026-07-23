import { getTrip } from "@/lib/archive";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StoryPage({ params }: PageProps) {
  const { id } = await params;

  const trip = await getTrip(Number(id));

  if (!trip) {
    notFound();
  }

  const cover =
    trip.photos.find((photo: any) => photo.is_cover)?.image_url ??
    trip.photos[0]?.image_url;

  return (
    <main className="min-h-screen bg-[#07111f]">
      {/* Hero */}
      <section className="relative h-[420px] w-full overflow-hidden bg-slate-900">
        {cover ? (
          <img
            src={cover}
            alt={trip.destinations_master?.name ?? ""}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-2xl text-gray-500">
            No Cover Photo
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-black/40 to-transparent" />

        <div className="absolute bottom-10 left-10">
          <h1 className="text-5xl font-serif text-white">
            {trip.destinations_master?.name}
          </h1>

          <p className="mt-3 text-xl text-gray-200">
            {trip.visit_month} {trip.visit_year}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-5xl px-8 py-16">
        <h2 className="mb-6 text-3xl font-serif text-white">
          Travel Story
        </h2>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
          <p className="whitespace-pre-wrap text-lg leading-9 text-gray-300">
            {trip.notes || "No story available."}
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-8 pb-20">
        <h2 className="mb-8 text-3xl font-serif text-white">
          Photo Gallery
        </h2>

        {trip.photos.length === 0 ? (
          <p className="text-gray-400">No photos uploaded.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {trip.photos.map((photo: any) => (
              <div
                key={photo.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <img
                  src={photo.image_url}
                  alt=""
                  className="h-52 w-full object-cover transition hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}