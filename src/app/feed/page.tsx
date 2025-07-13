'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// Koordináták közötti távolság számítása (Haversine formula)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Föld sugara km-ben
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // 1 tizedesjegyre kerekít
}

// Magyar városok koordinátái
const hungarianCities = {
  'Kisbér': { lat: 47.4992, lng: 18.0317 },
  'Budapest': { lat: 47.4979, lng: 19.0402 },
  'Debrecen': { lat: 47.5316, lng: 21.6273 },
  'Szeged': { lat: 46.2530, lng: 20.1414 },
  'Miskolc': { lat: 48.1034, lng: 20.7784 },
  'Pécs': { lat: 46.0727, lng: 18.2330 },
  'Győr': { lat: 47.6874, lng: 17.6504 },
  'Nyíregyháza': { lat: 47.9565, lng: 21.7173 },
  'Kecskemét': { lat: 46.9040, lng: 19.6911 },
  'Székesfehérvár': { lat: 47.1825, lng: 18.4061 },
  'Komárom': { lat: 47.7464, lng: 18.1255 },
  'Tatabánya': { lat: 47.5692, lng: 18.3981 },
  'Esztergom': { lat: 47.7928, lng: 18.7406 }
};

interface Location {
  lat: number;
  lng: number;
  address: string;
  city: string;
}

// Mock hírfolyam adatok - koordinátákkal bővítve
const feedData = [
  {
    id: '1',
    type: 'push_notification',
    urgent: true,
    seller: {
      name: 'Marika Néni',
      avatar: '👩‍🌾',
      location: 'Balatonfüred',
      verified: true,
      coordinates: { lat: 46.9581, lng: 17.8889 } // Balatonfüred koordináták
    },
    product: {
      name: 'Friss paprika',
      price: '500 Ft/kg',
      quantity: '8 kg',
      emoji: '🌶️'
    },
    message: 'Marika néninek van eladó paprika!',
    description: 'Frissen szedett hegyes erős paprika. Tökéletes befőzéshez és szárításhoz.',
    distance: '2 km',
    time: '1 órája',
    views: 23,
    interested: 7,
    coordinates: { lat: 46.9581, lng: 17.8889 }
  },
  {
    id: '2',
    type: 'event',
    urgent: false,
    seller: {
      name: 'János B.',
      avatar: '👨‍🌾',
      location: 'Veszprém',
      verified: true,
      coordinates: { lat: 47.0965, lng: 17.9093 }
    },
    event: {
      name: 'Bakonyi barna csirke',
      date: 'Jövő kedd',
      price: 'Fajtiszta csirke',
      emoji: '🐔'
    },
    message: 'János B. Bakonyi barna elérendelhető jövő kedddtől',
    description: 'Szabadtartású, fajtiszta Bakonyi barna csirkék. Előrendelés szükséges.',
    distance: '3 km',
    time: '2 órája',
    views: 156,
    interested: 34,
    coordinates: { lat: 47.0965, lng: 17.9093 }
  },
  {
    id: '3',
    type: 'special_event',
    urgent: true,
    seller: {
      name: 'Kovács Gazdaság',
      avatar: '🏡',
      location: 'Komárom',
      verified: true,
      coordinates: { lat: 47.7464, lng: 18.1255 }
    },
    event: {
      name: 'Disznóvágás',
      date: 'Szombat',
      products: ['hurka', 'kolbász', 'szalonna'],
      emoji: '🥓'
    },
    message: 'Disznóvágás hétvégén, lehet még jelentkezni hurkára, kolbászra!',
    description: 'Hagyományos disznóvágás. Még lehet jelentkezni hurkára, kolbászra, szalonnára.',
    distance: '3 km',
    time: '4 órája',
    views: 287,
    interested: 89,
    coordinates: { lat: 47.7464, lng: 18.1255 }
  },
  {
    id: '4',
    type: 'product',
    urgent: false,
    seller: {
      name: 'Szabó Anna',
      avatar: '👵',
      location: 'Esztergom',
      verified: false,
      coordinates: { lat: 47.7928, lng: 18.7406 }
    },
    product: {
      name: 'Házi lekvár és szörp',
      varieties: ['meggy', 'barack', 'szilva'],
      price: '800-1200 Ft',
      emoji: '🍯'
    },
    message: 'Házi lekvár és szörp eladó különböző ízekben',
    description: 'Házi készítésű lekvárok és szörpök. Meggy, barack, szilva ízekben.',
    distance: '5 km',
    time: '1 napja',
    views: 94,
    interested: 12,
    coordinates: { lat: 47.7928, lng: 18.7406 }
  },
  {
    id: '5',
    type: 'discount',
    urgent: false,
    seller: {
      name: 'Pista bácsi',
      avatar: '👨‍🌾',
      location: 'Tatabánya',
      verified: true,
      coordinates: { lat: 47.5692, lng: 18.3981 }
    },
    product: {
      name: 'Almák akciós áron',
      originalPrice: '400 Ft/kg',
      discountPrice: '250 Ft/kg',
      reason: 'Túlérett, de még jó',
      emoji: '🍎'
    },
    message: 'Munch-szerű kedvezmény: almák fél áron!',
    description: 'Túlérett, de még kiváló minőségű almák. Tökéletes befőzéshez és süteményekhez.',
    distance: '7 km',
    time: '2 napja',
    views: 167,
    interested: 43,
    discount: 37,
    coordinates: { lat: 47.5692, lng: 18.3981 }
  }
]

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'urgent' | 'nearby' | 'events'>('all')
  const [maxDistance, setMaxDistance] = useState(10)
  const [userLocation, setUserLocation] = useState<Location | null>(null)
  const [manualLocation, setManualLocation] = useState('Kisbér')
  const [locationPermission, setLocationPermission] = useState<'unknown' | 'granted' | 'denied'>('unknown')
  const [feedWithDistances, setFeedWithDistances] = useState(feedData)

  // Felhasználó helyzete (GPS vagy kézi beállítás)
  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: Location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Jelenlegi helyzet',
            city: 'Jelenlegi város'
          };
          setUserLocation(location);
          setLocationPermission('granted');
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationPermission('denied');
          // Alapértelmezett Kisbér koordináták
          setUserLocation({
            lat: 47.4992,
            lng: 18.0317,
            address: 'Kisbér',
            city: 'Kisbér'
          });
        }
      );
    } else {
      setLocationPermission('denied');
      // Alapértelmezett Kisbér koordináták
      setUserLocation({
        lat: 47.4992,
        lng: 18.0317,
        address: 'Kisbér',
        city: 'Kisbér'
      });
    }
  };

  // Kézi helyszín beállítás
  const setManualLocationHandler = (cityName: string) => {
    const cityCoords = hungarianCities[cityName as keyof typeof hungarianCities];
    if (cityCoords) {
      setUserLocation({
        lat: cityCoords.lat,
        lng: cityCoords.lng,
        address: cityName,
        city: cityName
      });
      setManualLocation(cityName);
    }
  };

  // Távolságok kiszámítása és frissítése
  useEffect(() => {
    if (!userLocation) return;

    const updatedFeed = feedData.map(item => ({
      ...item,
      calculatedDistance: calculateDistance(
        userLocation.lat,
        userLocation.lng,
        item.coordinates.lat,
        item.coordinates.lng
      ),
      distance: `${calculateDistance(
        userLocation.lat,
        userLocation.lng,
        item.coordinates.lat,
        item.coordinates.lng
      )} km`
    }));

    setFeedWithDistances(updatedFeed);
  }, [userLocation]);

  // Kezdeti helyszín beállítás
  useEffect(() => {
    getUserLocation();
  }, []);

  const filteredFeed = feedWithDistances.filter(item => {
    const distance = item.calculatedDistance || 0;
    
    if (activeFilter === 'urgent') return item.urgent
    if (activeFilter === 'nearby') return distance <= maxDistance
    if (activeFilter === 'events') return item.type === 'event' || item.type === 'special_event'
    return distance <= maxDistance // Alapértelmezetten csak a megadott távolságon belüli elemek
  }).sort((a, b) => (a.calculatedDistance || 0) - (b.calculatedDistance || 0)) // Távolság szerint rendezés

  const getItemIcon = (item: any) => {
    if (item.urgent) return '🔥'
    if (item.type === 'event' || item.type === 'special_event') return '📅'
    if (item.type === 'discount') return '💰'
    return '📢'
  }

  const getTimeColor = (time: string) => {
    if (time.includes('órája')) return '#16a34a'
    if (time.includes('napja')) return '#f59e0b'
    return '#6b7280'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #fefcf3 50%, #fff7ed 100%)'
    }}>
      
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        zIndex: 40
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px 16px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#1f2937',
                margin: '0 0 8px 0'
              }}>
                Hírfolyam
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: 0
              }}>
                Friss értesítések a környékről
              </p>
            </div>
            
            {/* Értesítések gomb */}
            <button style={{
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)'
            }}>
              <span>🔔</span>
              Értesítési beállítások
            </button>
          </div>
          
          {/* Lokáció beállítások */}
          <div style={{
            background: '#f8f9fa',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '16px', fontWeight: '600' }}>📍 Helyszín:</span>
              <span style={{ fontSize: '14px', color: '#666' }}>
                {userLocation ? userLocation.address : 'Helyszín betöltése...'}
              </span>
              {locationPermission === 'denied' && (
                <span style={{ fontSize: '12px', color: '#dc3545' }}>(Kézi beállítás)</span>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={getUserLocation}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#16a34a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                📱 GPS
              </button>
              
              <select
                value={manualLocation}
                onChange={(e) => setManualLocationHandler(e.target.value)}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
              >
                {Object.keys(hungarianCities).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px' }}>Távolság: {maxDistance} km</span>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  style={{ width: '100px' }}
                />
              </div>
            </div>
          </div>
          
          {/* Filterek */}
          <div style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}>
            {[
              { key: 'all', label: 'Összes', icon: '📋' },
              { key: 'urgent', label: 'Sürgős', icon: '🔥' },
              { key: 'nearby', label: `Közeli (${maxDistance}km)`, icon: '📍' },
              { key: 'events', label: 'Események', icon: '📅' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key as any)}
                style={{
                  background: activeFilter === filter.key ? '#16a34a' : 'white',
                  color: activeFilter === filter.key ? 'white' : '#6b7280',
                  border: '2px solid #e5e7eb',
                  borderColor: activeFilter === filter.key ? '#16a34a' : '#e5e7eb',
                  borderRadius: '12px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hírfolyam */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '32px 16px'
      }}>
        
        {/* Statistika */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          border: '2px solid #f8fafc'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#16a34a',
                marginBottom: '4px'
              }}>
                {filteredFeed.length}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6b7280'
              }}>
                Aktív hirdetés
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#f59e0b',
                marginBottom: '4px'
              }}>
                {filteredFeed.filter(item => item.urgent).length}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6b7280'
              }}>
                Sürgős értesítés
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#8b5cf6',
                marginBottom: '4px'
              }}>
                {filteredFeed.filter(item => item.type === 'event' || item.type === 'special_event').length}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6b7280'
              }}>
                Esemény
              </div>
            </div>
          </div>
        </div>

        {/* Eredmények összesítése */}
        {userLocation && (
          <div style={{ 
            marginBottom: '20px', 
            padding: '15px', 
            backgroundColor: '#e8f5e8', 
            borderRadius: '8px',
            border: '1px solid #16a34a',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, fontSize: '14px' }}>
              📊 <strong>{filteredFeed.length} hirdetés</strong> található {maxDistance} km-es körzetben ({userLocation.city} környékén)
            </p>
          </div>
        )}

        {/* Hírfolyam elemek */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {filteredFeed.length > 0 ? (
            filteredFeed.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                  border: item.urgent ? '3px solid #fbbf24' : '2px solid #f8fafc',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.15)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)'
                }}
              >
                
                {/* Sürgős jelzés */}
                {item.urgent && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '20px',
                    background: '#fbbf24',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span>🔥</span>
                    SÜRGŐS
                  </div>
                )}

                {/* Kedvezmény jelzés */}
                {item.type === 'discount' && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '20px',
                    background: '#dc2626',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span>💰</span>
                    -{item.discount}%
                  </div>
                )}
                
                {/* Fejléc */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  
                  {/* Avatar */}
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0
                  }}>
                    {item.seller.avatar}
                  </div>
                  
                  {/* Információk */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px'
                    }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1f2937',
                        margin: 0
                      }}>
                        {item.message}
                      </h3>
                      <span style={{ fontSize: '16px' }}>{getItemIcon(item)}</span>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <span>{item.seller.avatar}</span>
                        <span>{item.seller.name}</span>
                        {item.seller.verified && (
                          <span style={{
                            background: '#16a34a',
                            color: 'white',
                            fontSize: '10px',
                            padding: '1px 4px',
                            borderRadius: '4px'
                          }}>
                            ✓
                          </span>
                        )}
                      </div>
                      <span>📍 {item.distance}</span>
                      <span style={{ color: getTimeColor(item.time) }}>
                        🕒 {item.time}
                      </span>
                    </div>
                  </div>
                  
                  {/* Termék emoji */}
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    {item.product?.emoji || item.event?.emoji}
                  </div>
                </div>
                
                {/* Leírás */}
                <p style={{
                  fontSize: '15px',
                  color: '#4b5563',
                  lineHeight: '1.6',
                  margin: '0 0 16px 0'
                }}>
                  {item.description}
                </p>
                
                {/* Termék/esemény részletek */}
                {item.product && (
                  <div style={{
                    background: '#f8fafc',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>
                          {item.product.name}
                        </span>
                        {item.product.quantity && (
                          <span style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            marginLeft: '8px'
                          }}>
                            ({item.product.quantity})
                          </span>
                        )}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        {item.type === 'discount' && item.product.originalPrice && (
                          <span style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            textDecoration: 'line-through'
                          }}>
                            {item.product.originalPrice}
                          </span>
                        )}
                        <span style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          color: item.type === 'discount' ? '#dc2626' : '#16a34a'
                        }}>
                          {item.product.discountPrice || item.product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Esemény részletek */}
                {item.event && (
                  <div style={{
                    background: '#fef3c7',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '16px',
                    border: '2px solid #fbbf24'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#92400e'
                        }}>
                          📅 {item.event.name}
                        </span>
                      </div>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#92400e'
                      }}>
                        {item.event.date}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Lábléc */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    <span>👀 {item.views} megtekintés</span>
                    <span>❤️ {item.interested} érdeklődő</span>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '8px'
                  }}>
                    <button style={{
                      background: 'white',
                      border: '2px solid #16a34a',
                      color: '#16a34a',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      💬 Üzenet
                    </button>
                    <Link
                      href={item.product ? `/product/${item.id}` : `/event/${item.id}`}
                      style={{
                        background: '#16a34a',
                        color: 'white',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      👁️ Részletek
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#666',
              backgroundColor: 'white',
              borderRadius: '20px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔍</div>
              <h3 style={{ marginBottom: '10px' }}>Nincs hirdetés a közelben</h3>
              <p>Próbáld meg növelni a keresési távolságot, vagy válassz másik helyszínt.</p>
            </div>
          )}
        </div>
        
        {/* Load more gomb */}
        {filteredFeed.length > 0 && (
          <div style={{
            textAlign: 'center',
            marginTop: '32px'
          }}>
            <button style={{
              background: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: '16px',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#6b7280',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}>
              További értesítések betöltése
            </button>
          </div>
        )}
      </div>
    </div>
  )
}