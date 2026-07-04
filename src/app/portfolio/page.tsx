'use client';

import { useState } from 'react';
import Link from 'next/link';

const PORTFOLIO_DATA = {
  HAIR: [
    '/portfolio/hair/Женская стрижка.JPG',
    '/portfolio/hair/Колористика волос.JPG',
    '/portfolio/hair/Ламинирования волос.JPG',
    '/portfolio/hair/Мелирование волос.JPG',
    '/portfolio/hair/Мужская стрижка.JPG',
    '/portfolio/hair/Окрашивание волос.JPG',
  ],
  NAILS: [
    '/portfolio/manicure/classic-manicure.png',
    '/portfolio/manicure/nail_strengthening.png',
    '/portfolio/manicure/Комбинированный маникюр.jpg',
    '/portfolio/manicure/Ремонт одного ногтя.jpg',
    '/portfolio/manicure/Укрепление гелем 00.37.43.JPG',
    '/portfolio/manicure/Укрепление ногтей базой .jpg',
  ],
  BROWS: [
    '/portfolio/Brovi/violetta-work-1.jpeg',
    '/portfolio/Brovi/Комплекс бровей.JPG',
    '/portfolio/Brovi/Коррекция бровей.JPG',
    '/portfolio/Brovi/Ламинирование бровей.JPG',
    '/portfolio/Brovi/Окрашивание бровей.JPG',
  ],
  SPA: [
    '/portfolio/spa/SPA процедуры.JPG'
  ]
};

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<'HAIR' | 'NAILS' | 'BROWS' | 'SPA'>('HAIR');

  return (
    <main className="w-full max-w-[420px] mx-auto bg-white min-h-screen md:min-h-[90vh] md:h-[90vh] md:rounded-[45px] relative shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-y-auto overflow-x-hidden md:border-[12px] md:border-[#0a0a0a] hide-scrollbar pb-12 z-10">
      
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md z-20 px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <Link href="/" className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          <span className="text-xl">←</span>
        </Link>
        <h1 className="font-serif text-xl">Портфолио</h1>
        <div className="w-10 h-10"></div> {/* Spacer for centering */}
      </div>

      <div className="px-6 py-6">
        <p className="text-center text-sm text-gray-500 mb-8">
          Здесь собраны лучшие работы наших мастеров. Выберите категорию, чтобы посмотреть результат.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button onClick={() => setActiveCategory('HAIR')} className={`py-2 px-5 rounded-full text-[10px] font-bold tracking-widest transition-colors ${activeCategory === 'HAIR' ? 'bg-[#333333] text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}>ВОЛОСЫ</button>
          <button onClick={() => setActiveCategory('NAILS')} className={`py-2 px-5 rounded-full text-[10px] font-bold tracking-widest transition-colors ${activeCategory === 'NAILS' ? 'bg-[#333333] text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}>МАНИКЮР</button>
          <button onClick={() => setActiveCategory('BROWS')} className={`py-2 px-5 rounded-full text-[10px] font-bold tracking-widest transition-colors ${activeCategory === 'BROWS' ? 'bg-[#333333] text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}>БРОВИ</button>
          <button onClick={() => setActiveCategory('SPA')} className={`py-2 px-5 rounded-full text-[10px] font-bold tracking-widest transition-colors ${activeCategory === 'SPA' ? 'bg-[#333333] text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}>SPA</button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3">
          {PORTFOLIO_DATA[activeCategory].map((src, i) => (
            <div key={i} className="bg-gray-100 rounded-xl overflow-hidden aspect-[4/5] shadow-sm relative group cursor-pointer">
              <img src={src} alt={`Работа мастера (${activeCategory})`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
            </div>
          ))}
        </div>
        
        {PORTFOLIO_DATA[activeCategory].length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">
            Фотографии скоро появятся
          </div>
        )}

      </div>
    </main>
  );
}
