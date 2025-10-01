"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * A reusable component that makes its children sticky and animates them out on scroll.
 * @param {{children: React.ReactNode}} props
 */
export default function AnimatedSection({
  children,
  extraHeight = "h-screen",
}) {
  const ref = useRef(null);

  /* ---------- NEW OFFSET ---------- */
  const { scrollYProgress } = useScroll({
    target: ref,
    // fade starts when the bottom of the sticky content touches the top of the viewport
    offset: ["end end", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const contentScale   = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <section ref={ref} className={`relative ${extraHeight}`}>
      <motion.div
        className="sticky flex h-full top-20"
        style={{ opacity: contentOpacity, scale: contentScale }}
      >
        {children}
      </motion.div>
    </section>
  );
}