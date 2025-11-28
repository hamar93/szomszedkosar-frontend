'use client';

import Link from 'next/link';
import {
  MessageCircle,
  User,
  Clock,
  ArrowRight,
  Search,
  ArrowLeft
} from 'lucide-react';

export default function MessagesPage() {
  const messages = [
    {
      id: 'conv-1',
      name: 'Nagy Anna',
      product: 'Házi eperlekvár',
      lastMessage: 'Érdekelne, hogy cukormentes-e a lekvár? Mert cukorbetegeknek vinném ajándékba.',
      time: '2 órája',
      unread: true,
      avatar: 'bg-pink-100 text-pink-600'
    },
    {
      id: 'conv-2',
      name: 'Kovács Bence',
      product: 'Bio tojás',
      lastMessage: 'Rendben, holnap reggel 8-kor át tudom venni a piacon.',
      time: '1 napja',
      unread: false,
      avatar: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'conv-3',
      name: 'Szabó Éva',
      product: 'Friss zöldségkosár',
      lastMessage: 'Köszönöm szépen, minden nagyon finom volt! Jövő héten újra rendelnék.',
      time: '3 napja',
      unread: false,
      avatar: 'bg-green-100 text-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-600">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold text-[#1F2937] flex items-center gap-2">
              <MessageCircle size={24} className="text-[#1B4332]" />
              Üzenetek
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">

        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Keresés az üzenetek között..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all bg-white shadow-sm"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {messages.map((msg) => (
              <Link
                key={msg.id}
                href={`/messages/${msg.id}`}
                className={`block p-4 hover:bg-gray-50 transition-all group ${msg.unread ? 'bg-green-50/50' : ''}`}
              >
                <div className="flex items-start gap-4">

                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${msg.avatar}`}>
                    <User size={20} />
                  </div>

                  {/* Content */}
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h2 className={`font-bold text-[#1F2937] truncate ${msg.unread ? 'text-[#1B4332]' : ''}`}>
                        {msg.name}
                      </h2>
                      <span className="text-xs text-gray-400 flex items-center gap-1 whitespace-nowrap">
                        <Clock size={12} />
                        {msg.time}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">
                      {msg.product}
                    </div>

                    <p className={`text-sm truncate ${msg.unread ? 'font-medium text-gray-800' : 'text-gray-500'}`}>
                      {msg.lastMessage}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="self-center text-gray-300 group-hover:text-[#1B4332] transition-colors">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          A beszélgetések biztonságosak és titkosítottak.
        </p>

      </main>
    </div>
  );
}
