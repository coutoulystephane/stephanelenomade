import Link from "next/link";
import {
  Globe,
  MapPin,
  Map,
  Camera,
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
          pt-3
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
                  pb-2
                "
              >
                <Icon
                  size={26}
                  strokeWidth={1.7}
                  className="mb-2 text-[#E7C35A]"
                />

                <div className="text-[28px] font-semibold leading-none text-white">
                  {stat.value}
                </div>

                <div className="mt-1 text-[13px] text-[#E7C35A]">
                  {stat.title}
                </div>

                {index !== stats.length - 1 && (
                  <div className="absolute right-0 top-1 bottom-1 w-px bg-white/15" />
                )}
              </div>
            );
          })}
        </div>

        {/* Bright Discover More CTA */}
        <Link
          href="/continents"
          className="
            group
            relative
            mt-3
            flex
            min-h-[72px]
            items-center
            justify-center
            gap-4
            overflow-hidden
            rounded-2xl
            border
            border-[#E7C35A]
            bg-[rgba(212,175,55,0.10)]
            px-4
            py-3
            shadow-[0_0_22px_rgba(212,175,55,0.35)]
            transition-all
            duration-300
            hover:border-[#f6d979]
            hover:bg-[rgba(212,175,55,0.18)]
            hover:shadow-[0_0_38px_rgba(212,175,55,0.60)]
          "
        >
          {/* Left arrows */}
          <span
            className="
              text-[25px]
              font-light
              tracking-[-0.12em]
              text-[#E7C35A]
              transition-transform
              duration-300
              group-hover:-translate-x-1
            "
          >
            »»
          </span>

          <div className="text-center">
            <div
              className="
                font-serif
                text-[18px]
                font-semibold
                tracking-[0.16em]
                text-[#f3d477]
                transition-all
                duration-300
                group-hover:text-[#fff0a8]
              "
            >
              CLICK TO DISCOVER MORE
            </div>

            <div
              className="
                mt-1
                text-[11px]
                tracking-[0.18em]
                text-white/70
                transition-colors
                duration-300
                group-hover:text-white
              "
            >
              CLIQUER POUR EN DÉCOUVRIR PLUS
            </div>
          </div>

          {/* Right arrows */}
          <span
            className="
              text-[25px]
              font-light
              tracking-[-0.12em]
              text-[#E7C35A]
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          >
            ««
          </span>

          {/* Bottom glow */}
          <div
            className="
              pointer-events-none
              absolute
              inset-x-8
              bottom-0
              h-px
              bg-[#f6d979]
              opacity-80
              blur-sm
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
          />
        </Link>
      </div>
    </div>
  );
}