import { getTrip } from "@/lib/archive";
import { notFound } from "next/navigation";

import StoryHero from "@/components/story/StoryHero";
import StoryGallery from "@/components/story/StoryGallery";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StoryPage({ params }: PageProps) {
  const { id } = await params;

  const trip = await getTrip(Number(id));

  console.log("Trip Photos:", trip?.photos);

  if (!trip) {
    notFound();
  }

  const coverPhoto =
    trip.photos.find((photo: any) => photo.is_cover) ??
    trip.photos[0];

  return (
    <main className="min-h-screen bg-[#07111f]">
      <StoryHero
        destination={trip.destinations_master?.name ?? ""}
        month={trip.visit_month}
        year={trip.visit_year}
        coverImage={coverPhoto?.image_url}
      />

      {/* Story */}
      <section className="mx-auto max-w-5xl px-8 py-8">
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

        <StoryGallery photos={trip.photos} />
      </section>
    </main>
  );
}