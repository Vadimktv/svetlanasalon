'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

type Master = { id: number; name: string; specialization?: string };
type Service = { id: number; name: string; category: string; price: number };
type Appointment = { id: number; appointment_date: string; appointment_time: string; status: string; master_name: string; service_name: string };

declare global { interface Window { Telegram?: { WebApp?: { initData: string; ready: () => void; expand: () => void } } } }

export default function BookingPage() {
  const [masters, setMasters] = useState<Master[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [masterId, setMasterId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState<string[]>([]);
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('');
  const [userName, setUserName] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const selectedMaster = masters.find((master) => String(master.id) === masterId);
  const selectedService = services.find((service) => String(service.id) === serviceId);
  const availableServices = useMemo(() => services.filter((service) => {
    if (!selectedMaster) return true;
    if (selectedMaster.name.includes('Светлана')) return service.category === 'hair';
    if (selectedMaster.name.includes('Анна')) return service.category === 'manicure';
    if (selectedMaster.name.includes('Виолетта')) return service.category === 'eyebrows';
    return true;
  }), [services, selectedMaster]);

  async function loadAppointments() {
    const response = await fetch('/api/salon/appointments');
    if (response.ok) setAppointments((await response.json()).appointments || []);
  }

  useEffect(() => {
    fetch('/api/salon/catalog').then((response) => response.json()).then((data) => {
      setMasters(data.masters || []); setServices(data.services || []);
    }).catch(() => setStatus('Не удалось загрузить расписание.'));
    const webApp = window.Telegram?.WebApp;
    if (webApp) {
      webApp.ready(); webApp.expand();
      if (webApp.initData) {
        fetch('/api/salon/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ init_data: webApp.initData }) })
          .then((response) => response.ok ? response.json() : null)
          .then((data) => { if (data?.user) { setUserName(data.user.first_name); loadAppointments(); } });
      }
    }
  }, []);

  useEffect(() => {
    setTime(''); setSlots([]);
    if (!masterId || !date) return;
    fetch(`/api/salon/availability?master_id=${masterId}&date=${date}`).then((response) => response.json())
      .then((data) => setSlots(data.slots || [])).catch(() => setStatus('Не удалось получить свободные окошки.'));
  }, [masterId, date]);

  useEffect(() => { if (selectedService && !availableServices.some((service) => service.id === selectedService.id)) setServiceId(''); }, [availableServices, selectedService]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!time) return setStatus('Выберите свободное время.');
    setStatus('Создаём запись…');
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const response = await fetch('/api/booking', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, master_id: Number(masterId), service_id: Number(serviceId), date, time, idempotency_key: crypto.randomUUID() }),
    });
    const result = await response.json();
    if (!response.ok || !result.success) return setStatus(result.error || 'Не удалось создать запись.');
    setStatus('Готово! Запись принята и ожидает подтверждения.');
    form.reset(); setServiceId(''); setTime('');
    if (userName) loadAppointments();
    if (masterId && date) fetch(`/api/salon/availability?master_id=${masterId}&date=${date}`).then((res) => res.json()).then((data) => setSlots(data.slots || []));
  }

  async function cancel(appointmentId: number) {
    const response = await fetch('/api/salon/appointments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ appointment_id: appointmentId }) });
    if (response.ok) { await loadAppointments(); setStatus('Запись отменена. Можно выбрать другое время.'); }
  }

  return <main className="min-h-screen bg-[#f7f1e8] text-[#29211c] px-4 py-5 sm:py-8"><div className="mx-auto max-w-[520px]">
    <header className="rounded-[2rem] bg-[#29211c] text-[#f7f1e8] p-7 sm:p-9 relative overflow-hidden shadow-xl"><div className="absolute inset-0 luxury-grid opacity-25" /><div className="relative flex items-center gap-4"><img src="/logo.png" alt="Svetlana Salon" className="h-14 w-14 rounded-full object-cover border border-[#dfcaa4]/50" /><div><p className="text-[10px] uppercase tracking-[.2em] text-[#dfcaa4]">Svetlana Salon</p><h1 className="font-serif text-3xl">Запись на красоту</h1></div></div><p className="relative mt-6 text-sm leading-relaxed text-[#f7f1e8]/75">Выберите мастера, услугу и свободное время. Окно бронируется сразу.</p></header>
    {userName && <section className="mt-4 rounded-[2rem] border border-[#dfcaa4]/35 bg-[#fffdf9] p-5"><p className="font-serif text-xl">Здравствуйте, {userName}</p><p className="mt-1 text-sm text-[#7d6447]">Ваши записи из Telegram</p>{appointments.length ? <div className="mt-3 space-y-2">{appointments.map((item) => <div key={item.id} className="rounded-xl bg-[#f8f3eb] p-3 text-sm"><b>{item.appointment_date} · {item.appointment_time}</b><br />{item.master_name} · {item.service_name}<button type="button" onClick={() => cancel(item.id)} className="mt-2 block text-xs font-bold text-red-700">Отменить</button></div>)}</div> : <p className="mt-3 text-sm text-[#7d6447]">Активных записей пока нет.</p>}</section>}
    <form onSubmit={submit} className="mt-4 rounded-[2rem] bg-[#fffdf9] p-6 sm:p-8 shadow-[0_15px_45px_rgba(69,45,22,.1)] border border-[#dfcaa4]/35 space-y-4">
      <Field label="Ваше имя"><input name="name" required defaultValue={userName} placeholder="Как к вам обращаться" /></Field><Field label="Телефон"><input name="phone" type="tel" required placeholder="+7 928 000-00-00" /></Field>
      <Field label="Мастер"><select required value={masterId} onChange={(event) => setMasterId(event.target.value)}><option value="" disabled>Выберите мастера</option>{masters.map((master) => <option key={master.id} value={master.id}>{master.name}</option>)}</select></Field>
      <Field label="Услуга"><select required value={serviceId} onChange={(event) => setServiceId(event.target.value)}><option value="" disabled>Выберите услугу</option>{availableServices.map((service) => <option key={service.id} value={service.id}>{service.name} — {service.price} ₽</option>)}</select></Field>
      <Field label="Дата"><input required type="date" value={date} min={new Date().toISOString().slice(0, 10)} onChange={(event) => setDate(event.target.value)} /></Field>
      <div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#806641]">Свободное время</p><div className="mt-2 grid grid-cols-3 gap-2">{slots.map((slot) => <button key={slot} type="button" onClick={() => setTime(slot)} className={`rounded-xl px-3 py-3 text-sm font-bold ${time === slot ? 'bg-[#29211c] text-white' : 'bg-[#d7b66c] text-[#29211c]'}`}>{time === slot ? `✓ ${slot}` : slot}</button>)}</div>{masterId && date && !slots.length && <p className="mt-2 text-sm text-[#7d6447]">Нет свободных окошек.</p>}</div>
      <button className="gold-button w-full rounded-2xl py-4 text-xs font-bold uppercase tracking-[.16em] text-white transition-transform hover:-translate-y-0.5">Создать запись</button><p className="min-h-5 text-center text-xs leading-relaxed text-[#7d6447]" aria-live="polite">{status}</p>
    </form><p className="py-5 text-center text-[10px] uppercase tracking-[.15em] text-[#9b8368]">Svetlana Salon · запись онлайн</p>
  </div></main>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block text-[10px] font-bold uppercase tracking-[.15em] text-[#806641]">{label}<span className="mt-2 block [&_input]:w-full [&_select]:w-full [&_input]:rounded-xl [&_select]:rounded-xl [&_input]:border [&_select]:border [&_input]:border-[#e7d8c4] [&_select]:border-[#e7d8c4] [&_input]:bg-[#faf6f0] [&_select]:bg-[#faf6f0] [&_input]:px-4 [&_select]:px-4 [&_input]:py-3.5 [&_select]:py-3.5 [&_input]:text-sm [&_select]:text-sm [&_input]:text-[#29211c] [&_select]:text-[#29211c] [&_input]:outline-none [&_select]:outline-none">{children}</span></label>; }
