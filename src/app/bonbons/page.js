"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "../../../supabase";
import AnimatedSection from "../components/AnimatedSection";

// --- 1. Product Data (excluding Truffles) ---
const productData = [
  // White Chocolate
  { category: "White Chocolate", name: "Lomi Cheesecake", description: "Lime Ganache on Biscoff Cream", imageName: "Lime.webp" },
  { category: "White Chocolate", name: "Matcha Latte", description: "Matcha & Moringa Ganache", imageName: "Matcha Moringa_.webp" },
  { category: "White Chocolate", name: "Ivory", description: "28% Plain White Chocolate", imageName: "White Plain.webp" },
  { category: "White Chocolate", name: "Cinnamon", description: "Ceylon Cinnamon Ganache", imageName: "Cinnamon.webp" },
  { category: "White Chocolate", name: "Crimson Cream", description: "Strawberry Ganache", imageName: "Crimson Cream.webp" },
  { category: "White Chocolate", name: "Mango Lassi", description: "White Chocolate Mango Ganache", imageName: "Mango Lassi.webp" },

  // Milk Chocolate
  { category: "Milk Chocolate", name: "Qimem Chai Latte", description: "Cardamom, Cinnamon & Clove Ganache", imageName: "Chai.webp" },
  { category: "Milk Chocolate", name: "Macchiato", description: "Ethiopian Coffee Ganache", imageName: "Mocha Latte.webp" },
  { category: "Milk Chocolate", name: "Ebony", description: "32% Plain Milk Chocolate", imageName: "Plain Milk.webp" },
  { category: "Milk Chocolate", name: "Caramel Crunch", description: "Brûléed Caramel on Cereal Flakes", imageName: "Caramel Crunch.webp" },
  { category: "Milk Chocolate", name: "Hazelnut", description: "Roasted & Ground Hazelnut Praliné", imageName: "Hazelnut.webp" },
  { category: "Milk Chocolate", name: "Desert Gold", description: "Caramel on Pistachio & Katayif", imageName: "Desert Gold.webp" },

  // Dark Chocolate
  { category: "Dark Chocolate", name: "Sesame Praliné", description: "Dark Chocolate Ganache on Roasted & Ground Sesame", imageName: "Sesame.webp" },
  { category: "Dark Chocolate", name: "Tiramisu", description: "Coffee Mascarpone Ganache", imageName: "Tiramisu.webp" },
  { category: "Dark Chocolate", name: "Kaba", description: "65% Plain Dark Chocolate", imageName: "Dark Plain.webp" },
  { category: "Dark Chocolate", name: "Salted Caramel", description: "Brûléed Caramel with Afar Lake Salt", imageName: "Salted Caramel.webp" },
  { category: "Dark Chocolate", name: "Cashew", description: "Salted & Ground Cashew Praliné", imageName: "Cashew.webp" },
  { category: "Dark Chocolate", name: "Emerald Silk", description: "Creamy Sicilian Pistachio Paste", imageName: "Emerald Silk.webp" },

  // Liqueur Fillings
  { category: "Liqueur Fillings", name: "Jägermeister", description: "German Digestif Ganache", imageName: "Jager.webp" },
  { category: "Liqueur Fillings", name: "Amaretto", description: "Almond Liqueur Ganache", imageName: "Amaretto.webp" },
  { category: "Liqueur Fillings", name: "Metaxa", description: "Greek Brandy Ganache", imageName: "Metaxa.webp" },
  { category: "Liqueur Fillings", name: "Coconut Rum", description: "Malibu Ganache", imageName: "Coconut Rum.webp" },
  { category: "Liqueur Fillings", name: "Cognac", description: "VSOP Cognac Liquid Center", imageName: "Whiskey Shot.webp" },
];

// --- 2. Utility Function ---
const groupByCategory = (products) => {
  return products.reduce((acc, product) => {
    (acc[product.category] = acc[product.category] || []).push(product);
    return acc;
  }, {});
};

// --- 3. Product Card Component ---
function ProductCard({ product, urls, initialDelay = 0, disableFlash = false }) {
  const [showCross, setShowCross] = useState(false);
  const mainImage = urls[product.imageName];
  const crossSectionImageName = product.imageName.replace(".webp", "_cs.webp");
  const crossImage = urls[crossSectionImageName];

  useEffect(() => {
    if (disableFlash) return; // Skip flashing for Truffles

    let interval;
    if (mainImage && crossImage) {
      const initialTimer = setTimeout(() => {
        interval = setInterval(() => {
          setShowCross((prev) => !prev);
        }, 2500);
      }, initialDelay);

      return () => {
        clearTimeout(initialTimer);
        if (interval) clearInterval(interval);
      };
    }
  }, [initialDelay, mainImage, crossImage, disableFlash]);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative overflow-hidden aspect-square w-full max-w-[150px] sm:max-w-[175px] md:max-w-[200px] lg:max-w-[175px] p-2">
        {mainImage ? (
          <>
            <img
              src={mainImage}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
                showCross && crossImage ? "opacity-0" : "opacity-100"
              }`}
            />
            {crossImage && (
              <img
                src={crossImage}
                alt={`${product.name} cross section`}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
                  showCross ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-xs text-gray-500 bg-gray-200">
            Loading Image...
          </div>
        )}
      </div>

      <div className="mt-4 text-center">
        <h3 className="font-crimson-text text-xl md:text-2xl text-[#3A271C] mb-1">
          {product.name}
        </h3>
        <p className="text-[14px] font-lato text-[#4E3E38]">{product.description}</p>
      </div>
    </div>
  );
}

// --- 4. Main Products Component ---
function Products() {
  const [urls, setUrls] = useState({});
  const [categorizedProducts, setCategorizedProducts] = useState({});

  useEffect(() => {
    setCategorizedProducts(groupByCategory(productData));

    const fetchImages = async () => {
      const fileNames = productData.map((p) => p.imageName);
      const csFileNames = productData.map((p) =>
        p.imageName.replace(".webp", "_cs.webp")
      );

      const allFiles = [...new Set([...fileNames, ...csFileNames])];

      const urlPromises = allFiles.map((name) =>
        supabase.storage.from("adey").getPublicUrl(name)
      );

      const results = await Promise.all(urlPromises);
      const out = {};

      results.forEach((result, index) => {
        if (result.data && result.data.publicUrl) {
          out[allFiles[index]] = result.data.publicUrl;
        }
      });

      setUrls(out);
    };

    fetchImages();
  }, []);

  // --- Hard-coded URLs for Truffles ---
  const truffleUrls = {
    "Milk Truffle.webp": "https://ravyncxzetfqiijqsody.supabase.co/storage/v1/object/public/adey/Milk%20Truffle.webp",
    "Dark Truffle.webp": "https://ravyncxzetfqiijqsody.supabase.co/storage/v1/object/public/adey/Dark%20Truffle.webp",
    "White Truffle.webp": "https://ravyncxzetfqiijqsody.supabase.co/storage/v1/object/public/adey/White%20Truffle.webp",
  };

  return (
    <div className="pt-20 md:pt-0 bg-[#F7EEE2]">
      {/* Normal categories */}
      {Object.entries(categorizedProducts).map(([category, products]) => (
        <section key={category} className="px-4 py-12 md:px-12 md:py-20">
          <h2 className="font-crimson-text text-4xl md:text-5xl text-center mb-16 text-[#3A271C]">
            {category}
          </h2>

          <div className="grid max-w-6xl grid-cols-2 mx-auto gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.name}
                product={product}
                urls={urls}
                initialDelay={index * 400}
              />
            ))}
          </div>
        </section>
      ))}

      {/* --- Centered Truffles Section (no gray box) --- */}
      <section className="flex justify-center px-4 py-12 md:px-12 md:py-20">
        <div className="w-full max-w-6xl">
          <h2 className="font-crimson-text text-4xl md:text-5xl text-center mb-16 text-[#3A271C]">
            Truffles
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
            <div className="flex flex-col items-center p-4">
              <img
                src={truffleUrls["Milk Truffle.webp"]}
                alt="Milk Chocolate Truffle"
                className="w-full max-w-[200px] object-contain"
              />
              <h3 className="font-crimson-text text-xl md:text-2xl text-[#3A271C] mt-4 mb-1">
                Milk Chocolate Truffle
              </h3>
              <p className="text-[14px] font-lato text-[#4E3E38]">Creamy Milk Chocolate Ganache</p>
            </div>

            <div className="flex flex-col items-center p-4">
              <img
                src={truffleUrls["Dark Truffle.webp"]}
                alt="Dark Chocolate Truffle"
                className="w-full max-w-[200px] object-contain"
              />
              <h3 className="font-crimson-text text-xl md:text-2xl text-[#3A271C] mt-4 mb-1">
                Dark Chocolate Truffle
              </h3>
              <p className="text-[14px] font-lato text-[#4E3E38]">Creamy Dark Chocolate Ganache</p>
            </div>

            <div className="flex flex-col items-center p-4">
              <img
                src={truffleUrls["White Truffle.webp"]}
                alt="White Chocolate Truffle"
                className="w-full max-w-[200px] object-contain"
              />
              <h3 className="font-crimson-text text-xl md:text-2xl text-[#3A271C] mt-4 mb-1">
                White Chocolate Truffle
              </h3>
              <p className="text-[14px] font-lato text-[#4E3E38]">Creamy White Chocolate Ganache</p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Chocolate Barks Section */}
      <AnimatedSection extraHeight="min-h-[140vh]" id="barks">
        <div className="flex flex-col h-full px-4 py-10 md:flex-row md:items-start md:py-20 md:px-50">
          <div className="w-full shrink-0 md:w-[600px] md:ml-12">
            <Image
              src="/Bark.webp"
              alt="Chocolate Bark"
              width={480}
              height={240}
              className="object-cover w-full h-auto"
            />
          </div>

          <div className="w-full md:ml-20 md:w-1/2 md:pl-8">
            <h1 className="mt-10 text-6xl font-crimson-text">
              Chocolate Barks
            </h1>
            <p className="text-[1.5rem] mt-8 leading-normal font-crimson-text">
              Our delectable chocolate Barks are available in a variety of flavors:
            </p>
            <ul className="mt-6 space-y-3 text-[1.3rem] font-crimson-text list-disc list-inside">
              <li>White Chocolate & Blueberry</li>
              <li>Milk Chocolate & Almond</li>
              <li>Milk Chocolate & Coffee</li>
              <li>Dark Chocolate & Coffee</li>
              <li>Dark Chocolate & Almond</li>
            </ul>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

export default Products;
