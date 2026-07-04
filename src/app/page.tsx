'use client';

import { useState } from 'react';
import Link from 'next/link';

const SERVICES = {
  HAIR: [
    { name: 'Женская стрижка', price: 'от 1 500 ₽' },
    { name: 'Мужская стрижка', price: 'от 1 000 ₽' },
    { name: 'Окрашивание волос', price: 'от 3 500 ₽' },
    { name: 'Колористика / Мелирование', price: 'от 5 000 ₽' },
    { name: 'Ламинирование волос', price: 'от 2 500 ₽' },
  ],
  NAILS: [
    { name: 'Комбинированный маникюр', price: 'от 1 000 ₽' },
    { name: 'Укрепление гелем / базой', price: 'от 1 500 ₽' },
    { name: 'Снятие покрытия', price: '300 ₽' },
    { name: 'Ремонт одного ногтя', price: '150 ₽' },
  ],
  BROWS: [
    { name: 'Коррекция бровей', price: '600 ₽' },
    { name: 'Окрашивание бровей', price: '600 ₽' },
    { name: 'Ламинирование бровей', price: '1 200 ₽' },
    { name: 'Комплекс бровей', price: '2 000 ₽' },
  ],
  SPA: [
    { name: 'SPA процедуры для волос', price: 'от 2 000 ₽' },
  ]
};

const MASTERS = ['Светлана (Топ-стилист)', 'Анна (Маникюр)', 'Виолетта (Брови)', 'Помогите выбрать'];

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

function BookingModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [status, setStatus] = useState('');
  const [phone, setPhone] = useState('+7 ');

  if (!isOpen) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Ensure it always starts with +7
    if (!val.startsWith('+7')) {
      if (val.startsWith('8')) {
        val = '+7 ' + val.slice(1);
      } else if (val.startsWith('7')) {
        val = '+7 ' + val.slice(1);
      } else {
        val = '+7 ' + val.replace(/\+7/g, '');
      }
    }
    setPhone(val);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Отправка...');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setStatus('Заявка успешно отправлена!');
        setTimeout(() => {
          onClose();
          setStatus('');
          setPhone('+7 ');
        }, 2000);
      } else {
        setStatus('Ошибка отправки.');
      }
    } catch {
      setStatus('Ошибка сети.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4 transition-opacity duration-300">
      <div className="bg-white/95 backdrop-blur-md w-full max-w-[420px] rounded-t-[40px] md:rounded-[40px] p-8 pb-12 md:pb-8 shadow-2xl relative animate-slide-up md:animate-fade-in border border-white/50">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-gray-100/80 text-gray-500 rounded-full hover:bg-gray-200 transition-colors text-lg pb-0.5"
        >
          &times;
        </button>
        
        <div className="text-center mb-8">
          <h3 className="font-serif text-3xl text-[#2c2c2c] mb-2">Онлайн запись</h3>
          <p className="text-xs text-gray-500 uppercase tracking-widest">Оставьте заявку</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input type="text" name="name" placeholder="Ваше имя" required className="w-full bg-[#f8f6f5] border-0 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#a8a39d]/50 transition-all text-[#2c2c2c] placeholder:text-gray-400"/>
          </div>
          <div className="relative">
            <input type="tel" name="phone" value={phone} onChange={handlePhoneChange} placeholder="Телефон (+7...)" required className="w-full bg-[#f8f6f5] border-0 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#a8a39d]/50 transition-all text-[#2c2c2c] placeholder:text-gray-400"/>
          </div>
          
          <div className="relative">
            <select name="service" required className="w-full bg-[#f8f6f5] border-0 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#a8a39d]/50 transition-all text-[#2c2c2c] appearance-none cursor-pointer">
              <option value="" disabled selected hidden>Выберите услугу</option>
              {Object.values(SERVICES).flat().map(s => (
                <option key={s.name} value={s.name}>{s.name} — {s.price}</option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
          </div>

          <div className="relative">
            <select name="master" required className="w-full bg-[#f8f6f5] border-0 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#a8a39d]/50 transition-all text-[#2c2c2c] appearance-none cursor-pointer">
              <option value="" disabled selected hidden>Выберите мастера</option>
              {MASTERS.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
          </div>

          <textarea name="comment" placeholder="Комментарий / Пожелания (необязательно)" className="w-full bg-[#f8f6f5] border-0 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#a8a39d]/50 transition-all text-[#2c2c2c] placeholder:text-gray-400 resize-none h-24"></textarea>

          <button type="submit" className="w-full bg-[#333333] text-[#ebdcd4] py-4 rounded-full font-bold tracking-widest text-xs uppercase hover:bg-black transition-colors shadow-lg mt-2">
            {status || 'ОТПРАВИТЬ ЗАЯВКУ'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<'HAIR' | 'NAILS' | 'BROWS' | 'SPA'>('HAIR');
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <main className="w-full max-w-[420px] mx-auto bg-[#ebdcd4] min-h-screen md:min-h-[90vh] md:h-[90vh] md:rounded-[45px] relative shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-y-auto overflow-x-hidden md:border-[12px] md:border-[#0a0a0a] hide-scrollbar pb-12 z-10">
      <BookingModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      
      {/* Hero Section */}
      <section className="bg-[#333333] text-[#ebdcd4] pt-16 pb-12 px-6 flex flex-col items-center relative z-10 curved-bottom shadow-lg">
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="w-12 h-16 border border-[#ebdcd4] rounded-full mb-3 flex items-center justify-center">
            <span className="font-serif italic text-2xl">S</span>
          </div>
          <h1 className="font-serif text-2xl tracking-[0.2em] mb-1">SVETLANA</h1>
          <p className="text-[10px] tracking-widest uppercase opacity-80">beauty salon</p>
        </div>

        <div className="w-full flex flex-col gap-4 mb-4">
          <button onClick={() => setModalOpen(true)} className="pill-btn hover:bg-white transition-colors">ОНЛАЙН ЗАПИСЬ</button>
          <a href="#services" className="pill-btn hover:bg-white transition-colors">УСЛУГИ</a>
          <Link href="/portfolio" className="pill-btn hover:bg-white transition-colors">ФОТО РАБОТ</Link>
          <a href="#contacts" className="pill-btn hover:bg-white transition-colors">АДРЕС</a>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="pt-16 pb-12 px-6 text-center">
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
      </section>

      {/* Why Us Section */}
      <section className="bg-[#a8a39d] text-white py-12 px-6 relative rounded-t-3xl">
        <h2 className="font-serif text-3xl mb-2 text-center text-[#2c2c2c]">Почему мы?</h2>
        <p className="text-center text-sm mb-10 text-[#2c2c2c]">Красота без случайностей</p>

        <div className="flex flex-col gap-6 mb-12">
          {[
            { title: 'Консультация перед процедурой', desc: 'Честные рекомендации по уходу и подбору образа.' },
            { title: 'Стерильность и аккуратность', desc: 'Премиальные материалы и строгие нормы дезинфекции.' },
            { title: 'Без суеты и ожиданий', desc: 'Удобная онлайн-запись, где администратор всё подтверждает лично.' },
            { title: 'Сервис высшего класса', desc: 'Чай, кофе и забота в каждой детали визита.' }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="min-w-[40px] h-[40px] bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl">✨</span>
              </div>
              <div>
                <h3 className="font-bold text-[#2c2c2c] text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-[#2c2c2c]/80 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-full max-w-[300px] mx-auto border border-white/20">
          <img src="/ui/svetlana-salon-hero.webp" alt="Светлана" className="w-16 h-16 rounded-full object-cover shrink-0" />
          <div>
            <h4 className="font-serif text-lg leading-none mb-1 text-[#2c2c2c]">Светлана</h4>
            <p className="text-[10px] uppercase tracking-wider text-[#2c2c2c]">Топ-стилист / основатель</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-[#ebdcd4] py-12 px-6">
        <h2 className="font-serif text-3xl mb-8 text-center uppercase tracking-widest">Услуги</h2>
        
        {/* Main Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button onClick={() => setActiveCategory('HAIR')} className={`py-2 px-6 rounded-full text-xs font-bold tracking-wider transition-colors ${activeCategory === 'HAIR' ? 'bg-[#333333] text-white shadow-md' : 'text-[#a8a39d]'}`}>ВОЛОСЫ</button>
          <button onClick={() => setActiveCategory('NAILS')} className={`py-2 px-6 rounded-full text-xs font-bold tracking-wider transition-colors ${activeCategory === 'NAILS' ? 'bg-[#333333] text-white shadow-md' : 'text-[#a8a39d]'}`}>МАНИКЮР</button>
          <button onClick={() => setActiveCategory('BROWS')} className={`py-2 px-6 rounded-full text-xs font-bold tracking-wider transition-colors ${activeCategory === 'BROWS' ? 'bg-[#333333] text-white shadow-md' : 'text-[#a8a39d]'}`}>БРОВИ</button>
          <button onClick={() => setActiveCategory('SPA')} className={`py-2 px-6 rounded-full text-xs font-bold tracking-wider transition-colors ${activeCategory === 'SPA' ? 'bg-[#333333] text-white shadow-md' : 'text-[#a8a39d]'}`}>SPA</button>
        </div>

        {/* Price List */}
        <div className="flex flex-col gap-5 mb-10 text-sm font-medium">
          {SERVICES[activeCategory].map((service, idx) => (
            <div key={idx} className="flex justify-between items-end">
              <span className="max-w-[70%] font-bold">{service.name}</span>
              <div className="border-b-2 border-dotted border-[#a8a39d]/50 flex-grow mx-2 mb-1"></div>
              <span>{service.price}</span>
            </div>
          ))}
        </div>

        <button onClick={() => setModalOpen(true)} className="w-full max-w-[280px] bg-[#ebdcd4] border-2 border-[#a8a39d] text-[#2c2c2c] font-bold text-sm tracking-wider uppercase py-4 px-6 rounded-full mx-auto block hover:bg-[#a8a39d] hover:text-white transition-colors">
          ЗАПИСАТЬСЯ
        </button>
      </section>

      {/* Recommendations Section */}
      <section className="bg-[#ebdcd4] pt-8 pb-12 px-6">
        <h2 className="font-serif text-2xl mb-8 text-center leading-tight">Рекомендации<br/>до и после</h2>
        
        <h3 className="font-bold text-lg mb-4 text-[#a8a39d]">Окрашивание волос</h3>
        <Accordion title="ПЕРЕД ОКРАШИВАНИЕМ">Не мойте голову в день окрашивания. Если есть аллергия, сообщите мастеру заранее.</Accordion>
        <Accordion title="ПОСЛЕ ОКРАШИВАНИЕМ">Используйте шампуни для окрашенных волос без сульфатов. Избегайте горячих укладок в первые дни.</Accordion>

        <h3 className="font-bold text-lg mt-8 mb-4 text-[#a8a39d]">Маникюр</h3>
        <Accordion title="МЕЖДУ ПРОЦЕДУРАМИ">Увлажняйте кутикулу маслом каждый день. При отслойке не снимайте покрытие самостоятельно.</Accordion>
      </section>

      {/* Photo Gallery & Reviews */}
      <section id="gallery" className="bg-white py-12 px-6 rounded-t-3xl text-center">
        <h2 className="font-serif text-3xl mb-6">Портфолио</h2>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-100 rounded-xl overflow-hidden aspect-[4/5] shadow-sm relative">
            <img src="/portfolio/hair/hair6.JPG" alt="Волосы" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="bg-gray-100 rounded-xl overflow-hidden aspect-[4/5] shadow-sm relative">
            <img src="/portfolio/manicure/manicure1.png" alt="Маникюр" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
        
        <Link href="/portfolio" className="inline-block border border-[#2c2c2c] text-[#2c2c2c] rounded-full py-3 px-8 text-sm font-bold uppercase tracking-wider hover:bg-[#2c2c2c] hover:text-white transition-colors">
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
      </section>

      {/* FAQ */}
      <section className="bg-[#ebdcd4] py-12 px-6">
        <h2 className="font-serif text-2xl mb-8 text-center font-bold">Остались вопросы?</h2>
        <div className="flex flex-col gap-2">
          <Accordion title="МОЖНО ЛИ ОПЛАТИТЬ ПО СБП?">Да, мы принимаем оплату наличными, по карте и через СБП.</Accordion>
          <Accordion title="ПОМОЖЕТЕ ЛИ ВЫ ВЫБРАТЬ СТРИЖКУ?">Конечно! Все наши мастера консультируют перед процедурой и помогают подобрать идеальный образ под ваши черты лица.</Accordion>
          <Accordion title="ЕСТЬ ЛИ У ВАС ПАРКОВКА?">Да, рядом с салоном есть бесплатная общественная парковка.</Accordion>
        </div>
      </section>

      {/* Contacts & Footer */}
      <section id="contacts" className="bg-[#2c2c2c] py-16 px-6 text-center relative rounded-t-[40px] text-[#ebdcd4] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <h2 className="font-serif text-4xl mb-8">Контакты</h2>
        
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-[#a8a39d] mb-2">Адрес</p>
          <p className="font-medium text-lg leading-snug">г. Геленджик<br/>ул. Одесская 3А, корп. 10</p>
        </div>
        
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-[#a8a39d] mb-2">Телефон</p>
          <p className="font-serif text-3xl tracking-wide">+7 (928) 280-62-94</p>
        </div>
        
        <div className="flex justify-center gap-4 mb-12">
          <a href="https://t.me/SvetSalonPro" target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#ebdcd4] text-[#2c2c2c] rounded-full flex items-center justify-center hover:bg-white hover:scale-105 transition-all shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.92 9.06c-.15.65-.53.81-1.07.51l-2.97-2.18-1.43 1.38c-.16.16-.29.29-.6.29l.21-3.03 5.52-4.98c.24-.22-.05-.34-.37-.12l-6.82 4.29-2.93-.91c-.64-.2-.65-.64.13-.94l11.45-4.41c.53-.2.99.12.8.95z"/></svg>
          </a>
          <a href="https://wa.me/79282806294" target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#ebdcd4] text-[#2c2c2c] rounded-full flex items-center justify-center hover:bg-white hover:scale-105 transition-all shadow-lg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.01 0C5.38 0 0 5.38 0 12c0 2.12.55 4.11 1.52 5.86L.18 23.54l5.83-1.53c1.7.92 3.65 1.44 5.71 1.44 6.61 0 11.99-5.38 11.99-12S18.62 0 12.01 0zm0 21.46c-1.8 0-3.51-.48-5.02-1.38l-3.56.93.95-3.47A9.97 9.97 0 012.03 12C2.03 6.49 6.51 2.01 12.01 2.01c5.5 0 9.98 4.48 9.98 9.99 0 5.51-4.48 9.99-9.98 9.99zm5.56-7.39c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-2.22-1.12-3.8-2.52-4.63-4.48-.13-.3.13-.28.43-.88.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.23-.25-.6-.5-.53-.68-.53-.18 0-.38-.03-.58-.03-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.1 3.2 5.1 4.5.7.3 1.25.48 1.68.6.7.2 1.35.18 1.85.1.58-.1 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35z"/></svg>
          </a>
        </div>
        
        {/* Real Yandex Map Frame */}
        <div className="w-full h-[250px] bg-white rounded-3xl overflow-hidden relative shadow-lg">
          <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A3b140df3f9b2b3a1a1f0a1f0a1f0a1f0a1f0a1f0a1f0a1f0a1f0a1f0a1f0a1f0&amp;source=constructor&amp;ll=38.077222%2C44.561111&amp;z=16" width="100%" height="100%" frameBorder="0" className="absolute inset-0"></iframe>
          
          {/* Overlay to prevent accidental scrolling inside map when scrolling the page */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]"></div>
        </div>

        <div className="mt-12 text-[10px] text-[#ebdcd4]/50 tracking-widest uppercase">
          © 2026 Svetlana Beauty Salon
        </div>
      </section>

    </main>
  );
}
