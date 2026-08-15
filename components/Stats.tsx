import {
  Globe,
  MapPin,
  Map,
  Route,
  Plane,
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
      title: "COUNTRIES",
    },
    {
      icon: MapPin,
      value: cities.toLocaleString(),
      title: "CITIES",
    },
    {
      icon: Map,
      value: continents.toLocaleString(),
      title: "CONTINENTS",
    },
    {
      icon: Route,
      value: "142,000",
      title: "KILOMETRES",
    },
    {
      icon: Plane,
      value: "87",
      title: "FLIGHTS",
    },
    {
      icon: Camera,
      value: photos.toLocaleString(),
      title: "PHOTOS",
    },
    {
      icon: Heart,
      value: "∞",
      title: "MEMORIES",
    },
  ];

  return (
    <div className="w-[1100px] max-w-[calc(100vw-40px)]">
      <div
        className="
          overflow-hidden
          rounded-full
          border
          border-white/10
          bg-[rgba(18,12,9,0.72)]
          px-2
          backdrop-blur-2xl
          shadow-[0_15px_50px_rgba(0,0,0,0.35)]
        "
      >
        <div className="grid grid-cols-7">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="
                  relative
                  flex
                  min-w-0
                  items-center
                  justify-center
                  gap-2
                  px-3
                  py-3
                "
              >
                <Icon
                  size={17}
                  strokeWidth={1.7}
                  className="shrink-0 text-[#E7C35A]"
                />

                <div className="min-w-0">
                  <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                    <span className="text-lg font-semibold leading-none text-white">
                      {stat.value}
                    </span>

                    <span className="text-[9px] uppercase tracking-[0.12em] text-white/65">
                      {stat.title}
                    </span>
                  </div>
                </div>

                {index !== stats.length - 1 && (
                  <div className="absolute right-0 top-2 bottom-2 w-px bg-white/10" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}