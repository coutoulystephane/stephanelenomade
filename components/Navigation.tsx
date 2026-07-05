"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { label: "Map", href: "/" },
    { label: "Journal", href: "/journal" },
    { label: "Gallery", href: "/gallery" },
    { label: "Bucket List", href: "/bucket-list" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <nav className="mx-auto flex max-w-[1800px] justify-center gap-16 py-8 text-lg text-white">

        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`pb-1 transition duration-300 hover:text-[#d4af37] ${
              pathname === item.href
                ? "border-b-2 border-[#d4af37] text-[#d4af37]"
                : "text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}

      </nav>
    </header>
  );
}