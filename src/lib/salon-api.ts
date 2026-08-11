import { createHmac, timingSafeEqual } from 'crypto';

const baseUrl = process.env.SALON_BOOKING_API_URL || 'https://vadim-ai.ru/salon-booking/v1';

function apiKey() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error('Booking integration is not configured');
  return createHmac('sha256', token).update('svet-salon-booking-api-v1').digest('hex');
}

export async function salonApi(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  headers.set('X-Salon-API-Key', apiKey());
  headers.set('Content-Type', 'application/json');
  return fetch(`${baseUrl}${path}`, { ...init, headers, cache: 'no-store' });
}

export type TelegramSession = { id: number; first_name: string; username?: string };

export function signSession(session: TelegramSession) {
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url');
  const signature = createHmac('sha256', apiKey()).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function readSession(value?: string): TelegramSession | null {
  if (!value) return null;
  const [payload, signature] = value.split('.');
  if (!payload || !signature) return null;
  const expected = createHmac('sha256', apiKey()).update(payload).digest('base64url');
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try { return JSON.parse(Buffer.from(payload, 'base64url').toString()) as TelegramSession; } catch { return null; }
}
