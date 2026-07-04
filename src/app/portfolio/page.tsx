'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { BookingModal } from '@/components/BookingModal';
import { motion } from 'framer-motion';

const PORTFOLIO_DATA = {
  HAIR: [
    '/portfolio/hair/hair1.JPG',
    '/portfolio/hair/hair2.JPG',
    '/portfolio/hair/hair3.JPG',
    '/portfolio/hair/hair4.JPG',
    '/portfolio/hair/hair5.JPG',
    '/portfolio/hair/hair6.JPG',
    '/portfolio/hair/hair7.JPG',
  ],
  NAILS: [
    '/portfolio/manicure/manicure1.png',
    '/portfolio/manicure/manicure2.png',
    '/portfolio/manicure/manicure3.jpg',
    '/portfolio/manicure/manicure4.jpg',
    '/portfolio/manicure/manicure7.JPG',
    '/portfolio/manicure/manicure8.jpg',
  ],
  BROWS: [
    '/portfolio/Brovi/brows1.jpeg',
    '/portfolio/Brovi/brows2.JPG',
    '/portfolio/Brovi/brows3.JPG',
    '/portfolio/Brovi/brows4.JPG',
    '/portfolio/Brovi/brows5.JPG',
  ],
  SPA: [
    '/portfolio/spa/spa1.JPG'
  ]
};

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<'HAIR' | 'NAILS' | 'BROWS' | 'SPA'>('HAIR');
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <main className="w-full bg-[#ebdcd4] min-h-screen relative z-10">
      <Navigation onBookingClick={() => setModalOpen(true)} />
      <BookingModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      <section className="bg-white pt-32 pb-16 md:pt-40 md:pb-24 px-6 min-h-screen rounded-b-[40px] md:rounded-b-[80px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] relative z-20">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl mb-6">Портфолио</h1>
            <p className="text-sm md:text-base text-[#2c2c2c]/80 max-w-2xl mx-auto">
              Здесь собраны лучшие работы наших мастеров. Выберите категорию, чтобы посмотреть результат.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            <button onClick={() => setActiveCategory('HAIR')} className={`py-3 px-6 md:px-8 rounded-full text-xs font-bold tracking-widest transition-colors uppercase ${activeCategory === 'HAIR' ? 'bg-[#333333] text-white shadow-md' : 'bg-gray-100 text-[#2c2c2c] hover:bg-gray-200'}`}>Волосы</button>
            <button onClick={() => setActiveCategory('NAILS')} className={`py-3 px-6 md:px-8 rounded-full text-xs font-bold tracking-widest transition-colors uppercase ${activeCategory === 'NAILS' ? 'bg-[#333333] text-white shadow-md' : 'bg-gray-100 text-[#2c2c2c] hover:bg-gray-200'}`}>Маникюр</button>
            <button onClick={() => setActiveCategory('BROWS')} className={`py-3 px-6 md:px-8 rounded-full text-xs font-bold tracking-widest transition-colors uppercase ${activeCategory === 'BROWS' ? 'bg-[#333333] text-white shadow-md' : 'bg-gray-100 text-[#2c2c2c] hover:bg-gray-200'}`}>Брови</button>
            <button onClick={() => setActiveCategory('SPA')} className={`py-3 px-6 md:px-8 rounded-full text-xs font-bold tracking-widest transition-colors uppercase ${activeCategory === 'SPA' ? 'bg-[#333333] text-white shadow-md' : 'bg-gray-100 text-[#2c2c2c] hover:bg-gray-200'}`}>SPA</button>
          </div>

          {/* Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={activeCategory}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {PORTFOLIO_DATA[activeCategory].map((src, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl overflow-hidden aspect-[4/5] shadow-sm relative group cursor-pointer">
                <img src={src} alt={`Работа мастера (${activeCategory})`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              </div>
            ))}
          </motion.div>
          
          {PORTFOLIO_DATA[activeCategory].length === 0 && (
            <div className="text-center py-20 text-gray-400 text-sm">
              Фотографии скоро появятся
            </div>
          )}
          
        </div>
      </section>
    </main>
  );
}
