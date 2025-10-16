// app/layout.js

import "./globals.css";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

// ✅ Use Next.js metadata API properly
export const metadata = {
  title: "Adey Chocolatier",
  description: "Handcrafted chocolates made in Ethiopia",
  icons: {
    icon: "/brownlogo.svg", // Path relative to /public
  },
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
