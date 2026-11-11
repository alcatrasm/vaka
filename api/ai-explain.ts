import { GoogleGenAI } from '@google/genai';

function getGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { question, options, correctAnswer, explanation, practicalTip, userQuery } =
    req.body || {};
  const defaultReply = `Hafıza Şifresi & Vaka Özeti:\n${practicalTip}\n\nDetaylı Mantık:\n${explanation}\n\nSınavda Nasıl Ayırt Edilir?\nSoru kökünde geçen anahtar ifadeleri doğrudan "${correctAnswer}" seçeneğiyle eşleştirin.`;

  try {
    const ai = getGenAIClient();
    if (!ai) {
      return res.status(200).json({ reply: defaultReply, source: 'smart-engine' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Soru: ${question}
Şıklar: ${JSON.stringify(options)}
Doğru Cevap: ${correctAnswer}
Mevcut Açıklama: ${explanation}
Pratik İpucu: ${practicalTip}
Öğrencinin Sorusu / İsteği: ${
        userQuery ||
        'Bu soruyu sınavda asla unutmamam için bana 1 somut vaka örneği ve 1 akılda kalıcı kodlama (hafıza çivisi) ver.'
      }`,
      config: {
        systemInstruction:
          'Sen Sosyal Hizmet Bölümü Vaka Çalışması ve Görüşme Teknikleri dersinin uzman hocasısın. Öğrenci birkaç saat içinde sınava girecek. Çok kısa, vurucu, akılda kalıcı bir hafıza şifresi ve 2 cümlelik somut bir vaka örneği ile açıkla.',
      },
    });

    return res.status(200).json({
      reply: response.text || defaultReply,
      source: 'gemini',
    });
  } catch (error) {
    console.error('Vercel AI explain fallback:', error);
    return res.status(200).json({
      reply: defaultReply,
      source: 'smart-engine',
    });
  }
}
