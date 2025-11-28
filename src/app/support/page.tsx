'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  Mail,
  Clock,
  Zap,
  ChevronDown,
  ChevronUp,
  Send,
  ArrowLeft,
  Headphones
} from 'lucide-react';

export default function SupportPage() {
  const [chatStartTime, setChatStartTime] = useState<number | null>(null);
  const [waitingTimer, setWaitingTimer] = useState<NodeJS.Timeout | null>(null);
  const [messageCount, setMessageCount] = useState(0);
  const [messages, setMessages] = useState([
    { type: 'system', text: 'Üdvözlünk a SzomszédKosár ügyfélszolgálatánál! Kérlek, írd le a problémádat, és munkatársaink hamarosan válaszolnak.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showWaitingMessage, setShowWaitingMessage] = useState(false);
  const [chatDisabled, setChatDisabled] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Hogyan regisztrálhatok őstermelőként?",
      answer: "Regisztráció után a profilodban válaszd az \"Őstermelő\" opciót, és töltsd fel a szükséges dokumentumokat. Ezután korlátlanul használhatod a platform összes funkcióját."
    },
    {
      question: "Mennyibe kerül a push értesítés?",
      answer: "Egy push értesítés 500 Ft-ba kerül, ami célzottan a megadott körzetben (10-30 km) kerül kiküldésre. SimplePay rendszeren keresztül fizethetsz."
    },
    {
      question: "Mit jelent az \"alkalmi eladó\" korlátozás?",
      answer: "Alkalmi eladók havonta maximum 5 hirdetést és 3 push értesítést adhatnak fel. Ez a NAV szabályok betartása végett van így."
    },
    {
      question: "Hogyan működik a fizetés?",
      answer: "A platform ingyenes, csak a push értesítésekért és hírfolyam kiemelésekért kell fizetni. SimplePay rendszeren keresztül bankkártyával vagy átutalással fizethetsz."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const startWaitingTimer = () => {
    if (waitingTimer) return;

    const timer = setTimeout(() => {
      setShowWaitingMessage(true);
      setMessages(prev => [...prev, {
        type: 'system',
        text: 'Minden munkatársunk leterhelt. Kérlek, küldj emailt a support@szomszedkosar.hu címre!'
      }]);
      setChatDisabled(true);
    }, 5 * 60 * 1000); // 5 minutes

    setWaitingTimer(timer);
  };

  const sendMessage = () => {
    if (!inputValue.trim() || chatDisabled) return;

    setMessages(prev => [...prev, { type: 'user', text: inputValue }]);
    setInputValue('');
    setMessageCount(prev => prev + 1);

    // Start timer after first message
    if (messageCount === 0) {
      setChatStartTime(Date.now());
      startWaitingTimer();

      // Simulate thinking
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'system',
          text: 'Köszönjük az üzeneted! Munkatársaink hamarosan válaszolnak...'
        }]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    return () => {
      if (waitingTimer) {
        clearTimeout(waitingTimer);
      }
    };
  }, [waitingTimer]);

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-600">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold text-[#1F2937] flex items-center gap-2">
              <Headphones size={24} className="text-[#1B4332]" />
              Ügyfélszolgálat
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1F2937] mb-3">Miben segíthetünk?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Vedd fel velünk a kapcsolatot chaten, emailben, vagy böngéssz a gyakori kérdések között.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT COLUMN - CHAT */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[600px]">
            <div className="p-4 border-b border-gray-100 bg-[#F9FAFB] flex justify-between items-center">
              <h3 className="font-bold text-[#1F2937] flex items-center gap-2">
                <MessageCircle size={20} className="text-[#1B4332]" />
                Élő Chat
              </h3>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-lg flex items-center gap-1">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                Online
              </span>
            </div>

            {showWaitingMessage && (
              <div className="bg-yellow-50 p-3 text-sm text-yellow-800 text-center border-b border-yellow-100">
                ⏰ Minden munkatársunk leterhelt. Kérlek, küldj emailt a support@szomszedkosar.hu címre!
              </div>
            )}

            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${message.type === 'user'
                      ? 'bg-[#1B4332] text-white rounded-tr-none'
                      : message.type === 'system'
                        ? 'bg-yellow-100 text-yellow-900 border border-yellow-200'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                    }`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={chatDisabled}
                  placeholder={chatDisabled ? "Chat lezárva" : "Írd ide az üzeneted..."}
                  className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all bg-gray-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={chatDisabled}
                  className={`p-3 rounded-xl transition-all flex items-center justify-center ${chatDisabled
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#1B4332] text-white hover:bg-[#2D6A4F] shadow-md'
                    }`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - INFO & FAQ */}
          <div className="space-y-6">

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
                  <Mail size={20} />
                </div>
                <h4 className="font-bold text-[#1F2937] text-sm mb-1">Email</h4>
                <p className="text-xs text-gray-500">support@szomszedkosar.hu</p>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-3">
                  <Zap size={20} />
                </div>
                <h4 className="font-bold text-[#1F2937] text-sm mb-1">Válaszidő</h4>
                <p className="text-xs text-gray-500">24 órán belül</p>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-3">
                  <Clock size={20} />
                </div>
                <h4 className="font-bold text-[#1F2937] text-sm mb-1">Elérhetőség</h4>
                <p className="text-xs text-gray-500">H-P: 9:00-17:00</p>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-[#1F2937] text-lg">Gyakori Kérdések</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {faqItems.map((item, index) => (
                  <div key={index} className="group">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left p-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-bold text-[#1F2937] text-sm pr-4">{item.question}</span>
                      {openFaq === index ? (
                        <ChevronUp size={18} className="text-[#1B4332]" />
                      ) : (
                        <ChevronDown size={18} className="text-gray-400 group-hover:text-[#1B4332]" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-1">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}