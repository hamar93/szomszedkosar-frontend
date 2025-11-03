'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import LocationPrompt from '../components/LocationPrompt'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Mock felhasználó állapot - később API-ból jön
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<'producer' | 'casual_seller' | null>(null)

  // Mobil detektálás
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
          padding: '0 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '70px'
        }}>
          {/* Logo */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            flex: 1
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)'
            }}>
              🧺
            </div>
            <span style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #16a34a, #059669)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              SzomszédKosara
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ 
            display: isMobile ? 'none' : 'flex',
            gap: '32px', 
            alignItems: 'center'
          }}>
            <Link href="/search" style={{
              color: '#374151',
              fontWeight: '600',
              textDecoration: 'none',
              fontSize: '16px',
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
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
            }}>
              📰 Hírfolyam
            </Link>
            
            {isLoggedIn && (userType === 'producer' || userType === 'casual_seller') && (
              <Link href="/add-product" style={{
                color: '#374151',
                fontWeight: '600',
                textDecoration: 'none',
                fontSize: '16px',
                padding: '8px 16px',
                borderRadius: '8px',
                transition: 'all 0.2s ease'
              }}>
                ➕ Termék hozzáadása
              </Link>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div style={{ 
            display: isMobile ? 'none' : 'flex',
            gap: '16px', 
            alignItems: 'center' 
          }}>
            {!isLoggedIn ? (
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
                }}>
                  Regisztráció
                </Link>
              </>
            ) : (
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

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: isMobile ? 'block' : 'none',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div style={{
            display: isMobile ? 'block' : 'none',
            background: 'white',
            borderTop: '1px solid #f0fdf4',
            padding: '20px 16px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
          }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Link href="/search" style={{
                color: '#374151',
                fontWeight: '600',
                textDecoration: 'none',
                fontSize: '16px',
                padding: '12px 0',
                borderBottom: '1px solid #f3f4f6'
              }}>
                🔍 Böngészés
              </Link>
              
              <Link href="/feed" style={{
                color: '#374151',
                fontWeight: '600',
                textDecoration: 'none',
                fontSize: '16px',
                padding: '12px 0',
                borderBottom: '1px solid #f3f4f6'
              }}>
                📰 Hírfolyam
              </Link>
              
              {isLoggedIn && (userType === 'producer' || userType === 'casual_seller') && (
                <Link href="/add-product" style={{
                  color: '#374151',
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '16px',
                  padding: '12px 0',
                  borderBottom: '1px solid #f3f4f6'
                }}>
                  ➕ Termék hozzáadása
                </Link>
              )}
              
              {!isLoggedIn ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                  <Link href="/login" style={{
                    color: '#16a34a',
                    fontWeight: '600',
                    textDecoration: 'none',
                    fontSize: '16px',
                    padding: '12px 0',
                    textAlign: 'center',
                    border: '2px solid #16a34a',
                    borderRadius: '12px'
                  }}>
                    Bejelentkezés
                  </Link>
                  <Link href="/register" style={{
                    background: 'linear-gradient(135deg, #16a34a, #15803d)',
                    color: 'white',
                    padding: '12px 0',
                    borderRadius: '12px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    fontSize: '16px',
                    textAlign: 'center'
                  }}>
                    Regisztráció
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#374151',
                    textAlign: 'center'
                  }}>
                    👋 Szia, Kiss Margit!
                  </span>
                  <Link href="/profile" style={{
                    background: '#f3f4f6',
                    color: '#374151',
                    padding: '12px 0',
                    borderRadius: '8px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    fontSize: '14px',
                    textAlign: 'center'
                  }}>
                    Profil
                  </Link>
                  <button 
                    onClick={() => setIsLoggedIn(false)}
                    style={{
                      background: 'transparent',
                      border: '1px solid #e5e7eb',
                      color: '#6b7280',
                      padding: '12px 0',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Kijelentkezés
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section style={{
        padding: isMobile ? '40px 16px' : '80px 16px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: isMobile ? '32px' : '64px',
          fontWeight: '800',
          color: '#1f2937',
          marginBottom: '20px',
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
          fontSize: isMobile ? '18px' : '22px',
          color: '#6b7280',
          marginBottom: isMobile ? '40px' : '64px',
          maxWidth: '600px',
          margin: `0 auto ${isMobile ? '40px' : '64px'}`,
          fontWeight: '500',
          lineHeight: '1.5'
        }}>
          Közvetlenül a termelőktől és környékbeli árusoktól
        </p>

        {/* Hero kép */}
        <div style={{
          maxWidth: isMobile ? '300px' : '700px',
          height: isMobile ? '250px' : '500px',
          margin: `0 auto ${isMobile ? '40px' : '64px'}`,
          borderRadius: isMobile ? '16px' : '32px',
          backgroundImage: 'url(/images/hero-image.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          border: '4px solid #dcfce7',
          boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(240,253,244,0.1) 100%)',
            borderRadius: isMobile ? '12px' : '28px'
          }}></div>
        </div>

        {/* Search Bar */}
        <div style={{
          maxWidth: '100%',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            background: 'white',
            borderRadius: isMobile ? '16px' : '24px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
            border: '3px solid #f0fdf4',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}>
            <input
              type="text"
              placeholder={isMobile ? "Mit keresel?" : "Mit keresel? (pl. meggy, lekvár...)"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: isMobile ? '16px' : '24px',
                border: 'none',
                outline: 'none',
                fontSize: isMobile ? '16px' : '18px',
                background: 'transparent',
                color: '#1f2937',
                fontWeight: '500',
                minHeight: '60px'
              }}
            />
            <button style={{
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              color: 'white',
              border: 'none',
              padding: isMobile ? '16px' : '24px',
              cursor: 'pointer',
              fontSize: isMobile ? '20px' : '24px',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '60px',
              borderRadius: isMobile ? '0 0 16px 16px' : '0'
            }}>
              🔍
            </button>
          </div>
        </div>
      </section>

      <LocationPrompt />

      {/* Categories */}
      <section style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: `0 16px ${isMobile ? '40px' : '80px'}`
      }}>
        <h2 style={{
          fontSize: isMobile ? '28px' : '36px',
          fontWeight: '700',
          color: '#1f2937',
          textAlign: 'center',
          marginBottom: isMobile ? '32px' : '48px'
        }}>
          Kategóriák
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: isMobile ? '16px' : '24px'
        }}>
          {[
            { name: 'Őstermelők termékei', emoji: '🥕', gradient: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)' },
            { name: 'Elérhető a közeledben', emoji: '📍', gradient: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)' },
            { name: 'Lekvár és befőttek', emoji: '🍯', gradient: 'linear-gradient(135deg, #FEF2F2, #FECACA)' },
            { name: 'Kézműves szappanok', emoji: '🧼', gradient: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)' }
          ].map((category, index) => (
            <div key={index} style={{
              background: category.gradient,
              borderRadius: isMobile ? '16px' : '24px',
              padding: isMobile ? '24px 16px' : '40px 24px',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
              border: '2px solid white',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: isMobile ? '60px' : '80px',
                height: isMobile ? '60px' : '80px',
                background: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: isMobile ? '28px' : '36px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
              }}>
                {category.emoji}
              </div>
              <h3 style={{
                fontSize: isMobile ? '14px' : '18px',
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
        padding: `0 16px ${isMobile ? '60px' : '100px'}`
      }}>
        <h2 style={{
          fontSize: isMobile ? '28px' : '36px',
          fontWeight: '700',
          color: '#1f2937',
          textAlign: 'center',
          marginBottom: isMobile ? '32px' : '48px'
        }}>
          Kiemelt termékek
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: isMobile ? '20px' : '32px'
        }}>
          {[
            { name: 'Meggy', price: '800 Ft/kg', seller: 'Marika Néni', location: 'Balatonfüred', emoji: '🍒', rating: 4.9 },
            { name: 'Meggyszörp', price: '1200 Ft/üveg', seller: 'Marika Néni', location: 'Balatonfüred', emoji: '🧃', rating: 4.8 },
            { name: 'Baracklekvár', price: '1000 Ft/üveg', seller: 'Kiss Margit', location: 'Jaszberény', emoji: '🍑', rating: 4.7 },
            { name: 'Összibarack', price: '600 Ft/kg', seller: 'Szabó Anna', location: 'Esztergom', emoji: '🍑', rating: 4.9 }
          ].map((product, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: isMobile ? '16px' : '24px',
              overflow: 'hidden',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
              border: '2px solid #f8fafc',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}>
              
              <div style={{
                height: isMobile ? '180px' : '220px',
                background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '64px' : '80px',
                position: 'relative'
              }}>
                {product.emoji}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'white',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}>
                  <span style={{ fontSize: '12px' }}>⭐</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#1f2937' }}>
                    {product.rating}
                  </span>
                </div>
              </div>
              
              <div style={{ padding: isMobile ? '20px' : '28px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px',
                  gap: '12px'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '20px' : '24px',
                    fontWeight: '700',
                    color: '#1f2937',
                    margin: 0,
                    lineHeight: '1.2'
                  }}>
                    {product.name}
                  </h3>
                  <span style={{
                    fontSize: isMobile ? '16px' : '20px',
                    fontWeight: '800',
                    color: '#16a34a',
                    background: '#f0fdf4',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    whiteSpace: 'nowrap'
                  }}>
                    {product.price}
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '16px' }}>👤</span>
                  <span style={{ 
                    color: '#6b7280', 
                    fontSize: '16px', 
                    fontWeight: '500' 
                  }}>
                    {product.seller}
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{ fontSize: '16px' }}>📍</span>
                  <span style={{ 
                    color: '#6b7280', 
                    fontSize: '16px', 
                    fontWeight: '500' 
                  }}>
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
        padding: `${isMobile ? '40px' : '64px'} 16px ${isMobile ? '20px' : '32px'}`,
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
            gap: '12px',
            marginBottom: isMobile ? '20px' : '32px'
          }}>
            <div style={{
              width: isMobile ? '40px' : '48px',
              height: isMobile ? '40px' : '48px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '20px' : '24px'
            }}>
              🧺
            </div>
            <span style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: '700',
              color: 'white'
            }}>
              SzomszédKosara
            </span>
          </div>
          
          <p style={{
            color: '#9ca3af',
            marginBottom: isMobile ? '20px' : '32px',
            fontSize: isMobile ? '16px' : '18px'
          }}>
            Helyi termékek, közösségi kapcsolatok
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: isMobile ? '20px' : '32px',
            maxWidth: '400px',
            margin: `0 auto ${isMobile ? '20px' : '32px'}`
          }}>
            {['Rólunk', 'ÁSZF', 'Adatvédelem', 'Kapcsolat'].map((link, index) => (
              <a key={index} href="#" style={{ 
                color: '#d1d5db', 
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'color 0.2s ease',
                padding: '8px 0'
              }}>
                {link}
              </a>
            ))}
          </div>
          
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0,
            lineHeight: '1.4'
          }}>
            © 2025 SzomszédKosara. Minden jog fenntartva.
          </p>
        </div>
      </footer>

      {/* Teszt gombok */}
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
        fontSize: '12px',
        zIndex: 1000
      }}>
        <span style={{ fontWeight: '600', color: '#374151' }}>Teszt:</span>
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
  )
}