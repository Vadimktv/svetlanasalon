import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { readSession, salonApi } from '@/lib/salon-api';

async function current() { return readSession((await cookies()).get('svet_salon_session')?.value); }

export async function GET() {
  const user = await current();
  if (!user) return NextResponse.json({ success: false, error: 'Войдите через Telegram' }, { status: 401 });
  const response = await salonApi(`/bonuses?user_id=${user.id}`);
  return NextResponse.json(await response.json(), { status: response.status });
}

export async function POST(request: Request) {
  const user = await current();
  if (!user) return NextResponse.json({ success: false, error: 'Войдите через Telegram' }, { status: 401 });
  const response = await salonApi('/bonuses/reserve', { method: 'POST', body: JSON.stringify({ ...(await request.json()), user_id: user.id }) });
  return NextResponse.json(await response.json(), { status: response.status });
}
