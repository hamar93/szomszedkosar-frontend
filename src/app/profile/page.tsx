// src/app/profile/page.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'

// Mock felhasználó adatok
const mockUser = {
  name: 'Kiss Margit',
  avatar: '👵',
  type: 'producer', // 'producer' | 'casual_seller' | 'buyer'
  location: 'Jaszberény',
  memberSince: '2023',
  verified: true,
  rating: 4.8,
  totalSales: 234,
  totalReviews: 89,
  phone: '+36 20 456 7890',
  email: 'kiss.margit@email.com',
  bio: 'Házi készítésű lekvárok, szörpök és házi sajt készítésével foglalkozom már 15 éve. Minden termékeket házi körülmények között, természetes alapanyagokból készítek.',
  
  // NAV szabályok és limitek
  limits: {
    monthlyAds: 2, // eddig ennyi hirdetést tett fel ebben a hónapban
    maxMonthlyAds: 5, // max havi hirdetés (casual_seller esetén)
    monthlyPushes: 1, // eddig ennyi push értesítést küldött
    maxMonthlyPushes: 3, // max havi push (casual_seller esetén)
    activeAds: 1, // jelenleg aktív hirdetések
    maxActiveAds: 3 // max egyidejű aktív hirdetés (casual_seller esetén)
  },
  
  stats: {
    totalEarnings: 125000,
    avgResponseTime: '2 óra',
    deliveryRating: 4.9,
    qualityRating: 4.7
  }
}

// Mock termékek
const mockProducts = [
  {
    id: '1',
    name: 'Házi meggylekvár',
    price: 1200,
    unit: 'üveg',
    emoji: '🍯',
    status: 'active',
    views: 156,
    interested: 23,
    sold: 45,
    createdAt: '2024-06-15',
    urgent: false
  },
  {
    id: '2',
    name: 'Bio sajt',
    price: 2800,
    unit: 'kg',
    emoji: '🧀',
    status: 'active',
    views: 89,
    interested: 12,
    sold: 8,
    createdAt: '2024-06-10',
    urgent: true
  },
  {
    id: '3',
    name: 'Málna szörp',
    price: 900,
    unit: 'üveg',
    emoji: '🧃',
    status: 'sold_out',
    views: 234,
    interested: 45,
    sold: 67,
    createdAt: '2024-06-01',
    urgent: false
  }
]

// Mock értékelések
const mockReviews = [
  {
    id: '1',
    reviewer: 'Nagy Péter',
    avatar: '👨',
    rating: 5,
    date: '2024-06-18',
    product: 'Házi meggylekvár',
    comment: 'Fantasztikus minőségű lekvár! Már többször rendeltem, mindig tökéletes.',
    verified: true
  },
  {
    id: '2',
    reviewer: 'Kovács Anna',
    avatar: '👩',
    rating: 5,
    date: '2024-06-15',
    product: 'Bio sajt',
    comment: 'Nagyon finom sajt, természetes ízekkel. Ajánlom mindenkinek!',
    verified: true
  }
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'products' | 'reviews' | 'stats' | 'settings'>('products')
  const [productFilter, setProductFilter] = useState<'all' | 'active' | 'sold_out'>('all')

  const filteredProducts = mockProducts.filter(product => {
    if (productFilter === 'all') return true
    return product.status === productFilter
  })

  const canAddProduct = () => {
    if (mockUser.type === 'producer') return true
    if (mockUser.type === 'casual_seller') {
      return mockUser.limits.monthlyAds < mockUser.limits.maxMonthlyAds &&
             mockUser.limits.activeAds < mockUser.limits.maxActiveAds
    }
    return false
  }

  const getRemainingLimits = () => {
    if (mockUser.type === 'producer') return null
    
    return {
      monthlyAds: mockUser.limits.maxMonthlyAds - mockUser.limits.monthlyAds,
      monthlyPushes: mockUser.limits.maxMonthlyPushes - mockUser.limits.monthlyPushes,
      activeAds: mockUser.limits.maxActiveAds - mockUser.limits.activeAds
    }
  }

  const remainingLimits = getRemainingLimits()

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #fefcf3 50%, #fff7ed 100%)'
    }}>
      
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px 16px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#1f2937',
                margin: '0 0 8px 0'
              }}>
                Profil
              </h1>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#6b7280'
              }}>
                <Link href="/" style={{ color: '#16a34a', textDecoration: 'none' }}>Főoldal</Link>
                <span>→</span>
                <span>Profil</span>
              </div>
            </div>
            
            {canAddProduct() && (
              <Link
                href="/add-product"
                style={{
                  background: '#16a34a',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)'
                }}
              >
                ➕ Új termék
              </Link>
            )}
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 16px'
      }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '350px 1fr',
          gap: '32px'
        }}>
          
          {/* Bal oldal - profil info */}
          <div>
            
            {/* Profil kártya */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              marginBottom: '24px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              
              {/* Avatar és alapadatok */}
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                margin: '0 auto 20px'
              }}>
                {mockUser.avatar}
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: 0
                }}>
                  {mockUser.name}
                </h2>
                {mockUser.verified && (
                  <span style={{
                    background: '#16a34a',
                    color: 'white',
                    fontSize: '12px',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontWeight: '600'
                  }}>
                    ✓ Ellenőrzött
                  </span>
                )}
              </div>
              
              <div style={{
                fontSize: '16px',
                color: '#6b7280',
                marginBottom: '16px'
              }}>
                📍 {mockUser.location}
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '20px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#16a34a'
                  }}>
                    {mockUser.rating}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    ⭐ Értékelés
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#16a34a'
                  }}>
                    {mockUser.totalSales}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    📦 Eladás
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#16a34a'
                  }}>
                    {mockUser.memberSince}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    📅 Tag óta
                  </div>
                </div>
              </div>
              
              <p style={{
                fontSize: '14px',
                color: '#4b5563',
                lineHeight: '1.5',
                margin: '0 0 20px 0'
              }}>
                {mockUser.bio}
              </p>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <button style={{
                  background: '#16a34a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  💬 Üzenet küldése
                </button>
                <button style={{
                  background: 'white',
                  color: '#16a34a',
                  border: '2px solid #16a34a',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  📞 {mockUser.phone}
                </button>
              </div>
            </div>
            
            {/* NAV szabályok (csak casual_seller esetén) */}
            {mockUser.type === 'casual_seller' && remainingLimits && (
              <div style={{
                background: '#fef3c7',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '24px',
                border: '2px solid #fbbf24'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#92400e',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  ⚖️ NAV szabályok
                </h3>
                
                <div style={{
                  fontSize: '14px',
                  color: '#92400e',
                  lineHeight: '1.5'
                }}>
                  <div style={{ marginBottom: '8px' }}>
                    📅 <strong>Havi hirdetések:</strong> {mockUser.limits.monthlyAds}/{mockUser.limits.maxMonthlyAds} 
                    ({remainingLimits.monthlyAds} maradt)
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    📢 <strong>Havi push értesítések:</strong> {mockUser.limits.monthlyPushes}/{mockUser.limits.maxMonthlyPushes} 
                    ({remainingLimits.monthlyPushes} maradt)
                  </div>
                  <div>
                    📋 <strong>Aktív hirdetések:</strong> {mockUser.limits.activeAds}/{mockUser.limits.maxActiveAds} 
                    ({remainingLimits.activeAds} maradt)
                  </div>
                </div>
                
                {(remainingLimits.monthlyAds === 0 || remainingLimits.activeAds === 0) && (
                  <div style={{
                    marginTop: '12px',
                    padding: '12px',
                    background: '#fee2e2',
                    borderRadius: '8px',
                    border: '1px solid #fecaca'
                  }}>
                    <p style={{
                      fontSize: '12px',
                      color: '#dc2626',
                      margin: 0
                    }}>
                      ⚠️ Elérted a havi limitet. További hirdetésekhez regisztrálj őstermelőként vagy vállalkozóként.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Gyors statisztikák */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '16px'
              }}>
                📊 Statisztikák
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '14px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#6b7280' }}>💰 Összes bevétel:</span>
                  <span style={{ fontWeight: '600', color: '#16a34a' }}>
                    {mockUser.stats.totalEarnings.toLocaleString()} Ft
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#6b7280' }}>⏱️ Átlag válaszidő:</span>
                  <span style={{ fontWeight: '600' }}>{mockUser.stats.avgResponseTime}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#6b7280' }}>🚚 Szállítás értékelés:</span>
                  <span style={{ fontWeight: '600' }}>{mockUser.stats.deliveryRating} ⭐</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#6b7280' }}>✨ Minőség értékelés:</span>
                  <span style={{ fontWeight: '600' }}>{mockUser.stats.qualityRating} ⭐</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Jobb oldal - tartalom */}
          <div>
            
            {/* Tabok */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '8px',
              marginBottom: '24px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              gap: '8px'
            }}>
              {[
                { key: 'products', label: '📦 Termékeim', count: mockProducts.length },
                { key: 'reviews', label: '💬 Értékelések', count: mockReviews.length },
                { key: 'stats', label: '📊 Részletes statisztikák', count: null },
                { key: 'settings', label: '⚙️ Beállítások', count: null }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  style={{
                    flex: 1,
                    background: activeTab === tab.key ? '#16a34a' : 'transparent',
                    color: activeTab === tab.key ? 'white' : '#6b7280',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span style={{
                      background: activeTab === tab.key ? 'rgba(255,255,255,0.2)' : '#e5e7eb',
                      color: activeTab === tab.key ? 'white' : '#6b7280',
                      borderRadius: '12px',
                      padding: '2px 6px',
                      fontSize: '12px'
                    }}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Termékek tab */}
            {activeTab === 'products' && (
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
              }}>
                
                {/* Termék szűrők */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '12px'
                  }}>
                    {[
                      { key: 'all', label: 'Összes', count: mockProducts.length },
                      { key: 'active', label: 'Aktív', count: mockProducts.filter(p => p.status === 'active').length },
                      { key: 'sold_out', label: 'Elfogyott', count: mockProducts.filter(p => p.status === 'sold_out').length }
                    ].map((filter) => (
                      <button
                        key={filter.key}
                        onClick={() => setProductFilter(filter.key as any)}
                        style={{
                          background: productFilter === filter.key ? '#dcfce7' : '#f8fafc',
                          color: productFilter === filter.key ? '#15803d' : '#6b7280',
                          border: '2px solid',
                          borderColor: productFilter === filter.key ? '#16a34a' : '#e5e7eb',
                          borderRadius: '8px',
                          padding: '8px 16px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        {filter.label}
                        <span style={{
                          background: productFilter === filter.key ? '#16a34a' : '#e5e7eb',
                          color: productFilter === filter.key ? 'white' : '#6b7280',
                          borderRadius: '12px',
                          padding: '2px 6px',
                          fontSize: '12px'
                        }}>
                          {filter.count}
                        </span>
                      </button>
                    ))}
                  </div>
                  
                  {canAddProduct() && (
                    <Link
                      href="/add-product"
                      style={{
                        background: '#16a34a',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      ➕ Új termék
                    </Link>
                  )}
                </div>
                
                {/* Termékek listája */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  {filteredProducts.map((product) => (
                    <div key={product.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      padding: '20px',
                      border: '2px solid #f3f4f6',
                      borderRadius: '16px',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#16a34a'
                      e.currentTarget.style.background = '#f8fafc'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = '#f3f4f6'
                      e.currentTarget.style.background = 'white'
                    }}>
                      
                      {/* Státusz címkék */}
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        display: 'flex',
                        gap: '4px'
                      }}>
                        {product.urgent && (
                          <span style={{
                            background: '#fbbf24',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '10px',
                            fontWeight: '600'
                          }}>
                            🔥 SÜRGŐS
                          </span>
                        )}
                        <span style={{
                          background: product.status === 'active' ? '#16a34a' : product.status === 'sold_out' ? '#dc2626' : '#6b7280',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '10px',
                          fontWeight: '600'
                        }}>
                          {product.status === 'active' ? 'AKTÍV' : product.status === 'sold_out' ? 'ELFOGYOTT' : 'INAKTÍV'}
                        </span>
                      </div>
                      
                      {/* Termék emoji */}
                      <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '40px',
                        flexShrink: 0
                      }}>
                        {product.emoji}
                      </div>
                      
                      {/* Termék információ */}
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#1f2937',
                          marginBottom: '8px'
                        }}>
                          {product.name}
                        </h4>
                        
                        <div style={{
                          fontSize: '20px',
                          fontWeight: '700',
                          color: '#16a34a',
                          marginBottom: '12px'
                        }}>
                          {product.price} Ft/{product.unit}
                        </div>
                        
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                          gap: '16px',
                          fontSize: '14px',
                          color: '#6b7280'
                        }}>
                          <div>👀 {product.views} megtekintés</div>
                          <div>❤️ {product.interested} érdeklődő</div>
                          <div>📦 {product.sold} eladva</div>
                          <div>📅 {product.createdAt}</div>
                        </div>
                      </div>
                      
                      {/* Műveletek */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        alignItems: 'flex-end'
                      }}>
                        <Link
                          href={`/product/${product.id}`}
                          style={{
                            background: '#f3f4f6',
                            color: '#374151',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '600',
                            textDecoration: 'none'
                          }}
                        >
                          👁️ Megtekintés
                        </Link>
                        <button style={{
                          background: '#16a34a',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}>
                          ✏️ Szerkesztés
                        </button>
                        {product.status === 'active' && (
                          <button style={{
                            background: '#dc2626',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}>
                            🗑️ Törlés
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {filteredProducts.length === 0 && (
                    <div style={{
                      textAlign: 'center',
                      padding: '60px 20px',
                      color: '#6b7280'
                    }}>
                      <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
                      <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
                        Nincs termék
                      </h3>
                      <p>Még nem adtál fel terméket ebben a kategóriában.</p>
                      {canAddProduct() && (
                        <Link
                          href="/add-product"
                          style={{
                            background: '#16a34a',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            display: 'inline-block',
                            marginTop: '16px'
                          }}
                        >
                          ➕ Első termék hozzáadása
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Értékelések tab */}
            {activeTab === 'reviews' && (
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '24px'
                }}>
                  Értékelések ({mockReviews.length})
                </h3>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
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
                                {review.reviewer}
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
                                  ✓ Ellenőrzött
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
                        
                        <span style={{
                          background: '#f0fdf4',
                          color: '#16a34a',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {review.product}
                        </span>
                      </div>
                      
                      <p style={{
                        fontSize: '15px',
                        color: '#4b5563',
                        lineHeight: '1.6',
                        margin: 0
                      }}>
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Statisztikák tab */}
            {activeTab === 'stats' && (
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '24px'
                }}>
                  Részletes statisztikák
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '20px',
                  marginBottom: '32px'
                }}>
                  {[
                    { title: 'Havi bevétel', value: '45,000 Ft', change: '+12%', color: '#16a34a', icon: '💰' },
                    { title: 'Új vásárlók', value: '23', change: '+8%', color: '#3b82f6', icon: '👥' },
                    { title: 'Átlag rendelésérték', value: '2,800 Ft', change: '+5%', color: '#8b5cf6', icon: '🛒' },
                    { title: 'Visszatérő vásárlók', value: '67%', change: '+15%', color: '#f59e0b', icon: '🔄' }
                  ].map((stat, index) => (
                    <div key={index} style={{
                      background: '#f8fafc',
                      borderRadius: '12px',
                      padding: '20px',
                      border: `2px solid ${stat.color}20`
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px'
                      }}>
                        <span style={{ fontSize: '24px' }}>{stat.icon}</span>
                        <span style={{
                          background: stat.color,
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {stat.change}
                        </span>
                      </div>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: stat.color,
                        marginBottom: '4px'
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#6b7280',
                        fontWeight: '600'
                      }}>
                        {stat.title}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '12px',
                  padding: '20px'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '16px'
                  }}>
                    📈 Havi teljesítmény
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    Itt jelennek meg a részletes grafikonok és elemzések a forgalmadról.
                  </p>
                </div>
              </div>
            )}
            
            {/* Beállítások tab */}
            {activeTab === 'settings' && (
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '24px'
                }}>
                  Beállítások
                </h3>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px'
                }}>
                  
                  {/* Profil beállítások */}
                  <div style={{
                    padding: '20px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px'
                  }}>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '16px'
                    }}>
                      👤 Profil információk
                    </h4>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '16px'
                    }}>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#374151',
                          marginBottom: '6px'
                        }}>
                          Név
                        </label>
                        <input
                          type="text"
                          value={mockUser.name}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#374151',
                          marginBottom: '6px'
                        }}>
                          Telefon
                        </label>
                        <input
                          type="text"
                          value={mockUser.phone}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                    </div>
                    
                    <div style={{ marginTop: '16px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '6px'
                      }}>
                        Bemutatkozás
                      </label>
                      <textarea
                        value={mockUser.bio}
                        rows={3}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          resize: 'vertical'
                        }}
                      />
                    </div>
                    
                    <button style={{
                      background: '#16a34a',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginTop: '16px'
                    }}>
                      Mentés
                    </button>
                  </div>
                  
                  {/* Értesítési beállítások */}
                  <div style={{
                    padding: '20px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px'
                  }}>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '16px'
                    }}>
                      🔔 Értesítések
                    </h4>
                    
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}>
                      {[
                        { label: 'Email értesítések új üzenetekről', checked: true },
                        { label: 'Push értesítések mobil alkalmazásban', checked: false },
                        { label: 'Heti összesítő email', checked: true },
                        { label: 'Értékelési emlékeztetők', checked: false }
                      ].map((setting, index) => (
                        <label key={index} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          cursor: 'pointer'
                        }}>
                          <input
                            type="checkbox"
                            defaultChecked={setting.checked}
                            style={{ accentColor: '#16a34a' }}
                          />
                          <span style={{ fontSize: '14px' }}>{setting.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Adatvédelem */}
                  <div style={{
                    padding: '20px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px'
                  }}>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '16px'
                    }}>
                      🔒 Adatvédelem és biztonság
                    </h4>
                    
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}>
                      <button style={{
                        background: 'white',
                        color: '#374151',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}>
                        🔑 Jelszó megváltoztatása
                      </button>
                      <button style={{
                        background: 'white',
                        color: '#374151',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}>
                        📄 Adatletöltés (GDPR)
                      </button>
                      <button style={{
                        background: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}>
                        🗑️ Fiók törlése
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}