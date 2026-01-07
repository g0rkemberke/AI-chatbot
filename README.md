# GÜN PROJESI:

[ ] Gemini API key oluştur
[ ] API'yi uygulamaya ekle
[ ] Markdown'ları düzgün göster
[ ] key'i env variables'a al
[ ] API isteğini custom hook olarak yaz??? (useGemini)
 🤖 Gemini AI - React Chat Integration
Bu proje, Google'ın Gemini AI modelini kullanarak geliştirilmiş, modern bir yapay zeka sohbet arayüzüdür. Proje geliştirilirken temiz kod (clean code) prensipleri, modülerlik ve güvenlik ön planda tutulmuştur.

🌟 Öne Çıkan Özellikler
Custom Hook Mimarisi: API mantığı useGemini hook'u içerisinde soyutlanarak bileşenlerin (component) sadece UI'a odaklanması sağlandı.

Markdown Rendering: Gemini'den gelen teknik yanıtlar ve kod blokları, kullanıcıya düzgün formatlanmış bir şekilde sunulur.

Güvenlik (Environment Variables): API anahtarları .env dosyası ile korunarak istemci tarafında güvenli bir şekilde yönetilir.

Hata Yönetimi: API istekleri sırasında oluşabilecek kesintiler veya hatalar için kullanıcı dostu uyarılar eklenmiştir.

🛠️ Kullanılan Teknolojiler
Frontend: React.js

AI Model: Google Gemini API

Markdown: react-markdown (veya kullandığın kütüphane)

Styling: CSS Modules / Tailwind CSS

Environment: Vite / Create React App
