'use client';

import { useState } from 'react';

export function ReviewModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [status, setStatus] = useState('');
  const [rating, setRating] = useState(5);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Отправка...');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Add rating to data
    data.rating = rating.toString();

    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setStatus('Отзыв успешно отправлен!');
        setTimeout(() => {
          onClose();
          setStatus('');
          setRating(5);
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
          <h3 className="font-serif text-3xl text-[#2c2c2c] mb-2">Оставить отзыв</h3>
          <p className="text-xs text-gray-500 uppercase tracking-widest">Поделитесь впечатлениями</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input type="text" name="name" placeholder="Ваше имя" required className="w-full bg-[#f8f6f5] border-0 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#a8a39d]/50 transition-all text-[#2c2c2c] placeholder:text-gray-400"/>
          </div>
          
          <div className="bg-[#f8f6f5] rounded-2xl px-5 py-4 flex items-center justify-between">
            <span className="text-sm text-gray-400">Ваша оценка:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  type="button" 
                  onClick={() => setRating(star)}
                  className={`text-2xl transition-colors ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <textarea name="review" placeholder="Напишите ваш отзыв здесь..." required className="w-full bg-[#f8f6f5] border-0 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#a8a39d]/50 transition-all text-[#2c2c2c] placeholder:text-gray-400 resize-none h-32"></textarea>

          <button type="submit" className="w-full bg-[#333333] text-[#ebdcd4] py-4 rounded-full font-bold tracking-widest text-xs uppercase hover:bg-black transition-colors shadow-lg mt-2">
            {status || 'ОТПРАВИТЬ ОТЗЫВ'}
          </button>
        </form>
      </div>
    </div>
  );
}
