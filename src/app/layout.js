// app/layout.js

import "./globals.css";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

export const metadata = {
  title: "Adey Chocolatier",
  description: "Handcrafted chocolates made in Ethiopia",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* SVG for modern browsers */}
        <link rel="icon" href="/brownLogo.svg" type="image/svg+xml" />
        
        {/* PNG fallback for Safari, iOS, and Google */}
        <link rel="icon" href="/brownLogo.png" type="image/png" sizes="180x180" />
        
        {/* Apple home screen icon */}
        <link rel="apple-touch-icon" href="/brownLogo.png" sizes="180x180" />
        
        {/* Optional legacy fallback */}
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* PWA manifest */}
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
