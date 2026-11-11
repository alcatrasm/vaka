# VakaSprint — Sosyal Hizmet Görüşme Teknikleri Hızlandırılmış Sınav Kampı

Sosyal Hizmet Vaka Dersi (Görüşme İlke ve Teknikleri) sınavı için 16 sayfalık PDF soru bankasındaki **79 ham sorunun** incelenip **8 mükerrer soru çiftinin** tek soruya indirgenmesiyle oluşturulmuş **71 özgün soruluk** mobil uyumlu interaktif test, özet kamp ve yapay zeka analiz sistemi.

## Vercel Üzerinde Çalıştırma (Adım Adım)

Proje, **Vercel** üzerinde hem ön yüz (Vite + React) hem de arka uç API rotaları (`/api/ai-analysis` ve `/api/ai-explain` Serverless Functions) doğrudan çalışacak şekilde (`vercel.json` ve `/api` klasörü ile) yapılandırılmıştır.

1. **GitHub'a Aktarın:**
   - AI Studio sağ üst menüsündeki **Export to GitHub** (veya **Save to GitHub**) butonuna tıklayarak projeyi kendi GitHub hesabınıza aktarın.
2. **Vercel'e Bağlayın:**
   - [vercel.com/new](https://vercel.com/new) adresine gidin ve oluşturduğunuz GitHub deposunu **Import** edin.
   - Framework Preset otomatik olarak **Vite** (`npm run build` / `dist`) seçilecektir.
3. **Ortam Değişkeni (İsteğe Bağlı):**
   - Yapay zeka analiz motoru, API anahtarı olmasa bile yerleşik kural tabanlı analiz motoruyla (`smart-engine`) **%100 kesintisiz çalışır**.
   - Canlı Gemini 3.8 Flash modeliyle dinamik analiz almak isterseniz Vercel proje ayarlarında **Environment Variables** bölümüne `GEMINI_API_KEY` anahtarınızı ekleyebilirsiniz.
4. **Deploy butonuna basın:** Saniyeler içinde masaüstü ve mobil uyumlu olarak yayına girecektir.
