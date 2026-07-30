import {
  Globe,
  MapPin,
  Map,
  Route,
  Plane,
  Camera,
  Heart,
} from "lucide-react";

const stats = [
  {
    icon: Globe,
    value: "56",
    title: "COUNTRIES",
    subtitle: "Visited",
  },
  {
    icon: MapPin,
    value: "188",
    title: "CITIES",
    subtitle: "Explored",
  },
  {
    icon: Map,
    value: "6",
    title: "CONTINENTS",
    subtitle: "Discovered",
  },
  {
    icon: Route,
    value: "142,000",
    title: "KILOMETRES",
    subtitle: "Travelled",
  },
  {
    icon: Plane,
    value: "87",
    title: "FLIGHTS",
    subtitle: "Taken",
  },
  {
    icon: Camera,
    value: "12,340",
    title: "PHOTOS",
    subtitle: "Captured",
  },
  {
    icon: Heart,
    value: "∞",
    title: "MEMORIES",
    subtitle: "Collected",
  },
];

export default function Stats() {
  return (
    <div className="w-[560px]">
      <div
        className="
          overflow-hidden
          rounded-[30px]
          border
          border-white/10
          bg-[rgba(28,18,12,0.9)]
          backdrop-blur-3xl
          shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        "
      >
        <div className="grid grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="
                  relative
                  flex
                  flex-col
                  items-center
                  justify-center
                  px-4
                  py-7
                "
              >
                <Icon
                  size={22}
                  strokeWidth={1.8}
                  className="mb-4 text-[#E7C35A]"
                />

                <div className="text-[28px] font-semibold leading-none text-white">
                  {stat.value}
                </div>

                <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white">
                  {stat.title}
                </div>

                <div className="mt-1 text-xs text-white/65">
                  {stat.subtitle}
                </div>

                {index % 4 !== 3 && (
                  <div className="absolute right-0 top-5 bottom-5 w-px bg-white/10" />
                )}

                {index < 4 && (
                  <div className="absolute bottom-0 left-5 right-5 h-px bg-white/10" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}