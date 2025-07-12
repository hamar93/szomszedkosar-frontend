// src/app/product/[id]/page.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'

// Mock termék adatok (ez később API-ból jön)
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
        phone: '+36 20 123 4567'
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

// Mock értékelések
const mockReviews = [
  {
    id: '1',
    user: 'Kovács Anna',
    avatar: '👩',
    rating: 5,
    date: '2024-06-18',
    comment: 'Fantasztikus minőségű meggy! Nagyon édes és zamatos, tökéletes volt a lekvárhoz.',
    helpful: 12,
    verified: true
  },
  {
    id: '2',
    user: 'Nagy Péter',
    avatar: '👨',
    rating: 5,
    date: '2024-06-15',
    comment: 'Már többször vásároltam Marika nénitől, mindig kiváló minőségű termékeket ad.',
    helpful: 8,
    verified: true
  },
  {
    id: '3',
    user: 'Szabó Eszter',
    avatar: '👩',
    rating: 4,
    date: '2024-06-12',
    comment: 'Jó minőségű meggy, kicsit savanyú volt nekem, de lehet hogy ez a fajta jellemzője.',
    helpful: 3,
    verified: false
  }
]

import { type Metadata } from 'next'

interface PageProps {
  params: {
    id: string
  }
}
type Props = {
  params: {
    id: string
  }
}

export default function ProductDetailPage({ params }: Props) {

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

  const totalPrice = product.price * selectedQuantity
  const selectedDeliveryOption = product.delivery.find(d => d.type === selectedDelivery)
  const finalPrice = totalPrice + (selectedDeliveryOption?.price || 0)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #fefcf3 50%, #fff7ed 100%)'
    }}>
      
      {/* Breadcrumb */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <Link href="/" style={{ color: '#16a34a', textDecoration: 'none' }}>Főoldal</Link>
          <span>→</span>
          <Link href="/search" style={{ color: '#16a34a', textDecoration: 'none' }}>Böngészés</Link>
          <span>→</span>
          <span>{product.name}</span>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 16px'
      }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '40px',
          marginBottom: '40px'
        }}>
          
          {/* Bal oldal - termék info */}
          <div>
            
            {/* Termék kép és címkék */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              marginBottom: '24px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
              position: 'relative'
            }}>
              
              {/* Címkék */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {product.urgent && (
                  <span style={{
                    background: '#fbbf24',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '8px',
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
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    🌱 BIO
                  </span>
                )}
              </div>
              
              {/* Értékelés */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#f8fafc',
                borderRadius: '8px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ fontSize: '16px' }}>⭐</span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  {product.rating}
                </span>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>
                  ({product.reviews} értékelés)
                </span>
              </div>
              
              {/* Nagy termék emoji/kép */}
              <div style={{
                textAlign: 'center',
                padding: '40px'
              }}>
                <div style={{
                  fontSize: '8rem',
                  marginBottom: '20px'
                }}>
                  {product.emoji}
                </div>
                <h1 style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '12px'
                }}>
                  {product.name}
                </h1>
                <p style={{
                  fontSize: '18px',
                  color: '#6b7280',
                  marginBottom: '20px'
                }}>
                  {product.description}
                </p>
              </div>
            </div>
            
            {/* Részletes leírás */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '16px'
              }}>
                Részletes leírás
              </h3>
              
              <div style={{
                fontSize: '15px',
                color: '#4b5563',
                lineHeight: '1.6',
                whiteSpace: 'pre-line'
              }}>
                {showFullDescription ? product.longDescription : product.longDescription.substring(0, 200) + '...'}
              </div>
              
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#16a34a',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '12px',
                  fontSize: '14px'
                }}
              >
                {showFullDescription ? 'Kevesebb ↑' : 'Több részlet ↓'}
              </button>
            </div>
            
            {/* Tároló információk */}
            <div style={{
              background: '#fef3c7',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '24px',
              border: '2px solid #fbbf24'
            }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#92400e',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                📦 Tárolási információk
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#92400e',
                margin: 0
              }}>
                {product.storageInstructions}
              </p>
              <p style={{
                fontSize: '14px',
                color: '#92400e',
                margin: '8px 0 0 0'
              }}>
                🗓️ Szüret dátuma: {product.harvestDate} • Eltarthatóság: {product.expiryDays} nap
              </p>
            </div>
          </div>
          
          {/* Jobb oldal - vásárlás */}
          <div>
            
            {/* Vásárlási panel */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
              position: 'sticky',
              top: '100px'
            }}>
              
              {/* Ár */}
              <div style={{
                textAlign: 'center',
                marginBottom: '24px',
                padding: '20px',
                background: '#f0fdf4',
                borderRadius: '12px'
              }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#16a34a',
                  marginBottom: '4px'
                }}>
                  {product.price} Ft
                </div>
                <div style={{
                  fontSize: '16px',
                  color: '#6b7280'
                }}>
                  / {product.unit}
                </div>
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
                  Mennyiség ({product.unit})
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <button
                    onClick={() => setSelectedQuantity(Math.max(product.minOrder, selectedQuantity - 1))}
                    disabled={selectedQuantity <= product.minOrder}
                    style={{
                      background: selectedQuantity <= product.minOrder ? '#f3f4f6' : '#16a34a',
                      color: selectedQuantity <= product.minOrder ? '#9ca3af' : 'white',
                      border: 'none',
                      borderRadius: '8px',
                      width: '40px',
                      height: '40px',
                      cursor: selectedQuantity <= product.minOrder ? 'not-allowed' : 'pointer',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}
                  >
                    −
                  </button>
                  
                  <input
                    type="number"
                    value={selectedQuantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || product.minOrder
                      setSelectedQuantity(Math.min(product.maxOrder, Math.max(product.minOrder, value)))
                    }}
                    min={product.minOrder}
                    max={product.maxOrder}
                    style={{
                      width: '80px',
                      padding: '8px',
                      textAlign: 'center',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  />
                  
                  <button
                    onClick={() => setSelectedQuantity(Math.min(product.maxOrder, selectedQuantity + 1))}
                    disabled={selectedQuantity >= product.maxOrder}
                    style={{
                      background: selectedQuantity >= product.maxOrder ? '#f3f4f6' : '#16a34a',
                      color: selectedQuantity >= product.maxOrder ? '#9ca3af' : 'white',
                      border: 'none',
                      borderRadius: '8px',
                      width: '40px',
                      height: '40px',
                      cursor: selectedQuantity >= product.maxOrder ? 'not-allowed' : 'pointer',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}
                  >
                    +
                  </button>
                </div>
                <p style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  margin: '8px 0 0 0'
                }}>
                  Min: {product.minOrder} {product.unit} • Max: {product.maxOrder} {product.unit}
                </p>
              </div>
              
              {/* Szállítási mód */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '12px'
                }}>
                  Átvétel módja
                </label>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {product.delivery.map((option) => (
                    <label
                      key={option.type}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderColor: selectedDelivery === option.type ? '#16a34a' : '#e5e7eb',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: selectedDelivery === option.type ? '#f0fdf4' : 'white'
                      }}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={option.type}
                        checked={selectedDelivery === option.type}
                        onChange={(e) => setSelectedDelivery(e.target.value)}
                        style={{ accentColor: '#16a34a' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1f2937',
                          marginBottom: '2px'
                        }}>
                          {option.name} {option.price > 0 && `(+${option.price} Ft)`}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: '#6b7280'
                        }}>
                          {option.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Összesítő */}
              <div style={{
                background: '#f8fafc',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '14px',
                  marginBottom: '4px'
                }}>
                  <span>Termék ({selectedQuantity} {product.unit}):</span>
                  <span>{totalPrice} Ft</span>
                </div>
                {selectedDeliveryOption && selectedDeliveryOption.price > 0 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    marginBottom: '4px'
                  }}>
                    <span>{selectedDeliveryOption.name}:</span>
                    <span>{selectedDeliveryOption.price} Ft</span>
                  </div>
                )}
                <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#16a34a'
                }}>
                  <span>Összesen:</span>
                  <span>{finalPrice} Ft</span>
                </div>
              </div>
              
              {/* Vásárlás gombok */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <button style={{
                  background: '#16a34a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#15803d'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#16a34a'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}>
                  🛒 Kosárba tesz
                </button>
                
                <button style={{
                  background: 'white',
                  color: '#16a34a',
                  border: '2px solid #16a34a',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f0fdf4'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'white'
                }}>
                  💬 Üzenet küldése
                </button>
              </div>
            </div>
            
            {/* Eladó információ */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '16px'
              }}>
                Eladó információk
              </h3>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
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
                
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px'
                  }}>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      {product.seller.name}
                    </span>
                    {product.seller.verified && (
                      <span style={{
                        background: '#16a34a',
                        color: 'white',
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontWeight: '600'
                      }}>
                        ✓ Ellenőrzött
                      </span>
                    )}
                  </div>
                  
                  <div style={{
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    📍 {product.seller.location} ({product.distance})
                  </div>
                </div>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                fontSize: '14px',
                color: '#6b7280'
              }}>
                <div>⭐ {product.seller.rating} értékelés</div>
                <div>📦 {product.seller.totalSales} eladás</div>
                <div>📅 Tag: {product.seller.memberSince} óta</div>
                <div>📞 {product.seller.phone}</div>
              </div>
              
              <div style={{
                display: 'flex',
                gap: '8px',
                marginTop: '16px'
              }}>
                <Link
                  href={`/profile/${product.seller.name}`}
                  style={{
                    flex: 1,
                    background: '#f3f4f6',
                    color: '#374151',
                    textAlign: 'center',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}
                >
                  👤 Profil megtekintése
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Alsó szekció - értékelések, táplálkozási info */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
        }}>
          
          {/* Tabok */}
          <div style={{
            display: 'flex',
            gap: '32px',
            marginBottom: '24px',
            borderBottom: '2px solid #f3f4f6'
          }}>
            <button
              onClick={() => {
                setShowReviews(true)
                setShowNutrition(false)
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 0',
                fontSize: '16px',
                fontWeight: '600',
                color: showReviews ? '#16a34a' : '#6b7280',
                cursor: 'pointer',
                borderBottom: showReviews ? '3px solid #16a34a' : '3px solid transparent'
              }}
            >
              💬 Értékelések ({mockReviews.length})
            </button>
            
            <button
              onClick={() => {
                setShowReviews(false)
                setShowNutrition(true)
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 0',
                fontSize: '16px',
                fontWeight: '600',
                color: showNutrition ? '#16a34a' : '#6b7280',
                cursor: 'pointer',
                borderBottom: showNutrition ? '3px solid #16a34a' : '3px solid transparent'
              }}
            >
              🥗 Táplálkozási érték
            </button>
          </div>
          
          {/* Értékelések */}
          {showReviews && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                marginBottom: '32px',
                padding: '20px',
                background: '#f8fafc',
                borderRadius: '12px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '48px',
                    fontWeight: '700',
                    color: '#16a34a',
                    marginBottom: '4px'
                  }}>
                    {product.rating}
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '4px'
                  }}>
                    {[1,2,3,4,5].map(star => (
                      <span key={star} style={{
                        color: star <= Math.floor(product.rating) ? '#fbbf24' : '#e5e7eb',
                        fontSize: '20px'
                      }}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    {product.reviews} értékelés
                  </div>
                </div>
                
                <div style={{ flex: 1 }}>
                  {[5,4,3,2,1].map(rating => {
                    const count = mockReviews.filter(r => Math.floor(r.rating) === rating).length
                    const percentage = (count / mockReviews.length) * 100
                    
                    return (
                      <div key={rating} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '4px'
                      }}>
                        <span style={{ fontSize: '14px', minWidth: '60px' }}>
                          {rating} csillag
                        </span>
                        <div style={{
                          flex: 1,
                          height: '8px',
                          background: '#e5e7eb',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${percentage}%`,
                            height: '100%',
                            background: '#fbbf24',
                            borderRadius: '4px'
                          }}></div>
                        </div>
                        <span style={{ fontSize: '14px', minWidth: '30px' }}>
                          {count}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {mockReviews.map((review) => (
                  <div key={review.id} style={{
                    padding: '20px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px'
                        }}>
                          {review.avatar}
                        </div>
                        
                        <div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '4px'
                          }}>
                            <span style={{
                              fontSize: '16px',
                              fontWeight: '600',
                              color: '#1f2937'
                            }}>
                              {review.user}
                            </span>
                            {review.verified && (
                              <span style={{
                                background: '#16a34a',
                                color: 'white',
                                fontSize: '10px',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontWeight: '600'
                              }}>
                                ✓ Ellenőrzött vásárlás
                              </span>
                            )}
                          </div>
                          
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <div style={{ display: 'flex' }}>
                              {[1,2,3,4,5].map(star => (
                                <span key={star} style={{
                                  color: star <= review.rating ? '#fbbf24' : '#e5e7eb',
                                  fontSize: '14px'
                                }}>
                                  ⭐
                                </span>
                              ))}
                            </div>
                            <span style={{
                              fontSize: '14px',
                              color: '#6b7280'
                            }}>
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p style={{
                      fontSize: '15px',
                      color: '#4b5563',
                      lineHeight: '1.6',
                      marginBottom: '12px'
                    }}>
                      {review.comment}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>
                      <button style={{
                        background: 'none',
                        border: 'none',
                        color: '#6b7280',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        👍 Hasznos ({review.helpful})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Táplálkozási információk */}
          {showNutrition && (
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '20px'
              }}>
                Táplálkozási érték (100g-ban)
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {[
                  { label: 'Kalória', value: product.nutritionInfo.calories, unit: 'kcal', color: '#f59e0b' },
                  { label: 'Fehérje', value: product.nutritionInfo.protein, unit: 'g', color: '#16a34a' },
                  { label: 'Szénhidrát', value: product.nutritionInfo.carbs, unit: 'g', color: '#3b82f6' },
                  { label: 'Zsír', value: product.nutritionInfo.fat, unit: 'g', color: '#ef4444' },
                  { label: 'Rost', value: product.nutritionInfo.fiber, unit: 'g', color: '#8b5cf6' },
                  { label: 'C-vitamin', value: product.nutritionInfo.vitaminC, unit: 'mg', color: '#f97316' }
                ].map((nutrient, index) => (
                  <div key={index} style={{
                    background: '#f8fafc',
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'center',
                    border: `2px solid ${nutrient.color}20`
                  }}>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: nutrient.color,
                      marginBottom: '4px'
                    }}>
                      {nutrient.value}{nutrient.unit}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      fontWeight: '600'
                    }}>
                      {nutrient.label}
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{
                background: '#f0fdf4',
                borderRadius: '12px',
                padding: '16px',
                marginTop: '20px',
                border: '2px solid #bbf7d0'
              }}>
                <p style={{
                  fontSize: '14px',
                  color: '#15803d',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  ℹ️ <strong>Megjegyzés:</strong> A táplálkozási értékek tájékoztató jellegűek és a termék fajtájától, érési fokától függően változhatnak.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Kapcsolódó termékek */}
        <div style={{
          marginTop: '40px'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            Hasonló termékek
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {[
              { name: 'Házi meggylekvár', price: 1200, unit: 'üveg', seller: 'Kiss Margit', emoji: '🍯' },
              { name: 'Meggy szörp', price: 800, unit: 'üveg', seller: 'Marika Néni', emoji: '🧃' },
              { name: 'Cseresznye', price: 900, unit: 'kg', seller: 'Szabó Kert', emoji: '🍒' }
            ].map((item, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '12px'
                }}>
                  {item.emoji}
                </div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  {item.name}
                </h4>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#16a34a',
                  marginBottom: '4px'
                }}>
                  {item.price} Ft/{item.unit}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  {item.seller}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}