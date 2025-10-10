import "./globals.css";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

export const metadata = {
  title: "Adey Chocolatier",
  description: "Handcrafted chocolates made in Ethiopia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/brownlogo.svg" type="image/svg+xml" />
        <title>Adey Chocolatier</title>
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
