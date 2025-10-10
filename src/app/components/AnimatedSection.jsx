"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AnimatedSection({
  children,
  extraHeight = "h-screen",
  ...props // 1. Add `...props` here to collect the `id`
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    // 2. Add `{...props}` here to apply the `id` to the <section> tag
    <section ref={ref} className={`relative ${extraHeight}`} {...props}>
      <motion.div
        className="sticky flex h-full top-20"
        style={{ opacity: contentOpacity, scale: contentScale }}
      >
        {children}
      </motion.div>
    </section>
  );
}