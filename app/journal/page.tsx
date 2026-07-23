import JournalList from "@/components/JournalList";

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-[#07111f] px-8 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-12 text-5xl font-serif text-white">
          Travel Journal
        </h1>

        <JournalList />
      </div>
    </main>
  );
}