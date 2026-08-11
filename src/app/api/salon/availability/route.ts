import { NextRequest, NextResponse } from 'next/server';
import { salonApi } from '@/lib/salon-api';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.toString();
  const response = await salonApi(`/availability?${query}`);
  return NextResponse.json(await response.json(), { status: response.status });
}
