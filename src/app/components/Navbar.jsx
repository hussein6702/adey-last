"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const links = [
  { label: "Home", id: "hero" },
  { label: "Bonbons", id: "bonbons" },
  { label: "Gift", id: "gift" },
  { label: "Visit", id: "visit" },
  { label: "Story", id: "story" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  const scrollToSection = (id) => {
    if (pathname !== "/") {
      // Redirect to home with hash
      router.push(`/#${id}`);
      setOpen(false);
    } else {
      // Scroll smoothly if already on home page
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      }
    }
  };

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-[#4E3E38] text-[#B1A285] hover:opacity-90 transition"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Sliding panel */}
      <nav
        className={`fixed inset-y-0 right-0 w-3/4 md:w-1/4 h-screen bg-[#4E3E38] text-[#B1A285] transform transition-transform duration-300 ease-in-out z-40 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start justify-center h-full gap-8 px-10 text-2xl font-crimson-text">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollToSection(l.id)}
              className="text-left hover:underline"
            >
              {l.label}
            </button>
          ))}

          {/* Direct page link to /bonbons */}
          <Link
            href="/bonbons"
            onClick={() => setOpen(false)}
            className="hover:underline"
          >
            Collections
          </Link>
        </div>
      </nav>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/30"
        />
      )}
    </>
  );
}
