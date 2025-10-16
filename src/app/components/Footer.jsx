"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const linksLeft = [
  { label: "Our Story", href: "#story" },
  { label: "Bonbons", href: "#bonbons" },
  { label: "Gifting", href: "#gift" },
  { label: "Visit Us", href: "#visit" },
  { label: "Collections", href: "/bonbons" },
];

const linksRight = [
  { label: "Instagram", href: "https://www.instagram.com/adeychocolatier" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "tel:+251987863536" },
];

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href) => {
    if (href.startsWith("#")) {
      if (pathname !== "/") {
        router.push(`/${href}`);
      } else {
        const el = document.getElementById(href.replace("#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href.startsWith("tel:") || href.startsWith("http")) {
      window.location.href = href;
    } else {
      router.push(href);
    }
  };

  return (
    <footer className="bg-[#b1a285] text-[#4e3e38] px-4 sm:px-8 py-10 sm:py-16">
      <div
        className="grid items-center justify-between grid-cols-3 gap-4 mx-auto text-sm  max-w-7xl sm:text-lg sm:gap-12"
      >
        {/* Left column - Section Links */}
        <nav className="flex flex-col items-start gap-2 sm:gap-4 font-crimson-text">
          {linksLeft.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNavigation(l.href)}
              className="hover:underline"
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
            width={140}
            height={60}
            className="object-contain sm:w-[200px]"
            priority
          />
        </div>

        {/* Right column - Utility Links */}
        <nav className="flex flex-col items-end gap-2 sm:gap-4 font-crimson-text">
          {linksRight.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNavigation(l.href)}
              className="text-right hover:underline"
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </footer>
  );
}
