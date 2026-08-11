import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, master, service, comment, date, time } = body;

    if (!name || !phone || !master || !service) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatIds = (process.env.TELEGRAM_BOOKING_CHAT_IDS || '').split(',').map((id) => id.trim()).filter(Boolean);
    if (!token || chatIds.length === 0) {
      console.error('Booking notification is not configured');
      return NextResponse.json({ success: false, error: 'Сервис записи временно недоступен.' }, { status: 503 });
    }
    
    const scheduleText = date || time ? `\n🗓 Желаемое время: ${date || 'дата не выбрана'}${time ? `, ${time}` : ''}` : '';
    const commentText = comment ? `\n💬 Комментарий: ${comment}` : '';
    const message = `🆕 Новая запись через сайт SvetlanaSalon!\n\n`
      + `👤 Имя: ${name}\n`
      + `📱 Телефон: ${phone}\n`
      + `👨‍💼 Мастер: ${master}\n`
      + `✨ Услуга: ${service}` + scheduleText
      + commentText;

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const errors: string[] = [];
    let delivered = 0;

    for (const chatId of chatIds) {
      const res = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        errors.push(errorData.description || `HTTP Error ${res.status}`);
      } else {
        delivered += 1;
      }
    }

    if (delivered === 0) {
      return NextResponse.json(
        { success: false, error: errors.join('; ') },
        { status: 502 }
      );
    }

    if (errors.length > 0) {
      // A legacy administrator chat may no longer be available; keep a successful
      // booking from being rejected when it reached another configured recipient.
      console.warn('Booking notification was delivered with partial recipient failures');
    }

    return NextResponse.json({
      success: true,
      message: 'Запись принята. Мы скоро свяжемся с вами.'
    });

  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
