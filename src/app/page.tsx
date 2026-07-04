'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { BookingModal, SERVICES } from '@/components/BookingModal';



export default function Home() {
  const [activeCategory, setActiveCategory] = useState<'HAIR' | 'NAILS' | 'BROWS' | 'SPA'>('HAIR');
  const [isModalOpen, setModalOpen] = useState(false);

  function Accordion({ title, children }: { title: string, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="mb-2">
        <div 
          className="accordion-title cursor-pointer" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{isOpen ? '−' : '+'} {title}</span>
        </div>
        {isOpen && (
          <div className="text-xs text-[#2c2c2c]/80 leading-relaxed bg-white/50 p-4 rounded-lg mb-2">
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <main className="w-full bg-[#ebdcd4] min-h-screen relative z-10">
      <Navigation onBookingClick={() => setModalOpen(true)} />
      <BookingModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        className="bg-[#333333] text-[#ebdcd4] pt-16 pb-12 md:py-32 px-6 flex flex-col items-center justify-center relative z-10 shadow-lg md:rounded-b-[80px] rounded-b-[40px]"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 w-full">
          <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
            <img src="/logo.png" alt="Svetlana Salon Logo" className="w-16 h-16 rounded-full mb-6 object-cover shadow-lg hidden md:block" />
            <h1 className="font-serif text-4xl md:text-6xl tracking-[0.2em] mb-2">SVETLANA</h1>
            <p className="text-xs md:text-sm tracking-widest uppercase opacity-80 mb-8">beauty salon</p>
            <p className="hidden md:block text-base leading-relaxed opacity-90 max-w-md mb-8">
              Премиальное пространство красоты в Геленджике, где безупречный стиль сочетается с первоклассным сервисом.
            </p>
          </div>

          <div className="flex-1 w-full max-w-sm flex flex-col gap-4">
            <button onClick={() => setModalOpen(true)} className="w-full bg-[#ebdcd4] text-[#333333] font-bold text-sm tracking-wider uppercase py-4 rounded-full hover:bg-white transition-colors shadow-lg">ОНЛАЙН ЗАПИСЬ</button>
            <a href="#services" className="w-full border border-[#ebdcd4] text-[#ebdcd4] text-center font-bold text-sm tracking-wider uppercase py-4 rounded-full hover:bg-white/10 transition-colors">УСЛУГИ</a>
            <Link href="/portfolio" className="w-full border border-[#ebdcd4] text-[#ebdcd4] text-center font-bold text-sm tracking-wider uppercase py-4 rounded-full hover:bg-white/10 transition-colors">ФОТО РАБОТ</Link>
            <a href="#contacts" className="w-full border border-[#ebdcd4] text-[#ebdcd4] text-center font-bold text-sm tracking-wider uppercase py-4 rounded-full hover:bg-white/10 transition-colors">АДРЕС</a>
          </div>
        </div>
      </motion.section>

      {/* Promotions Section */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="pt-16 pb-12 px-6 text-center"
      >
        <h2 className="font-serif text-3xl mb-6">Акции</h2>
        <div className="bg-[#ebdcd4] border border-[#a8a39d] rounded-2xl p-6 shadow-sm mx-auto max-w-[320px]">
          <p className="font-bold text-lg mb-2">Знакомство с мастером</p>
          <p className="text-xs uppercase font-medium leading-relaxed mb-4">
            При первом посещении нашего салона<br/>
            на любую процедуру у мастера Анны или Виолетты
          </p>
          <p className="text-xs italic mb-2">вы получаете скидку</p>
          <p className="font-bold text-sm">15% на весь чек</p>
        </div>
      </motion.section>

      {/* Why Us Section */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-[#a8a39d] text-white py-16 md:py-24 px-6 relative md:rounded-t-[80px] rounded-t-3xl"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl mb-2 text-center text-[#2c2c2c]">Почему мы?</h2>
          <p className="text-center text-sm md:text-base mb-12 md:mb-20 text-[#2c2c2c]">Красота без случайностей</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            {[
              { title: 'Консультация перед процедурой', desc: 'Честные рекомендации по уходу и подбору образа.' },
              { title: 'Стерильность и аккуратность', desc: 'Премиальные материалы и строгие нормы дезинфекции.' },
              { title: 'Без суеты и ожиданий', desc: 'Удобная онлайн-запись, где администратор всё подтверждает лично.' },
              { title: 'Сервис высшего класса', desc: 'Чай, кофе и забота в каждой детали визита.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start bg-white/5 p-6 rounded-3xl hover:bg-white/10 transition-colors">
                <div className="min-w-[48px] h-[48px] bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#2c2c2c] text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-[#2c2c2c]/80 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 bg-white/10 p-6 rounded-full max-w-[400px] mx-auto border border-white/20">
            <img src="/ui/svetlana-salon-hero.webp" alt="Светлана" className="w-20 h-20 rounded-full object-cover shrink-0 shadow-lg" />
            <div>
              <h4 className="font-serif text-xl leading-none mb-2 text-[#2c2c2c]">Светлана</h4>
              <p className="text-xs uppercase tracking-widest text-[#2c2c2c]">Топ-стилист / основатель</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        id="services" 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-[#ebdcd4] py-16 md:py-24 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl mb-12 text-center uppercase tracking-widest">Услуги</h2>
          
          {/* Main Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button onClick={() => setActiveCategory('HAIR')} className={`py-3 px-8 rounded-full text-xs font-bold tracking-wider transition-colors ${activeCategory === 'HAIR' ? 'bg-[#333333] text-white shadow-md' : 'bg-white/50 text-[#a8a39d] hover:bg-white'}`}>ВОЛОСЫ</button>
            <button onClick={() => setActiveCategory('NAILS')} className={`py-3 px-8 rounded-full text-xs font-bold tracking-wider transition-colors ${activeCategory === 'NAILS' ? 'bg-[#333333] text-white shadow-md' : 'bg-white/50 text-[#a8a39d] hover:bg-white'}`}>МАНИКЮР</button>
            <button onClick={() => setActiveCategory('BROWS')} className={`py-3 px-8 rounded-full text-xs font-bold tracking-wider transition-colors ${activeCategory === 'BROWS' ? 'bg-[#333333] text-white shadow-md' : 'bg-white/50 text-[#a8a39d] hover:bg-white'}`}>БРОВИ</button>
            <button onClick={() => setActiveCategory('SPA')} className={`py-3 px-8 rounded-full text-xs font-bold tracking-wider transition-colors ${activeCategory === 'SPA' ? 'bg-[#333333] text-white shadow-md' : 'bg-white/50 text-[#a8a39d] hover:bg-white'}`}>SPA</button>
          </div>

          {/* Price List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-16 text-sm md:text-base font-medium">
            {SERVICES[activeCategory].map((service, idx) => (
              <div key={idx} className="flex justify-between items-end">
                <span className="max-w-[70%] font-bold">{service.name}</span>
                <div className="border-b-2 border-dotted border-[#a8a39d]/50 flex-grow mx-3 mb-1.5"></div>
                <span>{service.price}</span>
              </div>
            ))}
          </div>

          <button onClick={() => setModalOpen(true)} className="w-full max-w-[320px] bg-[#ebdcd4] border-2 border-[#a8a39d] text-[#2c2c2c] font-bold text-sm tracking-wider uppercase py-5 px-8 rounded-full mx-auto block hover:bg-[#a8a39d] hover:text-white transition-colors">
            ЗАПИСАТЬСЯ
          </button>
        </div>
      </motion.section>

      {/* Recommendations Section */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-[#ebdcd4] pt-8 pb-12 px-6"
      >
        <h2 className="font-serif text-2xl mb-8 text-center leading-tight">Рекомендации<br/>до и после</h2>
        
        <h3 className="font-bold text-lg mb-4 text-[#a8a39d]">Окрашивание волос</h3>
        <Accordion title="ПЕРЕД ОКРАШИВАНИЕМ">Не мойте голову в день окрашивания. Если есть аллергия, сообщите мастеру заранее.</Accordion>
        <Accordion title="ПОСЛЕ ОКРАШИВАНИЕМ">Используйте шампуни для окрашенных волос без сульфатов. Избегайте горячих укладок в первые дни.</Accordion>

        <h3 className="font-bold text-lg mt-8 mb-4 text-[#a8a39d]">Маникюр</h3>
        <Accordion title="МЕЖДУ ПРОЦЕДУРАМИ">Увлажняйте кутикулу маслом каждый день. При отслойке не снимайте покрытие самостоятельно.</Accordion>
      </motion.section>

      {/* Photo Gallery & Reviews */}
      <motion.section 
        id="gallery" 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-white py-16 md:py-24 px-6 rounded-t-3xl md:rounded-t-[80px] text-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)] relative z-20"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl mb-12">Портфолио</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
            <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-[4/5] shadow-sm relative group cursor-pointer">
              <img src="/portfolio/hair/hair6.JPG" alt="Волосы" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-[4/5] shadow-sm relative group cursor-pointer">
              <img src="/portfolio/manicure/manicure1.png" alt="Маникюр" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="hidden md:block bg-gray-100 rounded-2xl overflow-hidden aspect-[4/5] shadow-sm relative group cursor-pointer">
              <img src="/portfolio/Brovi/brows2.JPG" alt="Брови" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="hidden md:block bg-gray-100 rounded-2xl overflow-hidden aspect-[4/5] shadow-sm relative group cursor-pointer">
              <img src="/portfolio/hair/hair3.JPG" alt="Волосы 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
          </div>
          
          <Link href="/portfolio" className="inline-block border border-[#2c2c2c] text-[#2c2c2c] rounded-full py-4 px-10 text-sm font-bold uppercase tracking-wider hover:bg-[#2c2c2c] hover:text-white transition-colors">
            Смотреть всё
          </Link>

        <h2 className="font-serif text-3xl mt-16 mb-6">Отзывы</h2>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center font-bold text-xs">Е</div>
            <div>
              <p className="font-bold text-sm">Екатерина С.</p>
              <p className="text-[10px] text-gray-500">Постоянный клиент</p>
            </div>
          </div>
          <p className="text-[10px] text-yellow-500 mb-2">★★★★★</p>
          <p className="text-xs leading-relaxed text-[#2c2c2c]/80">
            Светлана — волшебница! Нашла идеальный оттенок для моих волос. Салон очень красивый и эстетичный, кофе потрясающий.
          </p>
        </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-[#ebdcd4] py-12 px-6"
      >
        <h2 className="font-serif text-2xl mb-8 text-center font-bold">Остались вопросы?</h2>
        <div className="flex flex-col gap-2">
          <Accordion title="МОЖНО ЛИ ОПЛАТИТЬ ПО СБП?">Да, мы принимаем оплату наличными, по карте и через СБП.</Accordion>
          <Accordion title="ПОМОЖЕТЕ ЛИ ВЫ ВЫБРАТЬ СТРИЖКУ?">Конечно! Все наши мастера консультируют перед процедурой и помогают подобрать идеальный образ под ваши черты лица.</Accordion>
          <Accordion title="ЕСТЬ ЛИ У ВАС ПАРКОВКА?">Да, рядом с салоном есть бесплатная общественная парковка.</Accordion>
        </div>
      </motion.section>

      {/* Contacts & Footer */}
      <motion.section 
        id="contacts" 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-[#2c2c2c] py-16 md:py-24 px-6 text-center md:text-left relative rounded-t-[40px] md:rounded-t-[80px] text-[#ebdcd4] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center md:items-start">
          
          <div className="w-full md:w-[35%] flex flex-col items-center md:items-start">
            <h2 className="font-serif text-4xl md:text-5xl mb-8 md:mb-12">Контакты</h2>
            
            <div className="mb-8 md:mb-10 text-center md:text-left">
              <p className="text-xs uppercase tracking-widest text-[#a8a39d] mb-3">Адрес</p>
              <p className="font-medium text-lg md:text-xl leading-snug">г. Геленджик<br/>ул. Одесская 3А, корп. 10</p>
            </div>
            
            <div className="mb-10 text-center md:text-left">
              <p className="text-xs uppercase tracking-widest text-[#a8a39d] mb-3">Телефон</p>
              <p className="font-serif text-3xl md:text-4xl tracking-wide">+7 (928) 280-62-94</p>
            </div>
            
            <div className="flex justify-center md:justify-start gap-4 mb-12 w-full">
              <a href="https://t.me/SvetSalonPro" target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#24A1DE] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-[0_5px_15px_rgba(36,161,222,0.4)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.92 9.06c-.15.65-.53.81-1.07.51l-2.97-2.18-1.43 1.38c-.16.16-.29.29-.6.29l.21-3.03 5.52-4.98c.24-.22-.05-.34-.37-.12l-6.82 4.29-2.93-.91c-.64-.2-.65-.64.13-.94l11.45-4.41c.53-.2.99.12.8.95z"/></svg>
              </a>
              <a href="https://wa.me/79282806294" target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-[0_5px_15px_rgba(37,211,102,0.4)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.01 0C5.38 0 0 5.38 0 12c0 2.12.55 4.11 1.52 5.86L.18 23.54l5.83-1.53c1.7.92 3.65 1.44 5.71 1.44 6.61 0 11.99-5.38 11.99-12S18.62 0 12.01 0zm0 21.46c-1.8 0-3.51-.48-5.02-1.38l-3.56.93.95-3.47A9.97 9.97 0 012.03 12C2.03 6.49 6.51 2.01 12.01 2.01c5.5 0 9.98 4.48 9.98 9.99 0 5.51-4.48 9.99-9.98 9.99zm5.56-7.39c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-2.22-1.12-3.8-2.52-4.63-4.48-.13-.3.13-.28.43-.88.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.23-.25-.6-.5-.53-.68-.53-.18 0-.38-.03-.58-.03-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.1 3.2 5.1 4.5.7.3 1.25.48 1.68.6.7.2 1.35.18 1.85.1.58-.1 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35z"/></svg>
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-[65%]">
            {/* Real Yandex Map Frame */}
            <div className="w-full h-[350px] md:h-[400px] bg-white rounded-3xl overflow-hidden relative shadow-lg">
              <iframe src="https://yandex.ru/map-widget/v1/?mode=search&ol=biz&oid=114529011558&sll=38.077222%2C44.561111&z=16" width="100%" height="100%" frameBorder="0" className="absolute inset-0"></iframe>
            </div>
          </div>

        </div>

        <div className="mt-16 text-[10px] text-[#ebdcd4]/50 tracking-widest uppercase text-center w-full border-t border-white/10 pt-8">
          © 2026 Svetlana Beauty Salon
        </div>
      </motion.section>

    </main>
  );
}
