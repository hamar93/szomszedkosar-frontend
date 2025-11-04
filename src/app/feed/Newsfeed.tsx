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
    <div>
      <header className="header">
        <h1>Szomszéd Kosara</h1>
        <a href="#" className="btn-primary">Kijelentkezés</a>
      </header>

      <main className="container">
        <div className="filters">
          <button className={`filter-btn ${activeFilter === 'MIND' ? 'active' : ''}`} onClick={() => setActiveFilter('MIND')}>MIND</button>
          <button className={`filter-btn ${activeFilter === 'HÚS' ? 'active' : ''}`} onClick={() => setActiveFilter('HÚS')}>HÚS</button>
          <button className={`filter-btn ${activeFilter === 'PÉKSÜTI' ? 'active' : ''}`} onClick={() => setActiveFilter('PÉKSÜTI')}>PÉKSÜTI</button>
          <button className={`filter-btn ${activeFilter === 'ZÖLDSÉG' ? 'active' : ''}`} onClick={() => setActiveFilter('ZÖLDSÉG')}>ZÖLDSÉG</button>
          <button className={`filter-btn ${activeFilter === 'GYÜMÖLCS' ? 'active' : ''}`} onClick={() => setActiveFilter('GYÜMÖLCS')}>GYÜMÖLCS</button>
        </div>

        <section className="posts-list">
          {filteredAlerts.map(alert => (
            <article key={alert.id} className="post">
              <div className="post-top">
                <img src={alert.sellerAvatar} alt={`${alert.sellerName} profilképe`} className="author-avatar" />
                <div>
                  <strong>{alert.sellerName}</strong>
                  {alert.isUrgent && <span className="urgent-label red">SÜRGŐS</span>}
                </div>
              </div>
              <div className="product-box">
                <div className="emoji">{alert.productEmoji}</div>
                <h3>{alert.productName}</h3>
                <p className="price">{alert.productPrice}</p>
              </div>
              <div className="post-footer">
                <button className="action-btn primary">Megnézem</button>
                <button className="action-btn">Üzenet</button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Newsfeed;
