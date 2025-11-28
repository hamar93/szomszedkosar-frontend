"use client";

import React, { useState } from 'react';

// 1. Alert Interface (TypeScript)
interface FreshAlert {
  id: number;
  postTitle: string;
  productName: string;
  productPrice: string;
  productEmoji: string;
  sellerName: string;
  sellerAvatar: string;
  sellerLat: number;
  sellerLon: number;
  isUrgent: boolean;
  category: string;
}

// Hardcoded data for rendering
const hardcodedAlerts: FreshAlert[] = [
  {
    id: 1,
    postTitle: "Friss, ropogós kenyér a pékségből!",
    productName: "Kovászos kenyér",
    productPrice: "850 Ft",
    productEmoji: "🍞",
    sellerName: "Pékműhely",
    sellerAvatar: "https://via.placeholder.com/100/D3D3D3/000000?text=Avatar",
    sellerLat: 47.4979,
    sellerLon: 19.0402,
    isUrgent: true,
    category: 'PÉKSÜTI',
  },
  {
    id: 2,
    postTitle: "Ma reggeli szüretelésű eper",
    productName: "Földieper",
    productPrice: "1500 Ft / kg",
    productEmoji: "🍓",
    sellerName: "Gergő Gazda",
    sellerAvatar: "https://via.placeholder.com/100/FF7F7F/000000?text=Avatar",
    sellerLat: 47.5000,
    sellerLon: 19.0500,
    isUrgent: false,
    category: 'GYÜMÖLCS',
  },
  {
    id: 3,
    postTitle: "Kézműves sajtok a legjobb áron",
    productName: "Gouda sajt",
    productPrice: "2500 Ft / kg",
    productEmoji: "🧀",
    sellerName: "Sajtmester",
    sellerAvatar: "https://via.placeholder.com/100/ADD8E6/000000?text=Avatar",
    sellerLat: 47.4950,
    sellerLon: 19.0450,
    isUrgent: true,
    category: 'SAJT',
  },
];

// 2. Filtering Logic (TypeScript)
const getRelevantAlerts = (alerts: FreshAlert[], userLat: number, userLon: number, radiusKm: number): FreshAlert[] => {
  const R = 6371; // Radius of the Earth in km

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  return alerts.filter(alert => {
    const distance = calculateDistance(userLat, userLon, alert.sellerLat, alert.sellerLon);
    return distance <= radiusKm;
  });
};

// 3. Component (TSX)
const Newsfeed: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('MIND');
  const userLat = 47.4979; // Example user location
  const userLon = 19.0402;
  const radiusKm = 10;

  const geographicallyFilteredAlerts = getRelevantAlerts(hardcodedAlerts, userLat, userLon, radiusKm);

  const filteredAlerts =
    activeFilter === 'MIND'
      ? geographicallyFilteredAlerts
      : geographicallyFilteredAlerts.filter(alert => alert.category === activeFilter);

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20">
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {['MIND', 'HÚS', 'PÉKSÜTI', 'ZÖLDSÉG', 'GYÜMÖLCS'].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${activeFilter === filter
                ? 'bg-[#1B4332] text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <section className="flex flex-col gap-4">
        {filteredAlerts.map(alert => (
          <article key={alert.id} className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <img src={alert.sellerAvatar} alt={`${alert.sellerName} profilképe`} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-gray-900">{alert.sellerName}</strong>
                  {alert.isUrgent && (
                    <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      SÜRGŐS
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500">2 km távolságra</div>
              </div>
            </div>

            <div className="bg-[#F5F5F0] rounded-xl p-4 mb-4 flex items-center gap-4">
              <div className="text-4xl">{alert.productEmoji}</div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{alert.productName}</h3>
                <p className="text-[#1B4332] font-bold">{alert.productPrice}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-[#1B4332] text-white py-2.5 rounded-xl font-semibold hover:bg-[#153326] transition-colors">
                Megnézem
              </button>
              <button className="flex-1 border-2 border-[#1B4332] text-[#1B4332] py-2.5 rounded-xl font-semibold hover:bg-[#F5F5F0] transition-colors">
                Üzenet
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Newsfeed;
