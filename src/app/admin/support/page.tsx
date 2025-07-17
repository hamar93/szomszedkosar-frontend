'use client';

import { useState } from 'react';

interface Message {
  type: 'user' | 'support' | 'system';
  text: string;
  time: string;
}

interface ChatData {
  name: string;
  info: string;
  avatar: string;
  messages: Message[];
}

export default function AdminSupportPage() {
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const chatData: Record<string, ChatData> = {
    urgent1: {
      name: 'János Kovács',
      info: 'Regisztrált 2024.03.15 • Őstermelő',
      avatar: 'J',
      messages: [
        { type: 'user', text: 'Sziasztok! Fizetni akartam a push értesítésért, de a SimplePay nem működik.', time: '14:32' },
        { type: 'user', text: 'Mindig hibát ír ki amikor a kártyaadatokat beírom.', time: '14:33' },
        { type: 'system', text: 'Várakozási idő: 8 perc', time: '14:33' }
      ]
    },
    normal1: {
      name: 'Mária Nagy',
      info: 'Új felhasználó • Vendég',
      avatar: 'M',
      messages: [
        { type: 'user', text: 'Jó napot! Szeretnék regisztrálni, de nem tudom, hogy őstermelőként vagy magánszemélyként?', time: '14:42' },
        { type: 'system', text: 'Várakozási idő: 3 perc', time: '14:42' }
      ]
    },
    active1: {
      name: 'Anna Szabó',
      info: 'Regisztrált 2024.01.20 • Őstermelő',
      avatar: 'A',
      messages: [
        { type: 'user', text: 'Szia! A push értesítésem kimaradt tegnap este.', time: '14:20' },
        { type: 'support', text: 'Szia Anna! Utánanézek a push értesítésednek. Milyen időpontban lett volna kiszállítva?', time: '14:22' },
        { type: 'user', text: 'Este 7 körül lett volna, az új almáimról.', time: '14:25' },
        { type: 'support', text: 'Látom a rendszerben, hogy valóban volt egy technikai hiba 18:45-19:15 között. Visszatérítjük a 500 Ft-ot.', time: '14:28' },
        { type: 'user', text: 'Köszönöm szépen! Mikor kapom vissza?', time: '14:45' }
      ]
    }
  };

  const openChat = (chatId: string) => {
    setCurrentChat(chatId);
  };

  const insertQuickResponse = (text: string) => {
    setInputValue(text);
  };

  const sendMessage = () => {
    if (!inputValue.trim() || !currentChat) return;

    const newMessage: Message = {
      type: 'support',
      text: inputValue,
      time: new Date().toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })
    };

    // In real app, this would update the backend
    chatData[currentChat].messages.push(newMessage);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const currentChatData = currentChat ? chatData[currentChat] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              🛒
            </div>
            <div className="text-xl font-bold">SzomszédKosár Support</div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 px-4 py-2 bg-black/20 rounded-lg border border-white/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Support Agent - Online</span>
            </div>
            <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm hover:bg-white/20">
              Kijelentkezés
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-5 grid grid-cols-[300px_1fr] gap-5">
        {/* Sidebar */}
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-5 border border-white/10 h-fit sticky top-24">
          <h2 className="text-lg font-semibold mb-5">Dashboard</h2>
          
          {/* Stats */}
          <div className="grid gap-4 mb-6">
            <div className="bg-black/30 rounded-lg p-4 border border-white/10">
              <div className="text-2xl font-bold text-red-400 mb-1">8</div>
              <div className="text-xs text-gray-400 uppercase">Aktív chat</div>
            </div>
            <div className="bg-black/30 rounded-lg p-4 border border-white/10">
              <div className="text-2xl font-bold text-red-400 mb-1">23</div>
              <div className="text-xs text-gray-400 uppercase">Mai megoldott</div>
            </div>
            <div className="bg-black/30 rounded-lg p-4 border border-white/10">
              <div className="text-2xl font-bold text-red-400 mb-1">2:45</div>
              <div className="text-xs text-gray-400 uppercase">Átlag válaszidő</div>
            </div>
          </div>

          {/* Queue */}
          <div className="mb-6">
            <div className="text-sm font-semibold mb-3">Várakozó chattek</div>
            <div 
              className="bg-black/10 rounded-lg p-3 mb-2 border border-red-500/50 bg-red-500/10 cursor-pointer hover:bg-red-500/20"
              onClick={() => openChat('urgent1')}
            >
              <div className="text-sm font-medium mb-1">János - Fizetési probléma</div>
              <div className="text-xs text-gray-400">8 perce vár</div>
            </div>
            <div 
              className="bg-black/10 rounded-lg p-3 mb-2 border border-white/10 cursor-pointer hover:bg-white/10"
              onClick={() => openChat('normal1')}
            >
              <div className="text-sm font-medium mb-1">Mária - Regisztráció</div>
              <div className="text-xs text-gray-400">3 perce vár</div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold mb-3">Aktív chattek</div>
            <div 
              className="bg-black/10 rounded-lg p-3 mb-2 border border-white/10 cursor-pointer hover:bg-white/10"
              onClick={() => openChat('active1')}
            >
              <div className="text-sm font-medium mb-1">Anna - Push értesítés</div>
              <div className="text-xs text-gray-400">Most válaszolt</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-rows-[auto_1fr] gap-5">
          {/* Tabs */}
          <div className="flex gap-1 bg-black/20 backdrop-blur-lg rounded-xl p-1 border border-white/10">
            {['all', 'urgent', 'pending', 'active'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all relative ${
                  activeTab === tab 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'all' && 'Összes chat'}
                {tab === 'urgent' && 'Sürgős'}
                {tab === 'pending' && 'Várakozó'}
                {tab === 'active' && 'Aktív'}
                <span className="absolute top-1 right-2 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5 font-bold">
                  {tab === 'all' ? '13' : tab === 'urgent' ? '1' : tab === 'pending' ? '3' : '2'}
                </span>
              </button>
            ))}
          </div>

          {/* Chat Container */}
          <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 grid grid-rows-[60px_1fr_80px] h-[600px]">
            {currentChatData ? (
              <>
                {/* Chat Header */}
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {currentChatData.avatar}
                    </div>
                    <div>
                      <h3 className="font-medium">{currentChatData.name}</h3>
                      <p className="text-xs text-gray-400">{currentChatData.info}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-xs hover:bg-white/20">
                      📎 Fájl
                    </button>
                    <button className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-xs hover:bg-white/20">
                      📋 Jegyzetek
                    </button>
                    <button className="px-3 py-2 bg-red-500 rounded-lg text-xs hover:bg-red-600">
                      ✕ Bezárás
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-5 overflow-y-auto flex flex-col gap-4">
                  {currentChatData.messages.map((message, index) => (
                    <div key={index} className={`p-3 rounded-xl max-w-xs text-sm ${
                      message.type === 'user' 
                        ? 'bg-white/10 border border-white/20 self-start' 
                        : message.type === 'support'
                        ? 'bg-red-500 self-end'
                        : 'bg-yellow-500/20 border border-yellow-500/30 self-center text-yellow-200 text-center max-w-sm italic'
                    }`}>
                      {message.text}
                      <div className="text-xs opacity-70 mt-1">{message.time}</div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="p-5 border-t border-white/10">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {['Köszönöm a megkeresést!', 'Egy pillanat, utánanézek...', 'További kérdésed van?', 'Megoldódott a problémád?'].map((text) => (
                      <button
                        key={text}
                        onClick={() => insertQuickResponse(text)}
                        className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs text-gray-400 hover:bg-red-500 hover:text-white hover:border-red-500"
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 p-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                      placeholder="Írd ide a válaszodat..."
                      rows={2}
                    />
                    <button
                      onClick={sendMessage}
                      className="px-5 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
                    >
                      Küldés
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-gray-400">
                <div className="text-5xl mb-4 opacity-50">💬</div>
                <h3 className="text-lg font-medium mb-2">Válassz egy chatet a bal oldalról</h3>
                <p className="text-sm">A várakozó chattek listájából válaszd ki, melyikkel szeretnél foglalkozni.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}