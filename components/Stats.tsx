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
    <div className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2 w-[1300px]">
      <div
        className="
          flex
          w-full
          overflow-hidden
          rounded-[30px]
          border
          border-white/6
          bg-[rgba(28,18,12,0.42)]
          backdrop-blur-6xl
          shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        "
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="
                relative
                flex
                flex-1
                flex-col
                items-center
                px-5
                py-5
              "
            >
              <Icon
                size={24}
                strokeWidth={1.8}
                className="mb-6 text-[#E7C35A]"
              />

              <div className="text-[48px] font-semibold leading-none text-white">
                {stat.value}
              </div>

              <div className="mt-3 text-[13px] uppercase tracking-[0.18em] text-white">
                {stat.title}
              </div>

              <div className="mt-1 text-sm text-white/65">
                {stat.subtitle}
              </div>

              {index < stats.length - 1 && (
                <div className="absolute right-0 top-5 bottom-5 w-px bg-white/10" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}