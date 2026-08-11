import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { readSession, salonApi } from '@/lib/salon-api';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, master_id, service_id, date, time, idempotency_key } = body;

    if (!name || !phone || !master_id || !service_id || !date || !time || !idempotency_key) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const current = readSession((await cookies()).get('svet_salon_session')?.value);
    const response = await salonApi('/bookings', {
      method: 'POST',
      body: JSON.stringify({ name, phone, master_id, service_id, date, time, idempotency_key, telegram_user: current || undefined }),
    });
    return NextResponse.json(await response.json(), { status: response.status });

  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
