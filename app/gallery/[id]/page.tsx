type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function GalleryPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-6xl p-10 text-white">
      <h1 className="text-5xl font-bold">
        Photo Gallery
      </h1>

      <p className="mt-6 text-xl">
        Destination ID: {id}
      </p>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl font-semibold">
          Gallery coming soon...
        </h2>

        <p className="mt-4 text-gray-300">
          This page will eventually show every photo associated with this destination.
        </p>
      </div>
    </main>
  );
}