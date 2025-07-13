'use client';

import { useState, useEffect } from 'react';

interface Location {
  lat: number;
  lng: number;
  address: string;
  city: string;
  country: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  seller: {
    name: string;
    location: Location;
  };
  location: Location;
  distance?: number;
}

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

// Magyar városok koordinátái (példa adatok)
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

export function LocationBasedSearch() {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [maxDistance, setMaxDistance] = useState(10); // km
  const [searchRadius, setSearchRadius] = useState(10);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [locationPermission, setLocationPermission] = useState<'unknown' | 'granted' | 'denied'>('unknown');
  const [manualLocation, setManualLocation] = useState('');

  // Példa termékek
  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'Friss paradicsom',
      price: 600,
      seller: { name: 'János bácsi', location: { lat: 47.4892, lng: 18.0417, address: 'Kisbér, Petőfi u. 5', city: 'Kisbér', country: 'Magyarország' } },
      location: { lat: 47.4892, lng: 18.0417, address: 'Kisbér, Petőfi u. 5', city: 'Kisbér', country: 'Magyarország' }
    },
    {
      id: '2',
      name: 'Házi tojás',
      price: 50,
      seller: { name: 'Marika néni', location: { lat: 47.7464, lng: 18.1255, address: 'Komárom, Kossuth u. 12', city: 'Komárom', country: 'Magyarország' } },
      location: { lat: 47.7464, lng: 18.1255, address: 'Komárom, Kossuth u. 12', city: 'Komárom', country: 'Magyarország' }
    },
    {
      id: '3',
      name: 'Bio méz',
      price: 2500,
      seller: { name: 'Péter', location: { lat: 47.5692, lng: 18.3981, address: 'Tatabánya, Fő tér 3', city: 'Tatabánya', country: 'Magyarország' } },
      location: { lat: 47.5692, lng: 18.3981, address: 'Tatabánya, Fő tér 3', city: 'Tatabánya', country: 'Magyarország' }
    },
    {
      id: '4',
      name: 'Almalekvár',
      price: 800,
      seller: { name: 'Eszter', location: { lat: 47.7928, lng: 18.7406, address: 'Esztergom, Széchenyi tér 1', city: 'Esztergom', country: 'Magyarország' } },
      location: { lat: 47.7928, lng: 18.7406, address: 'Esztergom, Széchenyi tér 1', city: 'Esztergom', country: 'Magyarország' }
    },
    {
      id: '5',
      name: 'Friss saláta',
      price: 300,
      seller: { name: 'Tibor bácsi', location: { lat: 47.4979, lng: 19.0402, address: 'Budapest, Váci u. 10', city: 'Budapest', country: 'Magyarország' } },
      location: { lat: 47.4979, lng: 19.0402, address: 'Budapest, Váci u. 10', city: 'Budapest', country: 'Magyarország' }
    }
  ];

  // Felhasználó helyzete (GPS vagy kézi beállítás)
  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: Location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Jelenlegi helyzet',
            city: 'Jelenlegi város',
            country: 'Magyarország'
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
            city: 'Kisbér',
            country: 'Magyarország'
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
        city: 'Kisbér',
        country: 'Magyarország'
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
        city: cityName,
        country: 'Magyarország'
      });
      setManualLocation(cityName);
    }
  };

  // Termékek szűrése távolság alapján
  useEffect(() => {
    if (!userLocation) return;

    const filtered = sampleProducts
      .map(product => ({
        ...product,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          product.location.lat,
          product.location.lng
        )
      }))
      .filter(product => product.distance! <= searchRadius)
      .sort((a, b) => a.distance! - b.distance!);

    setFilteredProducts(filtered);
  }, [userLocation, searchRadius]);

  useEffect(() => {
    getUserLocation();
    setProducts(sampleProducts);
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>🍅 Helyi termékek</h1>
        <p style={{ color: '#666', fontSize: '16px' }}>Találj friss termékeket a közeledben!</p>
      </div>

      {/* Location Settings */}
      <div style={{ 
        backgroundColor: 'white', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '20px', 
        marginBottom: '25px' 
      }}>
        <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>📍 Helyszín beállítások</h3>
        
        {/* Current Location */}
        <div style={{ marginBottom: '15px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Jelenlegi helyszín:</p>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            padding: '10px',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px'
          }}>
            <span style={{ fontSize: '16px' }}>📍</span>
            <span style={{ fontWeight: '500' }}>
              {userLocation ? userLocation.address : 'Helyszín betöltése...'}
            </span>
            {locationPermission === 'denied' && (
              <span style={{ fontSize: '12px', color: '#dc3545' }}>(Kézi beállítás)</span>
            )}
          </div>
        </div>

        {/* Location Controls */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
          <button
            onClick={getUserLocation}
            style={{
              padding: '8px 15px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            📱 GPS helyszín
          </button>
          
          <select
            value={manualLocation}
            onChange={(e) => setManualLocationHandler(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '14px'
            }}
          >
            <option value="">Válassz várost</option>
            {Object.keys(hungarianCities).map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Distance Filter */}
        <div>
          <label style={{ fontSize: '14px', color: '#666', marginBottom: '8px', display: 'block' }}>
            Keresési távolság: {searchRadius} km
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={searchRadius}
            onChange={(e) => setSearchRadius(Number(e.target.value))}
            style={{ width: '100%', marginBottom: '8px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#999' }}>
            <span>1 km</span>
            <span>25 km</span>
            <span>50 km</span>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        backgroundColor: '#e8f5e8', 
        borderRadius: '8px',
        border: '1px solid #28a745'
      }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          📊 <strong>{filteredProducts.length} termék</strong> található {searchRadius} km-es körzetben
          {userLocation && ` (${userLocation.city} környékén)`}
        </p>
      </div>

      {/* Products List */}
      <div style={{ display: 'grid', gap: '15px' }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', marginBottom: '5px' }}>
                  {product.name}
                </h4>
                <p style={{ margin: 0, color: '#666', fontSize: '14px', marginBottom: '8px' }}>
                  👤 {product.seller.name} • 📍 {product.location.city}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold', 
                    color: '#28a745' 
                  }}>
                    {product.price} Ft
                  </span>
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#666',
                    backgroundColor: '#f8f9fa',
                    padding: '2px 8px',
                    borderRadius: '10px'
                  }}>
                    🚗 {product.distance} km
                  </span>
                </div>
              </div>
              <button
                style={{
                  padding: '10px 15px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Részletek
              </button>
            </div>
          ))
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#666' 
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔍</div>
            <h3 style={{ marginBottom: '10px' }}>Nincs termék a közelben</h3>
            <p>Próbáld meg növelni a keresési távolságot, vagy válassz másik helyszínt.</p>
          </div>
        )}
      </div>

      {/* Location Permission Info */}
      {locationPermission === 'denied' && (
        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#856404'
        }}>
          💡 <strong>Tipp:</strong> Engedélyezd a helyszín használatát pontosabb eredményekért, 
          vagy válassz várost a legördülő menüből.
        </div>
      )}
    </div>
  );
}

// Lokáció picker komponens hirdetés feladáshoz
export function LocationPicker({ onLocationSelect }: { onLocationSelect: (location: Location) => void }) {
  const [selectedCity, setSelectedCity] = useState('');
  const [customAddress, setCustomAddress] = useState('');

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    const cityCoords = hungarianCities[cityName as keyof typeof hungarianCities];
    if (cityCoords) {
      onLocationSelect({
        lat: cityCoords.lat,
        lng: cityCoords.lng,
        address: customAddress || cityName,
        city: cityName,
        country: 'Magyarország'
      });
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', display: 'block' }}>
        📍 Helyszín *
      </label>
      
      <div style={{ marginBottom: '10px' }}>
        <select
          value={selectedCity}
          onChange={(e) => handleCitySelect(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '14px'
          }}
        >
          <option value="">Válassz várost</option>
          {Object.keys(hungarianCities).map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {selectedCity && (
        <input
          type="text"
          value={customAddress}
          onChange={(e) => setCustomAddress(e.target.value)}
          placeholder={`Pontos cím ${selectedCity}-ben (opcionális)`}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '14px'
          }}
        />
      )}
    </div>
  );
}