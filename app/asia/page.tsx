import Navigation from "@/components/Navigation";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#07111f]">
      <Navigation />

      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-5xl font-serif text-white">
          Coming Soon
        </h1>
      </div>
    </main>
  );
}