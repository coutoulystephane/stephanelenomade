interface StatsCardProps {
  title: string;
  value: number | string;
}

export default function StatsCard({
  title,
  value,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition hover:border-amber-400/40 hover:bg-white/10">
      <p className="text-sm text-white/60">{title}</p>

      <p className="mt-2 text-4xl font-bold">
        {value}
      </p>
    </div>
  );
}