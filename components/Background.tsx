import Image from "next/image";

export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      <Image
        src="/images/hero/hero-background.png"
        alt="Hero Background"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,.45) 100%)",
        }}
      />
    </div>
  );
}