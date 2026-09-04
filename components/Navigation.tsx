"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <nav className="mx-auto flex max-w-[1800px] justify-start px-8 py-8">
        <Link
          href="/"
          className="
            group
            inline-flex
            items-center
            gap-3
            rounded-full
            border
            border-[#d4af37]/60
            bg-black/30
            px-7
            py-3
            text-sm
            uppercase
            tracking-[0.2em]
            text-[#E7C35A]
            shadow-[0_0_18px_rgba(212,175,55,0.16)]
            backdrop-blur-md
            transition-all
            duration-300
            hover:border-[#E7C35A]
            hover:bg-black/50
            hover:text-[#f6d979]
            hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]
          "
        >
          <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>

          <span>BACK TO MAP</span>
        </Link>
      </nav>
    </header>
  );
}