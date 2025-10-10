"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const linksLeft = [
  { label: "Our Story", href: "#story" },
  { label: "Bonbons", href: "#bonbons" },
  { label: "Gifting", href: "#gift" },
  { label: "Visit Us", href: "#visit" },
  { label: "Collections", href: "/bonbons" }, // Added Collections link
];

const linksRight = [
  { label: "Instagram", href: "https://www.instagram.com/adeychocolatier" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "tel:+251987863536" }, // Opens phone app
];

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href) => {
    // If it's an anchor link to a section
    if (href.startsWith("#")) {
      if (pathname !== "/") {
        router.push(`/${href}`); // Go to home and jump to section
      } else {
        const el = document.getElementById(href.replace("#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href.startsWith("tel:") || href.startsWith("http")) {
      // For external links or phone numbers, let browser handle it
      window.location.href = href;
    } else {
      router.push(href); // Normal page navigation
    }
  };

  return (
    <footer className="bg-[#b1a285] text-[#4e3e38] px-8 py-16">
      <div className="grid grid-cols-1 gap-12 mx-auto max-w-7xl md:grid-cols-3">
        
        {/* Left column - Section Links */}
        <nav className="flex flex-col items-start gap-4 text-lg font-crimson-text">
          {linksLeft.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNavigation(l.href)}
              className="text-left hover:underline"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Middle column – logo */}
        <div className="flex justify-center">
          <Image
            src="/full-03.svg"
            alt="Chocolatier Adey logo"
            width={200}
            height={80}
            className="object-contain"
            priority
          />
        </div>

        {/* Right column - Utility Links */}
        <nav className="flex flex-col items-start gap-4 text-lg md:items-end font-crimson-text">
          {linksRight.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNavigation(l.href)}
              className="text-left hover:underline md:text-right"
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </footer>
  );
}
