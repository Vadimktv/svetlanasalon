'use client';

import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export default function Navigation({ onBookingClick }: { onBookingClick: () => void }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    setIsScrolled(latest > 50);
  });

  const links = [
    { name: 'Услуги', path: '/#services' },
    { name: 'Портфолио', path: '/#gallery' },
    { name: 'Контакты', path: '/#contacts' },
  ];

  return (
    <motion.nav 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl"
    >
      <div className={`rounded-full px-2 py-2 flex items-center justify-between transition-colors duration-500 border ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg border-white/50' : 'bg-transparent border-transparent'}`}>
        <div className="flex items-center gap-2 px-2 md:px-4 shrink-0">
          <img src="/logo.png" alt="Svetlana Salon" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover shadow-sm border border-[#a8a39d]/20" />
          <span className={`font-serif tracking-widest uppercase text-sm hidden md:block transition-colors duration-300 ${isScrolled ? 'text-[#2c2c2c]' : 'text-[#ebdcd4]'}`}>
            SvetlanaSalon
          </span>
        </div>
        
        <div className="flex items-center justify-end w-full md:w-auto gap-1 md:gap-4 overflow-hidden pr-2">
          {links.map((link) => {
            return (
              <a 
                key={link.name} 
                href={link.path}
                className={`px-2 md:px-4 py-2 text-[9px] md:text-xs font-bold tracking-wider rounded-full transition-all duration-300 uppercase whitespace-nowrap ${isScrolled ? 'text-[#2c2c2c] hover:bg-[#ebdcd4]/50' : 'text-[#ebdcd4]/90 hover:text-white hover:bg-white/10'}`}
              >
                {link.name}
              </a>
            );
          })}
          
          <button 
            onClick={onBookingClick}
            className="hidden md:block ml-2 px-6 py-2.5 rounded-full bg-[#333333] text-[#ebdcd4] text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors duration-300 shadow-md shrink-0"
          >
            Записаться
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
