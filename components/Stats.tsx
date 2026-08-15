import {
  Globe,
  MapPin,
  Map,
  Camera,
  Heart,
} from "lucide-react";

type StatsProps = {
  countries: number;
  cities: number;
  continents: number;
  photos: number;
};

export default function Stats({
  countries,
  cities,
  continents,
  photos,
}: StatsProps) {
  const stats = [
    {
      icon: Globe,
      value: countries.toLocaleString(),
      title: "Countries",
    },
    {
      icon: MapPin,
      value: cities.toLocaleString(),
      title: "Cities",
    },
    {
      icon: Map,
      value: continents.toLocaleString(),
      title: "Continents",
    },
    {
      icon: Camera,
      value: photos.toLocaleString(),
      title: "Photos",
    },
  ];

  return (
    <div className="w-[680px] max-w-[calc(100vw-40px)]">
      <div
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-[#d4af37]/30
          bg-[rgba(18,14,12,0.86)]
          px-5
          pt-5
          pb-3
          shadow-[0_20px_60px_rgba(0,0,0,0.45)]
          backdrop-blur-3xl
        "
      >
        {/* Main statistics */}
        <div className="grid grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="
                  relative
                  flex
                  min-w-0
                  flex-col
                  items-center
                  justify-center
                  px-3
                  pb-4
                "
              >
                <Icon
                  size={26}
                  strokeWidth={1.7}
                  className="mb-3 text-[#E7C35A]"
                />

                <div className="text-[28px] font-semibold leading-none text-white">
                  {stat.value}
                </div>

                <div className="mt-2 text-[13px] text-[#E7C35A]">
                  {stat.title}
                </div>

                {index !== stats.length - 1 && (
                  <div className="absolute right-0 top-1 bottom-1 w-px bg-white/15" />
                )}
              </div>
            );
          })}
        </div>

        {/* And counting */}
        <div className="flex items-center justify-center gap-5 pt-1">
          <div className="h-px w-[220px] bg-[#d4af37]/40" />

          <span className="whitespace-nowrap font-serif text-[18px] italic text-[#E7C35A]">
            and counting...
          </span>

          <div className="h-px w-[220px] bg-[#d4af37]/40" />
        </div>

        <div className="mt-2 flex justify-center text-[#E7C35A]">
          <Heart size={24} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}