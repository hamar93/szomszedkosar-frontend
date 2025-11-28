'use client';

import Link from 'next/link';
import {
  Bell,
  ArrowLeft,
  ShoppingBasket,
  Leaf,
  Info,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'Új megrendelés érkezett',
      message: 'Kovács Bence megrendelte a következő terméket: Bio tojás (10 db).',
      time: '10 perce',
      read: false,
      icon: ShoppingBasket,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 2,
      type: 'product',
      title: 'Új termék a környéken',
      message: 'Marika Néni friss cseresznyét töltött fel 2 km-re tőled.',
      time: '1 órája',
      read: false,
      icon: Leaf,
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 3,
      type: 'system',
      title: 'Sikeres profil frissítés',
      message: 'A profilod adatai sikeresen frissültek.',
      time: '1 napja',
      read: true,
      icon: CheckCircle,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 4,
      type: 'info',
      title: 'Havi összesítő elérhető',
      message: 'Elkészült a havi eladási statisztikád. Kattints a megtekintéshez.',
      time: '2 napja',
      read: true,
      icon: Info,
      color: 'bg-yellow-100 text-yellow-600'
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
              <Bell size={24} className="text-[#1B4332]" />
              Értesítések
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Legutóbbi értesítések</h2>
            <button className="text-xs font-bold text-[#1B4332] hover:underline">
              Összes olvasottnak jelölése
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-5 hover:bg-gray-50 transition-all flex gap-4 ${notif.read ? 'opacity-70' : 'bg-green-50/30'}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                    <notif.icon size={24} />
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`font-bold text-[#1F2937] ${notif.read ? '' : 'text-[#1B4332]'}`}>
                        {notif.title}
                      </h3>
                      <span className="text-xs text-gray-400 flex items-center gap-1 whitespace-nowrap ml-2">
                        <Clock size={12} />
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>

                  {!notif.read && (
                    <div className="self-center">
                      <div className="w-3 h-3 bg-[#1B4332] rounded-full shadow-sm"></div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">Nincsenek új értesítések</h3>
                <p className="text-gray-500 text-sm">
                  Jelenleg minden értesítést elolvastál. Nézz vissza később!
                </p>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
