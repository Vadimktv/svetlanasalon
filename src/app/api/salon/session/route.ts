import { NextResponse } from 'next/server';
import { salonApi, signSession } from '@/lib/salon-api';

export async function POST(request: Request) {
  const response = await salonApi('/telegram-auth', { method: 'POST', body: JSON.stringify(await request.json()) });
  const result = await response.json();
  const next = NextResponse.json(result, { status: response.status });
  if (response.ok && result.user) {
    next.cookies.set('svet_salon_session', signSession(result.user), { httpOnly: true, sameSite: 'lax', secure: true, path: '/', maxAge: 60 * 60 });
  }
  return next;
}
