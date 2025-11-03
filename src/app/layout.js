// app/layout.js

import "./globals.css";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

// ✅ Metadata with both SVG + PNG for full coverage
export const metadata = {
  title: "Adey Chocolatier",
  description: "Handcrafted chocolates made in Ethiopia",
  icons: {
    icon: [
      { url: "/brownLogo.svg", type: "image/svg+xml" },          // sharp SVG for modern browsers
      { url: "/brownLogo.png", type: "image/png", sizes: "180x180" }, // PNG fallback for Safari, Google, etc.
    ],
    apple: "/brownLogo.png", // iOS home screen icon
  },
  manifest: "/manifest.json", // optional (for PWA or SEO richness)
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
