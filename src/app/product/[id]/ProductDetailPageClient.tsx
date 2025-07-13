'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ContactButton } from '@/components/ContactSystem'

// ContactSystem típusok importálása
interface Contact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  location: string;
  verified: boolean;
  avatar: string;
  lastSeen: string;
}

const getProductById = (id: string) => {
  const products = {
    '1': {
      id: '1',
      name: 'Friss meggy',
      category: 'perishable',
      subcategory: 'Gyümölcs',
      price: 800,
      unit: 'kg',
      seller: {
        name: 'Marika Néni',
        avatar: '👩‍🌾',
        location: 'Balatonfüred',
        verified: true,
        rating: 4.9,
        totalSales: 156,
        memberSince: '2023',
        phone: '+36 20 123 4567',
        email: 'marika.neni@example.com' // Email hozzáadva
      },
      distance: '2 km',
      rating: 4.9,
      reviews: 23,
      emoji: '🍒',
      images: ['/images/meggy1.jpg', '/images/meggy2.jpg'],
      description: 'Frissen szedett házi meggy, vegyszermentes termesztés. Tökéletes befőzéshez, sütemények készítéséhez vagy friss fogyasztásra. A meggyek érettségük csúcsán kerülnek leszedésre.',
      longDescription: `
        Házi kertünkben termett meggyek, amelyeket vegyszermentes módon termesztünk. 
        A fák több mint 15 évesek, így az íz kifejezetten intenzív és édes-savanyú.

        Ideális felhasználás:
        • Friss fogyasztás
        • Befőzés, lekvár készítés
        • Sütemények, torták
        • Szárítás

        A szüret reggel 6-8 óra között történik, így a meggyek hűvösek és frissek maradnak.
      `,
      quantity: '15 kg elérhető',
      availableQuantity: 15,
      minOrder: 2,
      maxOrder: 15,
      delivery: [
        { type: 'pickup', name: 'Személyes átvétel', price: 0, description: 'Balatonfüred, Petőfi u. 12.' },
        { type: 'local_delivery', name: 'Helyi kiszállítás', price: 500, description: '10 km-es körzetben' }
      ],
      urgent: true,
      organic: true,
      harvestDate: '2024-06-20',
      expiryDays: 3,
      storageInstructions: 'Hűvös, száraz helyen tárolva 3-4 napig friss marad.',
      nutritionInfo: {
        calories: 50,
        protein: 1,
        carbs: 12,
        fat: 0.3,
        fiber: 1.6,
        vitaminC: 10
      }
    }
  }

  return products[id as keyof typeof products]
}

interface Props {
  id: string
}

export default function ProductDetailPageClient({ id }: Props) {
  const [selectedQuantity, setSelectedQuantity] = useState(2)
  const [selectedDelivery, setSelectedDelivery] = useState('pickup')
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showReviews, setShowReviews] = useState(true)
  const [showNutrition, setShowNutrition] = useState(false)

  const product = getProductById(id)

  if (!product) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ fontSize: '64px' }}>😕</div>
        <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Termék nem található</h2>
        <Link href="/search" style={{
          background: '#16a34a',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600'
        }}>
          Vissza a böngészéshez
        </Link>
      </div>
    )
  }

  // ContactButton-hoz seller objektum konvertálása
  const sellerContact: Contact = {
    id: `seller_${product.id}`,
    name: product.seller.name,
    phone: product.seller.phone,
    email: product.seller.email,
    location: product.seller.location,
    verified: product.seller.verified,
    avatar: product.seller.avatar,
    lastSeen: '1 órája online'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #fefcf3 50%, #fff7ed 100%)',
      fontFamily: 'Arial, sans-serif'
    }}>
      
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '20px 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280' }}>
            <Link href="/" style={{ color: '#16a34a', textDecoration: 'none' }}>Főoldal</Link>
            <span>→</span>
            <Link href="/feed" style={{ color: '#16a34a', textDecoration: 'none' }}>Hírfolyam</Link>
            <span>→</span>
            <span>{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          
          {/* Bal oldal - Termék képe és info */}
          <div>
            {/* Termék képe/ikonja */}
            <div style={{
              width: '100%',
              height: '400px',
              background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '120px',
              marginBottom: '30px',
              border: '2px solid #e5e7eb'
            }}>
              {product.emoji}
            </div>

            {/* Termék címkék */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {product.urgent && (
                <span style={{
                  background: '#fbbf24',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  🔥 SÜRGŐS
                </span>
              )}
              {product.organic && (
                <span style={{
                  background: '#16a34a',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  🌱 BIO
                </span>
              )}
              <span style={{
                background: '#f0fdf4',
                color: '#16a34a',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                border: '1px solid #16a34a'
              }}>
                {product.subcategory}
              </span>
            </div>

            {/* Eladó információk */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
                Eladó információk
              </h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  {product.seller.avatar}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: '#1f2937' }}>
                      {product.seller.name}
                    </h4>
                    {product.seller.verified && (
                      <span style={{
                        background: '#16a34a',
                        color: 'white',
                        fontSize: '10px',
                        padding: '2px 4px',
                        borderRadius: '4px',
                        fontWeight: '600'
                      }}>
                        ✓ Ellenőrzött
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: '2px 0' }}>
                    📍 {product.seller.location} • {product.distance}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#6b7280' }}>
                    <span>⭐ {product.seller.rating}/5</span>
                    <span>•</span>
                    <span>{product.seller.totalSales} eladás</span>
                    <span>•</span>
                    <span>Tag: {product.seller.memberSince}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Jobb oldal - Termék részletek és vásárlás */}
          <div>
            {/* Termék címe és ár */}
            <div style={{ marginBottom: '30px' }}>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '10px'
              }}>
                {product.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '15px' }}>
                <span style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#16a34a'
                }}>
                  {product.price} Ft
                </span>
                <span style={{ fontSize: '16px', color: '#6b7280' }}>/ {product.unit}</span>
              </div>
              <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '15px' }}>
                {product.quantity}
              </p>
            </div>

            {/* Termék leírás */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: '#1f2937' }}>
                Leírás
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#4b5563',
                lineHeight: '1.6',
                marginBottom: '10px'
              }}>
                {product.description}
              </p>
              
              {!showFullDescription ? (
                <button
                  onClick={() => setShowFullDescription(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#16a34a',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Részletes leírás mutatása
                </button>
              ) : (
                <div style={{
                  background: '#f9fafb',
                  padding: '15px',
                  borderRadius: '8px',
                  marginTop: '10px'
                }}>
                  <pre style={{
                    fontSize: '14px',
                    color: '#4b5563',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'inherit',
                    margin: 0
                  }}>
                    {product.longDescription}
                  </pre>
                </div>
              )}
            </div>

            {/* Mennyiség választás */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Mennyiség (min. {product.minOrder} {product.unit})
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => setSelectedQuantity(Math.max(product.minOrder, selectedQuantity - 1))}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid #d1d5db',
                    background: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  value={selectedQuantity}
                  onChange={(e) => {
                    const value = Math.max(product.minOrder, Math.min(product.maxOrder, parseInt(e.target.value) || product.minOrder))
                    setSelectedQuantity(value)
                  }}
                  style={{
                    width: '80px',
                    height: '40px',
                    textAlign: 'center',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                  min={product.minOrder}
                  max={product.maxOrder}
                />
                <button
                  onClick={() => setSelectedQuantity(Math.min(product.maxOrder, selectedQuantity + 1))}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid #d1d5db',
                    background: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}
                >
                  +
                </button>
                <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '10px' }}>
                  {product.unit} (max. {product.maxOrder})
                </span>
              </div>
            </div>

            {/* Szállítási opciók */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#374151' }}>
                Átvételi lehetőségek
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {product.delivery.map((option, index) => (
                  <label key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px',
                    background: selectedDelivery === option.type ? '#f0fdf4' : '#f9fafb',
                    border: selectedDelivery === option.type ? '2px solid #16a34a' : '1px solid #e5e7eb',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="radio"
                      name="delivery"
                      value={option.type}
                      checked={selectedDelivery === option.type}
                      onChange={(e) => setSelectedDelivery(e.target.value)}
                      style={{ accentColor: '#16a34a' }}
                    />
                    <div>
                      <div style={{ fontWeight: '500', fontSize: '14px' }}>
                        {option.name} {option.price > 0 && `(+${option.price} Ft)`}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Vásárlási gombok */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              
              {/* ContactButton integrálása */}
              <ContactButton
                seller={sellerContact}
                productName={product.name}
                productId={product.id}
              />
              
              <button style={{
                width: '100%',
                padding: '15px',
                background: 'white',
                border: '2px solid #16a34a',
                color: '#16a34a',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                🛒 Kosárba ({(selectedQuantity * product.price).toLocaleString()} Ft)
              </button>
            </div>

            {/* Összesítő információk */}
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '12px',
              padding: '15px',
              fontSize: '14px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ color: '#6b7280' }}>Mennyiség:</span>
                <span style={{ fontWeight: '600' }}>{selectedQuantity} {product.unit}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ color: '#6b7280' }}>Egységár:</span>
                <span style={{ fontWeight: '600' }}>{product.price} Ft/{product.unit}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ color: '#6b7280' }}>Szállítás:</span>
                <span style={{ fontWeight: '600' }}>
                  {product.delivery.find(d => d.type === selectedDelivery)?.price || 0} Ft
                </span>
              </div>
              <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #bbf7d0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px' }}>
                <span style={{ fontWeight: '600', color: '#16a34a' }}>Összesen:</span>
                <span style={{ fontWeight: '700', color: '#16a34a' }}>
                  {(selectedQuantity * product.price + (product.delivery.find(d => d.type === selectedDelivery)?.price || 0)).toLocaleString()} Ft
                </span>
              </div>
            </div>

            {/* Tárolási információk */}
            {product.storageInstructions && (
              <div style={{
                background: '#fffbeb',
                border: '1px solid #fbbf24',
                borderRadius: '8px',
                padding: '15px',
                marginTop: '20px'
              }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#92400e', marginBottom: '5px' }}>
                  💡 Tárolási javaslat
                </h4>
                <p style={{ fontSize: '13px', color: '#92400e', margin: 0 }}>
                  {product.storageInstructions}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}