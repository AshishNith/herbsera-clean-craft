import React, { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface PoemAnimationProps {
  poemHTML: string;
  backgroundImageUrl: string;
  boyImageUrl: string;
}

export const PoemAnimation = ({
  poemHTML,
  backgroundImageUrl,
  boyImageUrl,
}: PoemAnimationProps) => {

  const { scrollYProgress } = useScroll();

  // 🔥 Scroll-based rotation
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const scrolledPoem = useMemo(() => {
    return `<div class="poem-wrapper">${poemHTML}${poemHTML}${poemHTML}</div>`;
  }, [poemHTML]);

  return (
    <section className="relative flex justify-center items-center py-20">
      
      <div className="w-full max-w-[1100px] aspect-[16/9] relative">
        
        {/* Background */}
        <img
          src={backgroundImageUrl}
          className="absolute inset-0 w-full h-full object-cover opacity-40 rounded-[3rem]"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />

        {/* Character */}
        <img
          src={boyImageUrl}
          className="absolute bottom-0 right-0 h-[85%] z-40 drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />

        {/* 3D Cube */}
        <motion.div
          style={{ rotateX, rotateY }}
          className="absolute inset-0 flex items-center justify-center perspective-[1200px]"
        >
          <div className="relative w-[70%] h-[60%] preserve-3d">

            {/* LEFT */}
            <div
              className="absolute w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 text-white p-6 rounded-2xl transform -translate-x-1/2 rotate-y-[-90deg]"
              dangerouslySetInnerHTML={{ __html: scrolledPoem }}
            />

            {/* RIGHT */}
            <div
              className="absolute w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 text-white p-6 rounded-2xl transform translate-x-1/2 rotate-y-[90deg]"
              dangerouslySetInnerHTML={{ __html: scrolledPoem }}
            />

            {/* BACK */}
            <div
              className="absolute w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 text-white p-6 rounded-2xl transform -translate-z-[200px]"
              dangerouslySetInnerHTML={{ __html: scrolledPoem }}
            />

          </div>
        </motion.div>
      </div>
    </section>
  );
};