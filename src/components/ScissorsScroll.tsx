'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ScissorsScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Rotate blades to simulate cutting
  // We'll use a sine wave mapped to scroll progress to make them open and close repeatedly
  const cutAnimation = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 8]);
  
  const topBladeRotation = useTransform(cutAnimation, (v) => Math.sin(v) * 15);
  const bottomBladeRotation = useTransform(cutAnimation, (v) => -Math.sin(v) * 15);

  const scissorsY = useTransform(scrollYProgress, [0, 1], ["0%", "300%"]);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] flex justify-center overflow-hidden">
      {/* A golden line representing the hair/thread being cut */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-[var(--color-brand-accent)] to-transparent opacity-30" />
      
      <motion.div 
        style={{ y: scissorsY }} 
        className="sticky top-1/2 -mt-12 flex items-center justify-center w-32 h-32"
      >
        {/* Scissors SVG Container */}
        <div className="relative w-24 h-24 text-[var(--color-brand-accent)] opacity-80 shadow-2xl">
          
          {/* Top Blade */}
          <motion.svg 
            style={{ rotate: topBladeRotation, transformOrigin: '20% 50%' }}
            className="absolute inset-0 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
            viewBox="0 0 100 50" 
            fill="currentColor"
          >
            <path d="M10,25 C10,15 20,10 30,15 L90,23 L90,27 L30,25 C20,30 10,25 10,25 Z M15,25 C15,20 25,20 25,25 C25,30 15,30 15,25 Z" />
          </motion.svg>
          
          {/* Bottom Blade */}
          <motion.svg 
            style={{ rotate: bottomBladeRotation, transformOrigin: '20% 50%' }}
            className="absolute inset-0 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
            viewBox="0 0 100 50" 
            fill="currentColor"
          >
            <path d="M10,25 C10,35 20,40 30,35 L90,27 L90,23 L30,25 C20,20 10,25 10,25 Z M15,25 C15,30 25,30 25,25 C25,20 15,20 15,25 Z" />
          </motion.svg>
          
          {/* Screw / Pivot point */}
          <div className="absolute left-[18%] top-1/2 -mt-1 -ml-1 w-2 h-2 rounded-full bg-black border border-[var(--color-brand-accent)]" />
        </div>
      </motion.div>
    </div>
  );
}
