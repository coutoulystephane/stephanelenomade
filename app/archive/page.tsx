import Link from "next/link";
import ArchiveDashboard from "@/components/archive/ArchiveDashboard";

export default function ArchivePage() {
  return (
    <main className="min-h-screen bg-[#08121f] text-white">
      <ArchiveDashboard />
    </main>
  );
}