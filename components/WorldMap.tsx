import Image from "next/image";

export default function WorldMap() {
  return (
    <div className="relative flex w-full justify-center items-center">
      <Image
        src="/images/hero/world-map-gold.png"
        alt="World Map"
        width={1800}
        height={950}
        priority
        className="
          w-full
          max-w-[1500px]
          h-auto
          object-contain
          drop-shadow-[0_0_45px_rgba(255,215,0,0.85)]
        "
      />
    </div>
  );
}