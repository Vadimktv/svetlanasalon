import { NextResponse } from 'next/server';
import { salonApi } from '@/lib/salon-api';

export async function GET() {
  const response = await salonApi('/catalog');
  return NextResponse.json(await response.json(), { status: response.status });
}
