import UploadPhotos from "@/components/archive/UploadPhotos";
import { getTrips } from "@/lib/archive";

export default async function AdminPhotosPage() {
  const trips = await getTrips();

  const formattedTrips = trips
    .map((trip: any) => {
      const destination = Array.isArray(trip.destinations_master)
        ? trip.destinations_master[0]
        : trip.destinations_master;

      return {
        id: trip.id,
        name: destination?.name ?? "Unknown destination",
        visitMonth: trip.visit_month,
        visitYear: trip.visit_year,
        photoCount: trip.photos?.length ?? 0,
      };
    })
    .filter(
      (trip) => trip.name !== "Unknown destination"
    );

  return (
    <main className="min-h-screen bg-[#08121f] text-white">
      <UploadPhotos trips={formattedTrips} />
    </main>
  );
}
