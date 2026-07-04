'use client';

import { useState } from 'react';

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

  if (!isOpen) return null;

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
        setTimeout(onClose, 2000);
      } else {
        setStatus('Ошибка отправки.');
      }
    } catch {
      setStatus('Ошибка сети.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-[#ebdcd4] w-full max-w-[400px] rounded-3xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl font-bold text-[#2c2c2c]">&times;</button>
        <h3 className="font-serif text-2xl mb-6 text-center">Онлайн Запись</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" name="name" placeholder="Ваше имя" required className="w-full bg-white/50 border border-[#a8a39d] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2c2c2c]"/>
          <input type="tel" name="phone" placeholder="Телефон (+7...)" required className="w-full bg-white/50 border border-[#a8a39d] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2c2c2c]"/>
          
          <select name="service" required className="w-full bg-white/50 border border-[#a8a39d] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2c2c2c]">
            <option value="">Выберите услугу</option>
            {Object.values(SERVICES).flat().map(s => (
              <option key={s.name} value={s.name}>{s.name}</option>
            ))}
          </select>

          <select name="master" required className="w-full bg-white/50 border border-[#a8a39d] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2c2c2c]">
            <option value="">Выберите мастера</option>
            {MASTERS.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <textarea name="comment" placeholder="Комментарий / Пожелания" className="w-full bg-white/50 border border-[#a8a39d] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2c2c2c] resize-none h-20"></textarea>

          <button type="submit" className="pill-btn !bg-[#333333] !text-[#ebdcd4] !mb-0 mt-2 hover:bg-[#2c2c2c] transition-colors">{status || 'ЗАПИСАТЬСЯ'}</button>
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<'HAIR' | 'NAILS' | 'BROWS' | 'SPA'>('HAIR');
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <main className="w-full max-w-[480px] mx-auto bg-[#ebdcd4] min-h-screen relative shadow-2xl overflow-hidden pb-12">
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
          <a href="#gallery" className="pill-btn hover:bg-white transition-colors">ФОТО РАБОТ</a>
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
          <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden shrink-0"></div>
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
      <section id="gallery" className="bg-white py-12 px-6 rounded-t-3xl">
        <h2 className="font-serif text-3xl mb-6 text-center">Фотогалерея</h2>
        
        {/* Before/After Slider Component */}
        <div className="w-full h-[350px] bg-[#a8a39d] rounded-xl relative overflow-hidden flex flex-col items-center justify-center text-white/50 text-xs">
          [ Интерактивный Slider "До / После" ]
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white/30 cursor-ew-resize flex items-center justify-center">
             <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-black">◄►</div>
          </div>
        </div>

        <h2 className="font-serif text-3xl mt-12 mb-6 text-center">Отзывы</h2>
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

      {/* Contacts */}
      <section id="contacts" className="bg-[#a8a39d] py-12 px-6 text-center relative rounded-t-3xl text-[#2c2c2c]">
        <h2 className="font-serif text-3xl mb-8">Контакты</h2>
        
        <p className="font-bold mb-1">Геленджик</p>
        <p className="text-sm mb-6">ул. Одесская 3А, корп. 10</p>
        
        <p className="font-bold text-xl mb-8">+7 (928) 280-62-94</p>
        
        <div className="flex justify-center gap-4 mb-8">
          <a href="https://t.me/SvetSalonPro" target="_blank" rel="noreferrer" className="w-10 h-10 border border-[#2c2c2c] rounded-full flex items-center justify-center hover:bg-[#2c2c2c] hover:text-[#a8a39d] transition-colors">✈️</a>
          <div className="w-10 h-10 border border-[#2c2c2c] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#2c2c2c] hover:text-[#a8a39d] transition-colors">📷</div>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-[200px] bg-gray-300 rounded-xl overflow-hidden relative border border-white/20">
          <div className="absolute inset-0 bg-[#2c2c2c]/10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
            📍 Одесская 3А
          </div>
        </div>
      </section>

    </main>
  );
}
