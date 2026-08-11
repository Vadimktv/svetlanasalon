'use client';

import { FormEvent, useEffect, useState } from 'react';
import { MASTERS, SERVICES } from '@/components/BookingModal';

declare global {
  interface Window {
    Telegram?: { WebApp?: { ready: () => void; expand: () => void; close: () => void } };
  }
}

export default function BookingPage() {
  const [status, setStatus] = useState('');
  const [master, setMaster] = useState('');
  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    if (webApp) {
      webApp.ready();
      webApp.expand();
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const requestedMaster = new URLSearchParams(window.location.search).get('master');
      if (requestedMaster && MASTERS.includes(requestedMaster)) setMaster(requestedMaster);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Отправляем заявку…');
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch('/api/booking', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      setStatus('Готово! Администратор подтвердит запись в ближайшее время.');
      event.currentTarget.reset();
    } catch {
      setStatus('Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в Telegram.');
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f1e8] text-[#29211c] px-4 py-5 sm:py-8">
      <div className="mx-auto max-w-[520px]">
        <header className="rounded-[2rem] bg-[#29211c] text-[#f7f1e8] p-7 sm:p-9 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 luxury-grid opacity-25" />
          <div className="relative flex items-center gap-4">
            <img src="/logo.png" alt="Svetlana Salon" className="h-14 w-14 rounded-full object-cover border border-[#dfcaa4]/50" />
            <div><p className="text-[10px] uppercase tracking-[.2em] text-[#dfcaa4]">Svetlana Salon</p><h1 className="font-serif text-3xl">Запись на красоту</h1></div>
          </div>
          <p className="relative mt-6 text-sm leading-relaxed text-[#f7f1e8]/75">Выберите услугу и удобное время. Мы уточним детали и подтвердим визит.</p>
        </header>

        <form onSubmit={submit} className="mt-4 rounded-[2rem] bg-[#fffdf9] p-6 sm:p-8 shadow-[0_15px_45px_rgba(69,45,22,.1)] border border-[#dfcaa4]/35 space-y-4">
          <Field label="Ваше имя"><input name="name" required placeholder="Как к вам обращаться" /></Field>
          <Field label="Телефон"><input name="phone" type="tel" required placeholder="+7 928 000-00-00" /></Field>
          <Field label="Услуга"><select name="service" required defaultValue=""><option value="" disabled>Выберите услугу</option>{Object.values(SERVICES).flat().map((service) => <option key={service.name} value={service.name}>{service.name} — {service.price}</option>)}</select></Field>
          <Field label="Мастер"><select name="master" required value={master} onChange={(event) => setMaster(event.target.value)}><option value="" disabled>Выберите мастера</option>{MASTERS.map((item) => <option key={item}>{item}</option>)}</select></Field>
          <div className="grid grid-cols-2 gap-3"><Field label="Дата"><input name="date" type="date" /></Field><Field label="Время"><input name="time" type="time" /></Field></div>
          <Field label="Комментарий"><textarea name="comment" rows={3} placeholder="Например, хочу после 18:00" /></Field>
          <button className="gold-button w-full rounded-2xl py-4 text-xs font-bold uppercase tracking-[.16em] text-white transition-transform hover:-translate-y-0.5">Отправить заявку</button>
          <p className="min-h-5 text-center text-xs leading-relaxed text-[#7d6447]" aria-live="polite">{status}</p>
        </form>
        <p className="py-5 text-center text-[10px] uppercase tracking-[.15em] text-[#9b8368]">Svetlana Salon · запись онлайн</p>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-[10px] font-bold uppercase tracking-[.15em] text-[#806641]">{label}<span className="mt-2 block [&_input]:w-full [&_select]:w-full [&_textarea]:w-full [&_input]:rounded-xl [&_select]:rounded-xl [&_textarea]:rounded-xl [&_input]:border [&_select]:border [&_textarea]:border [&_input]:border-[#e7d8c4] [&_select]:border-[#e7d8c4] [&_textarea]:border-[#e7d8c4] [&_input]:bg-[#faf6f0] [&_select]:bg-[#faf6f0] [&_textarea]:bg-[#faf6f0] [&_input]:px-4 [&_select]:px-4 [&_textarea]:px-4 [&_input]:py-3.5 [&_select]:py-3.5 [&_textarea]:py-3.5 [&_input]:text-sm [&_select]:text-sm [&_textarea]:text-sm [&_input]:font-normal [&_select]:font-normal [&_textarea]:font-normal [&_input]:text-[#29211c] [&_select]:text-[#29211c] [&_textarea]:text-[#29211c] [&_input]:outline-none [&_select]:outline-none [&_textarea]:outline-none [&_input]:focus:ring-2 [&_select]:focus:ring-2 [&_textarea]:focus:ring-2 [&_input]:focus:ring-[#af8750]/35 [&_select]:focus:ring-[#af8750]/35 [&_textarea]:focus:ring-[#af8750]/35">{children}</span></label>;
}
