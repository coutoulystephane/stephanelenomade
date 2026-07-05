export default function StoryPanel() {
  return (
    <div className="max-w-[380px]">

      <h1 className="font-serif text-[4.2rem] leading-[0.92] text-white">
        Stéphane
        <br />
        le nomade
      </h1>

      <div className="mt-6 h-[2px] w-44 bg-[#d4af37]" />

      <h2 className="mt-8 text-[2.1rem] italic leading-tight text-[#d4af37]">
        Every pin on the map
        <br />
        has a story.
      </h2>

      <p className="mt-10 text-[1.05rem] leading-10 text-white/90">
        I've travelled across the world collecting unforgettable moments,
        meeting incredible people and discovering what makes every destination
        unique.
      </p>

      <button
        className="
          mt-10
    rounded-full
    border
    border-[#d4af37]
    px-10
    py-4
    text-lg
    text-white
    transition-all
    duration-300
    hover:bg-[#d4af37]
    hover:text-black
    hover:shadow-[0_0_30px_rgba(212,175,55,0.45)]
        "
      >
        Watch my Journey
      </button>

    </div>
  );
}