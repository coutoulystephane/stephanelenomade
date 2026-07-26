import Image from "next/image";
import MapPins from "./MapPins";

export default function WorldMap() {
  return (
    <div className="relative flex w-full items-center justify-center pt-50">
<Image
  src="/images/hero/world-map.svg"
  alt="World Map"
  width={2754}
  height={1397}
  priority
  className="
  w-full
  max-w-[1500px]
  h-auto
  object-contain
  opacity-95
  -translate-x-16
  select-none
  "
/>

      {/* Interactive pin layer */}
      <MapPins />
    </div>
  );
}