import Image from "next/image";
import LiveTravelPins from "./LiveTravelPins";

export default function WorldMap() {
  return (
    <div className="relative flex w-full items-center justify-center pt-0">
      <div
        className="
          relative
          w-full
          max-w-[1350px]
        "
      >
        <Image
          src="/images/hero/world-map.svg"
          alt="World Map"
          width={2754}
          height={1397}
          priority
          className="
            w-full
            h-auto
            object-contain
            opacity-95
            select-none
          "
        />

        {/* Live Travel Pins */}
        <div className="absolute inset-0 z-20">
          <LiveTravelPins />
        </div>
      </div>
    </div>
  );
}