import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { readSession, salonApi } from '@/lib/salon-api';

async function session() { return readSession((await cookies()).get('svet_salon_session')?.value); }

export async function GET() {
  const current = await session();
  if (!current) return NextResponse.json({ success: false, error: 'Войдите через Telegram' }, { status: 401 });
  const response = await salonApi(`/appointments?user_id=${current.id}`);
  return NextResponse.json(await response.json(), { status: response.status });
}

export async function POST(request: NextRequest) {
  const current = await session();
  if (!current) return NextResponse.json({ success: false, error: 'Войдите через Telegram' }, { status: 401 });
  const { appointment_id } = await request.json();
  const response = await salonApi(`/appointments/${appointment_id}/cancel`, { method: 'POST', body: JSON.stringify({ user_id: current.id }) });
  return NextResponse.json(await response.json(), { status: response.status });
}
