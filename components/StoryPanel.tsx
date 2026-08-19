"use client";

export default function StoryPanel() {
  const facebookUrl = ["https://", "facebook.com", "/coutoulystephane"].join("");
  const instagramUrl = ["https://", "instagram.com", "/coutoulystephane"].join("");

  return (
    <div className="max-w-[380px]">
      <h1 className="font-serif text-[3.2rem] leading-[0.92] text-white">
        Stéphane
        <br />
        le nomade
      </h1>

      <div className="mt-6 h-[2px] w-44 bg-[#d4af37]" />

      <div className="mt-6">
        <p className="text-[12px] uppercase tracking-[0.28em] text-[#d4af37]">
          Follow the Journey
        </p>

        <div className="mt-4 flex items-center gap-3">
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Stéphane on Facebook"
            className="flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-black/20 px-4 py-2 text-sm text-white transition hover:border-[#d4af37] hover:bg-[#d4af37]/10"
          >
            <span className="font-bold text-[#d4af37]">f</span>
            <span>Facebook</span>
          </a>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Stéphane on Instagram"
            className="flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-black/20 px-4 py-2 text-sm text-white transition hover:border-[#d4af37] hover:bg-[#d4af37]/10"
          >
            <span className="font-bold text-[#d4af37]">◎</span>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
}