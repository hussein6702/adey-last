"use client";
import { MapPin, Clock, Phone } from 'lucide-react';
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "./components/AnimatedSection";
import { useState, useEffect } from "react";
import Link from 'next/link';

// --- Consolidated Style Variables (Background only) ---
const primary = "bg-[#FAF9EE]";
const secondary = "bg-[#3A271C]";

// --- Framer Motion Configuration ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// --- Hero Content ---
function HeroContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`relative flex h-full w-full flex-col px-6 pt-10 pb-6 font-crimson-text md:px-20 ${primary} text-stone-800`}
    >
      <div className="flex flex-col justify-end w-full h-full">

        {/* Logo */}
        <motion.div
          variants={itemVariants}
          className="absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2 md:top-[10%] md:translate-y-0"
        >
          <Image
            src="/full-03.svg"
            alt="Chocolatier Adey Logo"
            width={300}
            height={300}
            className="w-[100%] sm:w-[55%] md:w-[300px] lg:w-[350px]"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div variants={itemVariants} className="justify-center mt-10 md:mt-70">
          <h1 className="leading-tight text-[2.5rem] sm:text-[3rem] md:text-[6rem]">
            Premium Chocolate creations <br />
            <span className="italic">handcrafted</span> in Ethiopia
          </h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="max-w-2xl mt-6 text-lg sm:text-lg md:mt-10 md:text-xl font-crimson-text">
            Crafted with intention, rooted in place. Chocolatier Adey brings
            world-class artistry to Ethiopia one exquisite bonbon at a time.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}


// --- Scrolling Text Section ---
const TEXT_ROOTED = (
  <>
    Rooted In <span className="italic">Africa</span>
  </>
);
const TEXT_INSPIRED = (
  <>
    Inspired by the <span className="italic">World</span>
  </>
);

function ScrollingTextSection() {
  const [currentText, setCurrentText] = useState(TEXT_ROOTED);
  const [isRooted, setIsRooted] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsRooted(prev => !prev);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setCurrentText(isRooted ? TEXT_ROOTED : TEXT_INSPIRED);
  }, [isRooted]);

  return (
    <AnimatedSection>
      <div
        className={`flex h-screen px-6 py-20 w-full ${secondary} justify-center items-center text-center text-white`}
      >
        <motion.h1
          key={isRooted ? "rooted" : "inspired"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="font-crimson-text text-[2.5rem] sm:text-[3rem] md:text-[6rem] leading-tight"
        >
          {currentText}
        </motion.h1>
      </div>
    </AnimatedSection>
  );
}

// --- Crafted Section ---
const TEXT_CARE = (
  <>
    Crafted with <span className="italic">Care.</span>
  </>
);
const TEXT_SHARED = (
  <>
    Shared with <span className="italic">Generosity.</span>
  </>
);

function CraftedSection() {
  const [currentText, setCurrentText] = useState(TEXT_CARE);
  const [isCare, setIsCare] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsCare(prev => !prev);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setCurrentText(isCare ? TEXT_CARE : TEXT_SHARED);
  }, [isCare]);

  return (
    <AnimatedSection>
      <div
        className={`flex flex-col items-center justify-center h-screen px-6 py-20 w-full ${primary} text-center text-stone-800`}
      >
        <motion.h1
          key={isCare ? "care" : "shared"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="font-crimson-text text-[2.5rem] sm:text-[3rem] md:text-[6rem] leading-tight"
        >
          {currentText}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="max-w-2xl mt-10 text-lg sm:text-lg md:text-xl font-lato"
        >
          We believe in slow food, bold ideas, and local excellence. Our goal is
          to contribute to Ethiopian craftsmanship on the global stage with
          chocolate.
        </motion.p>
      </div>
    </AnimatedSection>
  );
}

// ------------------------------------------------------------------
// --- Main Page Component ---
// ------------------------------------------------------------------
export default function Home() {
  return (
    <main>
      <AnimatedSection id="hero">
        <HeroContent />
      </AnimatedSection>

      <ScrollingTextSection />

      <AnimatedSection extraHeight="min-h-[140vh]">
    <div className="flex flex-col h-full px-4 py-10 overflow-x-hidden md:flex-row md:items-start md:py-20 md:px-30">
        <div className="w-full shrink-0 md:w-[600px] flex justify-center">
            <div className="w-full max-w-[450px] md:max-w-none">
                <Image
                    src="/01.jpg"
                    alt="box"
                    width={300}
                    height={240}
                    className="object-cover w-full h-auto"
                />
            </div>
        </div>

        {/* FIX: Changed md:w-1/2 (50%) to md:w-[45%] to make the text column narrower 
            and better balance the content length with the image width.
        */}
        <div className="w-full mt-12 md:w-[45%] md:ml-20 md:pl-8 md:mt-0">
            <h1 className="text-6xl font-crimson-text">Our story</h1>
            <p className="text-[1.5rem] md:text-[1.5rem] mt-10 font-crimson-text">
                Chocolatier Adey was born from a simple desire to convey Ethiopia’s rich
                history of craftsmanship and culinary heritage through the medium of
                chocolate. What started in a basement kitchen in 2017 is now a growing
                atelier, where every piece is made by hand with care, skill, and artistic
                expression. We are self-taught chocolatiers inspired by refined European
                techniques, the rich tapestry of African cultures, and a passion for
                creating beauty by bridging the two.
                <br /><br />
               
                 At Chocolatier Adey, each piece is an embodiment of the resilience, creativity & ambition of the African Renaissance — a celebration of what has been, what is, and what is yet to come.
                Our chocolates are not just an indulgent luxury; they are an invitation to savour & take part in the story of a continent reinventing itself anew. 
                
            </p>
        </div>
        
    </div>
</AnimatedSection>
      
<AnimatedSection extraHeight="min-h-[140vh]">
  
    <div className="max-w-4xl px-4 py-10 mx-auto md:py-20 md:px-20">
      <div className="flex justify-center mb-12">
            <img 
                src="/brownLogo.svg" 
                alt="Chocolatier Adey Logo" 
                className="w-full h-auto max-w-xs"
            />
        </div>
        <div>
            <div className="mb-12">
                <h2 className="mb-4 text-3xl md:text-4xl font-crimson-text">Our Name</h2>
                <p className="text-[1.25rem] md:text-[1.25rem] font-crimson-text">
                    Our name, Adey, honours the flower that marks the Ethiopian New Year, symbolising the renewal and resurgence of African craftsmanship on the global stage. 
                    Reflecting the budding promise of Ethiopia & Africa blossoming into a beacon of excellence on the global stage, this is chocolate with a point of view — rooted in place, crafted for the world.
                </p>
            </div>
            
            <div className="mb-12">
                <h2 className="mb-4 text-3xl md:text-4xl font-crimson-text">Our Logo</h2>
                <p className="text-[1.25rem] md:text-[1.25rem] font-crimson-text">
                    A visual representation of the Akan proverb “Nea Onnim No Sua A, Ohu” or “One who does not know, can know through learning”, it speaks to our self-taught beginnings, and the resourcefulness of a continent that turns scarcity into artistry, and challenges into triumphs — it is a quiet homage to Ethiopia and Africa as a whole.
                </p>
            </div>
            
            <div>
                <h2 className="mb-4 text-3xl md:text-4xl font-crimson-text">Our Mission & Vision</h2>
                <p className="text-[1.25rem] md:text-[1.25rem] font-crimson-text">
                    From the outset, our mission has been to create world-class chocolates that celebrate Ethiopia’s culinary heritage and reintroduce it to a global audience through the medium of chocolate.
                    <br /><br />
                    As we look to the future, our vision is clear: to become Africa’s premier chocolatier & chocolate maker, with a wholly integrated value chain, from cultivation and fermentation, to manufacturing and retail.
                </p>
            </div>
            
        </div>
    </div>
</AnimatedSection>

      {/* Bonbons Section */}
      <AnimatedSection extraHeight="min-h-[140vh]" id="bonbons">
    {/* Assuming 'secondary' is a defined variable or prop */}
    <div className={`w-full ${secondary} px-6 py-32 text-white`}>
        <h2 className="mt-10 text-5xl text-center font-crimson-text sm:text-5xl md:text-7xl">
            Bonbons, bars and beyond
        </h2>
        <p className="max-w-4xl mx-auto mt-4 text-base text-center sm:text-lg md:text-xl font-lato">
            From classic truffles to flavour-forward bonbons, every collection reflects
            our passion for beauty, balance, and storytelling.
        </p>
        <div className="grid w-full grid-cols-1 gap-10 mx-auto mt-16 max-w-7xl md:grid-cols-3">
    
            {/* Product 1: Sesame Praliné - w-3/4 mx-auto scales it down */}
            <div className="flex flex-col items-center w-3/4 p-8 mx-auto">
                <Image
                    src="/Sesame.webp"
                    alt="Lime"
                    width={600}
                    height={600}
                    className="mb-4 h-auto w-full object-contain max-h-[35vh] md:max-h-none"
                />
                <h3 className="mt-4 text-2xl md:text-3xl font-crimson-text">Sesame Praliné</h3>
            </div>
    
            {/* Product 2: Lomi Cheesecake - w-3/4 mx-auto scales it down */}
            <div className="flex flex-col items-center w-3/4 p-8 mx-auto">
                <Image
                    src="/Lime.webp"
                    alt="Metaxa"
                    width={800}
                    height={600}
                    className="mb-4 h-auto w-full object-contain max-h-[35vh] md:max-h-none"
                />
                <h3 className="mt-4 text-2xl tracking-loose md:text-3xl font-crimson-text">Lomi Cheesecake</h3>
            </div>
    
            {/* Product 3: Caramel Crunch - w-3/4 mx-auto scales it down */}
            <div className="flex flex-col items-center w-3/4 p-8 mx-auto">
                <Image
                    src="/Caramel Crunch.webp"
                    alt="Sesame"
                    width={800}
                    height={600}
                    className="mb-4 h-auto w-full object-contain max-h-[35vh] md:max-h-none"
                />
                <h3 className="mt-4 text-2xl md:text-3xl font-crimson-text">Caramel Crunch</h3>
            </div>
    
        </div>
        <div className="mt-16 text-center">
            <Link
                href="/bonbons"
                className="inline-flex items-center gap-2 text-xl italic duration-300 ease-out md:text-2xl font-lato hover:translate-x-5 group"
            >
                View collections
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
            </Link>
        </div>
    </div>
</AnimatedSection>

      {/* High2 Section */}
      <AnimatedSection extraHeight="min-h-[140vh]" id="gift">
        <div className="flex flex-col h-full px-4 py-10 md:flex-row md:items-start md:py-20 md:px-30">
          <div className="w-full shrink-0 md:w-[600px]">
            <Image
              src="/High2.webp"
              alt="box"
              width={480}
              height={240}
              className="object-cover w-full h-auto"
            />
          </div>
          <div className="w-full md:ml-20 md:w-1/2 md:pl-8">
            <h1 className="mt-10 text-6xl font-crimson-text">Make an Impression that lasts</h1>
            <p className="text-[1.5rem]  leading-normal md:text-[1.5rem] font-crimson-text">
              <br /><br />
              Whether you’re thanking a client or celebrating a milestone, our curated chocolate gifts speak volumes. Personalization and branding options available. <br /><br/>
              We help our corporate clients leave lasting impressions. Whether you’re gifting for clients, executives, or events, we offer beautiful, customisable chocolate gifts that convey refined taste, gratitude, and brand warmth. <br /><br/>
              Why Adey?<br/>
              • Handcrafted in Ethiopia <br/>
              • Premium presentation <br/>
              • Custom branding options <br/>
              • Tiered offerings to suit various gifting needs <br/>
            </p>
          </div>
        </div>
      </AnimatedSection>
   

      {/* High3 Section */}
      <AnimatedSection extraHeight="min-h-[140vh]" id="visit">
        <div className={`flex flex-col h-full px-4 py-10 md:flex-row md:items-start md:py-20 md:px-30 ${secondary}`}>
          <div className="w-full shrink-0 md:w-[600px]">
            <Image
              src="/High3.webp"
              alt="box"
              width={480}
              height={240}
              className="object-cover w-full h-auto"
            />
          </div>
          <div className="w-full md:ml-20 md:w-1/2 md:pl-8">
            <h1 className="mt-10 text-6xl text-white font-crimson-text">Not a café. A chocolate experience.</h1>
            <p className="text-[1.5rem] mt-10 leading-normal md:text-[1.5rem] font-crimson-text text-white">
              <br />
              Visit our intimate tasting gallery in Addis Ababa — a space to explore, indulge, and connect with the world of art & chocolate. <br/>
              Our tasting gallery is more than a shop — it’s a space to explore, sample, and experience
              chocolate as art. Whether you're a connoisseur or a curious newcomer, we welcome you to
              step inside. <br/><br/>
            </p>
            <div className="text-xl text-white font-lato">
              <div className="flex items-center mt-4">
                <MapPin className="mr-2" />
                <span> Ground Level Finfinne Bldg., Meskel Sq., Addis Ababa</span>
              </div>
              <div className="flex items-center mt-6">
                <Clock className="mr-2" />
                <span> Tuesday - Sunday 10am - 6pm </span>
              </div>
              <div className="flex items-center mt-6">
                <Phone className="mr-2" />
                <span> +251 987 863536</span>
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-10 ml-0 italic text-[1.5rem] text-white duration-300 ease-out md:text-[1.5rem] font-lato hover:translate-x-5 group"
            >
              Visit Our tasting gallery
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <CraftedSection />
    </main>
  );
}