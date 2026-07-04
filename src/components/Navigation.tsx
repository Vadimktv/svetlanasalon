'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const links = [
    { name: 'Главная', path: '/' },
    { name: 'Услуги', path: '/services' },
    { name: 'Мастера', path: '/masters' },
    { name: 'Контакты', path: '/contacts' },
  ];

  return (
    <motion.nav 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl"
    >
      <div className="glass-panel rounded-full px-2 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3 px-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-brand-accent)] flex items-center justify-center text-[var(--color-brand-ink)] font-serif font-bold text-lg">
            S
          </div>
          <span className="font-semibold tracking-widest uppercase text-sm hidden md:block">
            SvetlanaSalon
          </span>
        </div>
        
        <div className="flex items-center gap-1 md:gap-4">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link 
                key={link.name} 
                href={link.path}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-white/10 text-[var(--color-brand-accent)]' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <Link 
            href="/booking"
            className="ml-2 px-6 py-2 rounded-full bg-[var(--color-brand-accent)] text-[var(--color-brand-ink)] text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300"
          >
            Записаться
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
