import { NextResponse } from 'next/server';
import { getAnthropicClient } from '@/lib/api/anthropic';

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Anthropic API key not configured' }, { status: 500 });
  }

  try {
    const { word, transliteration, verseText, surahNumber, verseNumber } = await request.json();

    const anthropic = getAnthropicClient();

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      system: `Sen Kuran Arapçası konusunda uzman bir dilbilimcisin. Verilen kelime hakkında şu bilgileri Türkçe olarak ver:

1. **Arapça Kök**: 3 veya 4 harfli kök
2. **Kök Anlamı**: Kökün temel anlamı
3. **Kelime Kalıbı**: Bu kelimenin morfolojik kalıbı ve kök anlamını nasıl değiştirdiği
4. **Kuran'daki Kullanımlar**: Aynı kökten gelen diğer Kurani kelimeler (2-3 örnek)
5. **Etimolojik Bağlam**: İslam öncesi kullanımı ve anlam evrimi

Yanıtını 200 kelimeyi geçmeyecek şekilde kısa ve öz tut.`,
      messages: [
        {
          role: 'user',
          content: `Kelime: "${transliteration}" (${word})
Sure ${surahNumber}, Ayet ${verseNumber}
Ayet: "${verseText}"`,
        },
      ],
    });

    const content = message.content[0]?.type === 'text' ? message.content[0].text : '';

    return NextResponse.json({ etymology: content });
  } catch (error) {
    console.error('Etymology API error:', error);
    return NextResponse.json({ error: 'Failed to generate etymology' }, { status: 500 });
  }
}
