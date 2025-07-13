'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  
  // Mock felhasználó állapot - később API-ból jön
  const [isLoggedIn, setIsLoggedIn] = useState(false) // false = nincs bejelentkezve
 const [userType, setUserType] = useState<'producer' | 'casual_seller' | null>(null)


  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #fefcf3 50%, #fff7ed 100%)',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* Header */}
      <header style={{
        background: 'white',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '2px solid #f0fdf4'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '80px'
        }}>
          {/* Logo */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
              animation: 'float 3s ease-in-out infinite'
            }}>
              🧺
            </div>
            <span style={{
              fontSize: '28px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #16a34a, #059669)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              SzomszédKosár
            </span>
          </Link>

          {/* Navigation */}
          <nav style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            <Link href="/search" style={{
              color: '#374151',
              fontWeight: '600',
              textDecoration: 'none',
              fontSize: '16px',
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#16a34a'
              e.currentTarget.style.background = '#f0fdf4'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = '#374151'
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.transform = 'translateY(0)'
            }}>
              🔍 Böngészés
            </Link>
            
            <Link href="/feed" style={{
              color: '#374151',
              fontWeight: '600',
              textDecoration: 'none',
              fontSize: '16px',
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#16a34a'
              e.currentTarget.style.background = '#f0fdf4'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = '#374151'
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.transform = 'translateY(0)'
            }}>
              📰 Hírfolyam
            </Link>
            
            {/* Termék hozzáadása gomb - CSAK bejelentkezett felhasználóknak */}
            {isLoggedIn && (userType === 'producer' || userType === 'casual_seller') && (
              <Link href="/add-product" style={{
                color: '#374151',
                fontWeight: '600',
                textDecoration: 'none',
                fontSize: '16px',
                padding: '8px 16px',
                borderRadius: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#16a34a'
                e.currentTarget.style.background = '#f0fdf4'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#374151'
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }}>
                ➕ Termék hozzáadása
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {!isLoggedIn ? (
              // Nem bejelentkezett felhasználó
              <>
                <Link href="/login" style={{
                  color: '#16a34a',
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '16px',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  transition: 'all 0.2s ease',
                  border: '2px solid transparent'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f0fdf4'
                  e.currentTarget.style.border = '2px solid #16a34a'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.border = '2px solid transparent'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}>
                  Bejelentkezés
                </Link>
                <Link href="/register" style={{
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '16px',
                  boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(22, 163, 74, 0.4)'
                  e.currentTarget.style.background = 'linear-gradient(135deg, #15803d, #166534)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 163, 74, 0.3)'
                  e.currentTarget.style.background = 'linear-gradient(135deg, #16a34a, #15803d)'
                }}>
                  Regisztráció
                </Link>
              </>
            ) : (
              // Bejelentkezett felhasználó
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  👋 Szia, Kiss Margit!
                </span>
                <Link href="/profile" style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '14px'
                }}>
                  Profil
                </Link>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid #e5e7eb',
                    color: '#6b7280',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Kijelentkezés
                </button>
              </div>
            )}
          </div>
          
          {/* Teszt gombok (csak fejlesztéshez) */}
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            background: 'white',
            padding: '12px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            fontSize: '12px'
          }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>Teszt módok:</span>
            <button onClick={() => setIsLoggedIn(false)} style={{
              background: '#f3f4f6', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer'
            }}>
              Vendég
            </button>
            <button onClick={() => {
              setIsLoggedIn(true)
              setUserType('producer')
            }} style={{
              background: '#dcfce7', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer'
            }}>
              Őstermelő
            </button>
            <button onClick={() => {
              setIsLoggedIn(true)
              setUserType('casual_seller')
            }} style={{
              background: '#fef3c7', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer'
            }}>
              Magánszemély
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        padding: '80px 16px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(32px, 8vw, 64px)',
          fontWeight: '800',
          color: '#1f2937',
          marginBottom: '24px',
          lineHeight: '1.1',
          letterSpacing: '-1px'
        }}>
          Friss, helyi, házias
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #16a34a, #059669)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            termékek!
          </span>
        </h1>
        
        <p style={{
          fontSize: '22px',
          color: '#6b7280',
          marginBottom: '64px',
          maxWidth: '600px',
          margin: '0 auto 64px',
          fontWeight: '500'
        }}>
          Közvetlenül a termelőktől és környékbeli árusoktól
        </p>

        {/* Hero kép */}
        <div style={{
          maxWidth: '700px',
          height: '500px',
          margin: '0 auto 64px',
          borderRadius: '32px',
          backgroundImage: 'url(/images/hero-image.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          border: '4px solid #dcfce7',
          boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(240,253,244,0.1) 100%)',
            borderRadius: '28px'
          }}></div>
        </div>

        {/* Search Bar */}
        <div style={{
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            background: 'white',
            borderRadius: '24px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
            border: '3px solid #f0fdf4',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.2)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.15)'
          }}>
            <input
              type="text"
              placeholder="Mit keresel? (pl. meggy, lekvár, sajt...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: '24px 32px',
                border: 'none',
                outline: 'none',
                fontSize: '18px',
                background: 'transparent',
                color: '#1f2937',
                fontWeight: '500'
              }}
            />
            <button style={{
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              color: 'white',
              border: 'none',
              padding: '24px 32px',
              cursor: 'pointer',
              fontSize: '24px',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #15803d, #166534)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #16a34a, #15803d)'
            }}>
              🔍
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 16px 80px'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#1f2937',
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          Kategóriák
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px'
        }}>
          {[
            { name: 'Őstermelők termékei', emoji: '🥕', gradient: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)' },
            { name: 'Elérhető a közeledben', emoji: '📍', gradient: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)' },
            { name: 'Lekvár és befőttek', emoji: '🍯', gradient: 'linear-gradient(135deg, #FEF2F2, #FECACA)' },
            { name: 'Kézműves szappanok', emoji: '🧼', gradient: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)' }
          ].map((category, index) => (
            <div key={index} style={{
              background: category.gradient,
              borderRadius: '24px',
              padding: '40px 24px',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
              border: '2px solid white',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '36px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
              }}>
                {category.emoji}
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1f2937',
                margin: 0,
                lineHeight: '1.4'
              }}>
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px 100px'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#1f2937',
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          Kiemelt termékek
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          {[
            { name: 'Meggy', price: '800 Ft/kg', seller: 'Marika Néni', location: 'Balatonfüred', emoji: '🍒', rating: 4.9 },
            { name: 'Meggyszörp', price: '1200 Ft/üveg', seller: 'Marika Néni', location: 'Balatonfüred', emoji: '🧃', rating: 4.8 },
            { name: 'Baracklekvár', price: '1000 Ft/üveg', seller: 'Kiss Margit', location: 'Jaszberény', emoji: '🍑', rating: 4.7 },
            { name: 'Összibarack', price: '600 Ft/kg', seller: 'Szabó Anna', location: 'Esztergom', emoji: '🍑', rating: 4.9 }
          ].map((product, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
              border: '2px solid #f8fafc',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px)'
              e.currentTarget.style.boxShadow = '0 20px 48px rgba(0, 0, 0, 0.15)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.1)'
            }}>
              
              <div style={{
                height: '220px',
                background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '80px',
                position: 'relative'
              }}>
                {product.emoji}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'white',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}>
                  <span style={{ fontSize: '14px' }}>⭐</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                    {product.rating}
                  </span>
                </div>
              </div>
              
              <div style={{ padding: '28px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px'
                }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1f2937',
                    margin: 0
                  }}>
                    {product.name}
                  </h3>
                  <span style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    color: '#16a34a',
                    background: '#f0fdf4',
                    padding: '8px 12px',
                    borderRadius: '12px'
                  }}>
                    {product.price}
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <span style={{ fontSize: '18px' }}>👤</span>
                  <span style={{ color: '#6b7280', fontSize: '16px', fontWeight: '500' }}>
                    {product.seller}
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '18px' }}>📍</span>
                  <span style={{ color: '#6b7280', fontSize: '16px', fontWeight: '500' }}>
                    {product.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #1f2937, #111827)',
        color: 'white',
        padding: '64px 16px 32px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '32px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              🧺
            </div>
            <span style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'white'
            }}>
              SzomszédKosár
            </span>
          </div>
          
          <p style={{
            color: '#9ca3af',
            marginBottom: '32px',
            fontSize: '18px'
          }}>
            Helyi termékek, közösségi kapcsolatok
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            marginBottom: '32px',
            flexWrap: 'wrap'
          }}>
            {['Rólunk', 'ÁSZF', 'Adatvédelem', 'Kapcsolat'].map((link, index) => (
              <a key={index} href="#" style={{ 
                color: '#d1d5db', 
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#16a34a'}
              onMouseOut={(e) => e.currentTarget.style.color = '#d1d5db'}>
                {link}
              </a>
            ))}
          </div>
          
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0
          }}>
            © 2025 SzomszédKosár. Minden jog fenntartva.
          </p>
        </div>
      </footer>
    </div>
  )
}