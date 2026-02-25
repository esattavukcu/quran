import { NextResponse } from 'next/server';
import { getAnthropicClient } from '@/lib/api/anthropic';

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Anthropic API key not configured' }, { status: 500 });
  }

  try {
    const { surahNumber, surahName, verseStart, verseEnd, verseText } = await request.json();

    const anthropic = getAnthropicClient();

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: `Sen Esbab-ı Nüzul (Kuran ayetlerinin iniş sebepleri) konusunda uzman bir İslam alimisin. Verilen ayetler hakkında şu bilgileri Türkçe olarak ver:

1. **Ne Zaman**: Bu ayetler ne zaman indi (Mekki/Medeni dönem, yaklaşık yıl)
2. **Neden**: Hangi olay veya durum bu ayetlerin inmesine sebep oldu
3. **Tarihsel Bağlam**: O dönemdeki sosyal ve siyasi ortam
4. **Kimler**: Varsa ilgili kişiler veya gruplar
5. **Kaynak**: Bu bilgilerin dayandığı klasik kaynaklar (Vahidi, Suyuti vb.)

Yanıtını 250 kelimeyi geçmeyecek şekilde kısa ve öz tut. Bilimsel ve nesnel ol.`,
      messages: [
        {
          role: 'user',
          content: `Sure: ${surahName} (${surahNumber}. sure)
Ayet: ${verseStart}${verseEnd !== verseStart ? `-${verseEnd}` : ''}
Ayet metni: "${verseText}"`,
        },
      ],
    });

    const content = message.content[0]?.type === 'text' ? message.content[0].text : '';

    return NextResponse.json({ nuzul: content });
  } catch (error) {
    console.error('Nuzul API error:', error);
    return NextResponse.json({ error: 'Failed to generate nuzul context' }, { status: 500 });
  }
}
