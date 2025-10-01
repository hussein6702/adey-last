"use client";

// Import necessary hooks and components
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "./components/AnimatedSection"; 
import { useState, useEffect } from "react"; 
import Link from 'next/link';


// --- Consolidated Style Variables (Background only) ---
const primary = "bg-[#F5F5DC]"; 
const secondary = "bg-[#3A271C]"; 

// --- Framer Motion Configuration ---
// 1. Container variant for the parent div inside HeroContent
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

// 2. Item variant for each direct child element to be animated
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


// --- Reusable Content Components (Now Animated) ---
function HeroContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      // Added pb-6 here to create a small gap (padding-bottom) at the bottom
      className={`flex h-full w-full flex-col justify-end px-6 pb-6 top-20 font-crimson-text md:px-20 ${primary} text-stone-800`}
    >
      
      {/* 1. Logo Container */}
      <motion.div variants={itemVariants} className="flex justify-center ">
        <Image
          src="/full-03.svg"
          alt="Chocolatier Adey Logo"
          width={100}
          height={100}
          className="h-auto w-[20%] opacity-100 md:w-[300px]"
        />
      </motion.div>
      
      {/* 2. Headline Container */}
      <motion.div variants={itemVariants} className="justify-center mt-10 md:mt-70">
        <h1 className="leading-tight text-[2.5rem] md:text-[6rem]">
          Premium Chocolate creations <br />
          <span className="italic">handcrafted</span> in Ethiopia
        </h1>
      </motion.div>
      
      {/* 3. Paragraph Container */}
      <motion.div variants={itemVariants}>
        <p className="max-w-2xl mt-6 text-lg font-lato md:mt-10 md:text-xl">
          Crafted with intention, rooted in place. Chocolatier Adey brings
          world-class artistry to Ethiopia one exquisite bonbon at a time.
        </p>
      </motion.div>
    </motion.div>
  );
}

// ------------------------------------------------------------------
// --- COMPONENT FOR TIME-BASED TEXT SWAP (Faster Logic) ---
// ------------------------------------------------------------------

// Define the two possible text states as React elements
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
  // State to manage the visible text
  const [currentText, setCurrentText] = useState(TEXT_ROOTED);
  
  // State to track which text is currently active
  const [isRooted, setIsRooted] = useState(true);

  // 1. Set up the timer to switch the text every 1.5 seconds (1500ms)
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Toggle the state (true -> false, false -> true)
      setIsRooted(prev => !prev);
    }, 2000); // <-- CHANGED: 1500 milliseconds = 1.5 seconds

    // Cleanup: Clear the interval when the component is removed
    return () => clearInterval(intervalId);
  }, []);

  // 2. Update the displayed text whenever the timer toggles isRooted
  useEffect(() => {
    setCurrentText(isRooted ? TEXT_ROOTED : TEXT_INSPIRED);
  }, [isRooted]);

  return (
    <AnimatedSection >
      <div
        className={`flex h-screen px-6 py-20 w-full ${secondary} justify-center items-center text-center text-white`}
      >
        <motion.h1 
          // Use key to trigger the Framer Motion transition whenever the text changes
          key={isRooted ? "rooted" : "inspired"} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }} // <-- CHANGED: Transition duration reduced to 0.3s
          className={`text-white font-crimson-text text-[6rem]`}
        >
          {currentText}
        </motion.h1>
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
      <AnimatedSection>
        <HeroContent />
      </AnimatedSection>
      
      {/* The section with the repeating text animation */}
      <ScrollingTextSection />
    <AnimatedSection extraHeight="min-h-[140vh]">
  <div className="flex flex-col h-full px-4 py-10 md:flex-row md:items-start md:py-20 md:px-30">
    {/* image */}
   <div className="w-full shrink-0 md:w-[600px]">   {/* ← smaller desktop width */}
  <Image
    src="/01.jpg"
    alt="box"
    width={480}
    height={240}
    className="object-cover w-full h-auto"
  />
</div>

    {/* text */}
    <div className="w-sm md:w-1/2 md:ml-20 md:pl-8 ">
        <h1 className="text-6xl font-crimson-text">Our story</h1>

      <p className="text-[1.5rem] mt-10 leading-normal md:text-[18pxs] font-crimson-text md:mt-20">
        Chocolatier Adey is a boutique chocolate atelier reimagining African
        flavours & textures through the medium of chocolate.
        <br />
        <br />
        Hand-crafted in Addis Ababa, our creations blend refined European
        techniques with bold, expressive ingredients from across our rich
        continent. Each piece is a celebration of heritage, artistry, and
        excellence.

        <br/>
        <br/>
        Chocolatier Adey was born from a simple desire to convey Ethiopia’s rich history of craftsmanship and culinary heritage through the medium of chocolate. What started in a basement kitchen in 2017 is now a growing atelier,
         where every piece is made by hand with care, skill, and artistic expression. We are self-taught chocolatiers inspired by refined European techniques,
          the rich tapestry of African cultures, and a passion for creating beauty by bridging the two. Our name, Adey, honours the flower that marks the Ethiopian New Year,
           symbolising the renewal and resurgence of African craftsmanship on the global stage. This is chocolate with a point of view — rooted in place, crafted for the world <br/> <br/>
      </p>

      {/* <Link
        href="/"
        className="inline-flex items-center gap-2 mt-10 ml-0 text-xl italic duration-300 ease-out md:text-4xl font-lato hover:translate-x-5 group"
      >
        Read our story
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
      </Link> */}
       <Image
          src="/brownLogo.svg"
          alt="Chocolatier Adey Logo"
          width={100}
          height={100}
          className="h-auto w-[20%] opacity-100 md:w-[40px] md:ml-100"
        /> 
    </div>
   
  </div>
</AnimatedSection>
<AnimatedSection extraHeight="min-h-[140vh]">
  <div className={`w-full ${secondary} px-6 py-32 text-white`}>
    {/* HEADING */}
    <h2 className="text-5xl text-center font-crimson-text md:text-7xl">
      Bonbons, bars and beyond
    </h2>

    {/* sub-line */}
    <p className="max-w-4xl mx-auto mt-4 text-base text-center font-lato md:text-xl">
      From classic truffles to flavour-forward bonbons, every collection reflects
      our passion for beauty, balance, and storytelling.
    </p>

    {/* 3 CARDS */}
    <div className="grid w-full grid-cols-1 gap-10 mx-auto mt-16 max-w-7xl md:grid-cols-3">
      {/* Card 1 – Lime */}
      <div className="flex flex-col items-center p-8 bg-white/10">
        <Image
          src="/Lime.png"
          alt="Lime"
          width={800}
          height={600}
          className="mb-4 h-auto w-full object-contain max-h-[35vh] md:max-h-none"
        />
        <h3 className="mt-4 text-2xl font-crimson-text md:text-3xl">Lime</h3>
      </div>

      {/* Card 2 – Metaxa */}
      <div className="flex flex-col items-center p-8 bg-white/10">
        <Image
          src="/Metaxa.png"
          alt="Metaxa"
          width={800}
          height={600}
          className="mb-4 h-auto w-full object-contain max-h-[35vh] md:max-h-none"
        />
        <h3 className="mt-4 text-2xl font-crimson-text md:text-3xl">Metaxa</h3>
      </div>

      {/* Card 3 – Cashew */}
      <div className="flex flex-col items-center p-8 bg-white/10">
        <Image
          src="/Cashew.png"
          alt="Cashew"
          width={800}
          height={600}
          className="mb-4 h-auto w-full object-contain max-h-[35vh] md:max-h-none"
        />
        <h3 className="mt-4 text-2xl font-crimson-text md:text-3xl">Cashew</h3>
      </div>
    </div>

    {/* CTA link */}
    <div className="mt-16 text-center">
      <Link
        href="/collections"
        className="inline-flex items-center gap-2 text-xl italic duration-300 ease-out font-lato hover:translate-x-5 group md:text-2xl"
      >
        View collections
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
      </Link>
    </div>
  </div>
</AnimatedSection>
<AnimatedSection extraHeight="min-h-[140vh]">
  <div className="flex flex-col h-full px-4 py-10 md:flex-row md:items-start md:py-20 md:px-30">
    {/* image */}
   <div className="w-full shrink-0 md:w-[600px]">   {/* ← smaller desktop width */}
  <Image
    src="/box.png"
    alt="box"
    width={480}
    height={240}
    className="object-cover w-full h-auto"
  />
</div>

    {/* text */}
    <div className="w-full md:ml-20 md:w-1/2 md:pl-8">
      <p className="text-[1.5rem] mt-10 leading-normal md:text-[2.5rem] font-crimson-text">
      Make an Impression that lasts
        <br />
        <br />
       Whether you’re thanking a client or celebrating a milestone, our curated chocolate gifts speak volumes. Personalization and branding options available
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 mt-10 ml-0 text-xl italic duration-300 ease-out md:text-4xl font-lato hover:translate-x-5 group"
      >
        Visit Gifting 
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
      </Link>
    </div>
  </div>
</AnimatedSection>
<AnimatedSection extraHeight="min-h-[140vh]" >
  <div className={`flex flex-col h-full px-4 py-10 md:flex-row md:items-start md:py-20 md:px-30 ${secondary}`}>
    {/* image */}
   <div className="w-full shrink-0 md:w-[600px]">   {/* ← smaller desktop width */}
  <Image
    src="/box.png"
    alt="box"
    width={480}
    height={240}
    className="object-cover w-full h-auto"
  />
</div>

    {/* text */}
    <div className="w-full md:ml-20 md:w-1/2 md:pl-8">
      <p className="text-[1.5rem] mt-10 leading-normal md:text-[2.5rem] font-crimson-text text-white">
Not a café. A chocolate experience.        <br />
        <br />
Visit our intimate tasting gallery in Addis Ababa — a space to explore, indulge, and connect with the world of art & chocolate      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 mt-10 ml-0 text-xl italic text-white duration-300 ease-out md:text-4xl font-lato hover:translate-x-5 group"
      >
        Visit Our tasting gallery
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
      </Link>
    </div>
  </div>
</AnimatedSection>
    </main>
  );
}