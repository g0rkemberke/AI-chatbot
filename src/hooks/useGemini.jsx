import { useState } from 'react';

// Güvenli yöntem: Şifreyi .env dosyasından çekiyoruz
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  console.error(
    '⚠️ VITE_GEMINI_API_KEY bulunamadı! .env dosyasını kontrol edin.'
  );
}
export const useGemini = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const askGemini = async (prompt) => {
    setLoading(true);
    setError(null);
    setResponse('');

    try {
      if (!API_KEY || !API_KEY.startsWith('AIza')) {
        throw new Error('API Key eksik veya hatalı girilmiş!');
      }

      console.log('Model listesi çekiliyor...');
      const listResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
      );

      const listData = await listResponse.json();

      if (!listData.models) {
        throw new Error("Model listesi alınamadı. API Key'ini kontrol et.");
      }

      const validModel = listData.models.find(
        (model) =>
          model.supportedGenerationMethods &&
          model.supportedGenerationMethods.includes('generateContent') &&
          model.name.includes('gemini') // Sadece Gemini modellerini al
      );

      if (!validModel) {
        throw new Error('Uygun bir model bulunamadı!');
      }

      console.log(' Seçilen Model:', validModel.name); // Konsola hangi modeli seçtiğini yazar

      // ADIM 3: O modeli kullanarak soruyu sor
      const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${validModel.name}:generateContent?key=${API_KEY}`;

      const genResponse = await fetch(generateUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!genResponse.ok) {
        throw new Error(`Google Hata Kodu: ${genResponse.status}`);
      }

      const genData = await genResponse.json();
      const answer = genData.candidates[0].content.parts[0].text;

      setResponse(answer);
    } catch (err) {
      console.error('Hata:', err);
      setError('Hata: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return { askGemini, response, loading, error };
};
