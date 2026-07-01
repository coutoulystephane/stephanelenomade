import { Compass } from "lucide-react";

export default function Navigation() {
  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Compass
            size={34}
            strokeWidth={1.5}
            className="text-amber-400"
          />

          <h1 className="text-4xl font-serif text-white">
            Stéphane le nomade
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex gap-10 text-white">

          <a href="#" className="hover:text-amber-400 transition">
            Map
          </a>

          <a href="#" className="hover:text-amber-400 transition">
            Journal
          </a>

          <a href="#" className="hover:text-amber-400 transition">
            Gallery
          </a>

          <a href="#" className="hover:text-amber-400 transition">
            Bucket List
          </a>

          <a href="#" className="hover:text-amber-400 transition">
            About
          </a>

          <a href="#" className="hover:text-amber-400 transition">
            Contact
          </a>

        </nav>

      </div>
    </header>
  );
}