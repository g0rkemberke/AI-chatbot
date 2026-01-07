import { useState } from 'react';
import './App.css';


import { Chatbot } from './components/Chatbot';
import User from './components/User';


import { useGemini } from './hooks/useGemini';

function App() {
  // Input alanındaki anlık yazı
  const [userInput, setUserInput] = useState('');

  // Kullanıcı "Gönder"e basınca sorusunu ekranda tutmak için
  const [lastQuestion, setLastQuestion] = useState(null);

  
  const { askGemini, response, loading, error } = useGemini();

  const handleChat = (event) => {
    event.preventDefault();

    // Boşsa gönderme
    if (!userInput.trim()) return;

    // 1. Soruyu ekrana sabitle
    setLastQuestion(userInput);

    // 2. Gemini'ye soruyu gönder
    askGemini(userInput);

    // 3. Input kutusunu temizle
    setUserInput('');
  };

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-200">
      <div className=" bottom-[calc(4rem+1.5rem)] right-0 m-auto bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]">
        {/* Başlık (Header) */}
        <div className="flex flex-col space-y-1.5 pb-6">
          <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
          <p className="text-sm text-[#6b7280] leading-3">
            Powered by Gemini AI
          </p>
        </div>

        {/* Mesajlaşma Alanı (Chat Container) */}
        <div
          className="pr-4 h-[474px]"
          style={{ minWidth: '100%', display: 'table' }}
        >
          <div className="max-h-[454px] overflow-auto">
            {/* Kullanıcının Mesajı (Varsa Göster) */}
            {lastQuestion && <User text={lastQuestion} />}

            {/* AI Cevapları */}
            {loading && <Chatbot text="Yazıyor..." />}

            {error && <Chatbot text={'Hata: ' + error} />}

            {/* Cevap geldiyse ve yükleme bittiyse göster */}
            {!loading && response && <Chatbot text={response} />}

            {/* Hiçbir şey yoksa (Açılış ekranı) */}
            {!lastQuestion && !loading && !response && (
              <div className="text-center text-gray-400 mt-20 text-sm">
                Merhaba! Bugün sana nasıl yardım edebilirim?
              </div>
            )}
          </div>
        </div>

        {/* Giriş Alanı (Input Box) */}
        <div className="flex items-center pt-0">
          <form className="flex items-center justify-center w-full space-x-2">
            <input
              className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
              placeholder="Message Gemini"
              value={userInput}
              onChange={handleChange}
              disabled={loading} // Yüklenirken yazmayı engelle
            />
            <button
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] h-10 px-4 py-2 ${
                loading ? 'bg-gray-400' : 'bg-black hover:bg-[#111827E6]'
              }`}
              onClick={handleChat}
              disabled={loading} // Yüklenirken butonu kilitle
            >
              {loading ? '...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
