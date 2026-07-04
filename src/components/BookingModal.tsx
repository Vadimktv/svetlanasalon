'use client';

import { useState } from 'react';

export const SERVICES = {
  HAIR: [
    { name: 'Женская стрижка', price: 'от 1 500 ₽' },
    { name: 'Мужская стрижка', price: 'от 1 000 ₽' },
    { name: 'Окрашивание волос', price: 'от 3 500 ₽' },
    { name: 'Колористика / Мелирование', price: 'от 5 000 ₽' },
    { name: 'Ламинирование волос', price: 'от 2 500 ₽' },
    { name: 'SPA процедуры для волос', price: 'от 2 000 ₽' },
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
  ]
};

export const MASTERS = ['Светлана (Топ-стилист)', 'Анна (Маникюр)', 'Виолетта (Брови)', 'Помогите выбрать'];

export function BookingModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [status, setStatus] = useState('');
  const [phone, setPhone] = useState('+7 ');

  if (!isOpen) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+7')) {
      if (val.startsWith('8')) val = '+7 ' + val.slice(1);
      else if (val.startsWith('7')) val = '+7 ' + val.slice(1);
      else val = '+7 ' + val.replace(/\+7/g, '');
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
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4 transition-opacity duration-300">
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
