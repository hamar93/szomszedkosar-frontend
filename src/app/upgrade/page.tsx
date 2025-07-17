'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

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
              fontSize: 'clamp(18px, 5vw, 24px)',
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
            display: !isMobile ? 'flex' : 'none',
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
            display: !isMobile ? 'flex' : 'none',
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
        padding: 'clamp(40px, 8vw, 80px) 16px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(28px, 8vw, 64px)',
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
          fontSize: 'clamp(16px, 4vw, 22px)',
          color: '#6b7280',
          marginBottom: 'clamp(40px, 8vw, 64px)',
          maxWidth: '600px',
          margin: '0 auto clamp(40px, 8vw, 64px)',
          fontWeight: '500',
          lineHeight: '1.5'
        }}>
          Közvetlenül a termelőktől és környékbeli árusoktól
        </p>

        {/* Hero kép - mobilon kisebb */}
        <div style={{
          maxWidth: 'clamp(300px, 90vw, 700px)',
          height: 'clamp(250px, 50vw, 500px)',
          margin: '0 auto clamp(40px, 8vw, 64px)',
          borderRadius: 'clamp(16px, 4vw, 32px)',
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
            borderRadius: 'clamp(12px, 4vw, 28px)'
          }}></div>
        </div>

        {/* Search Bar - mobilra optimalizálva */}
        <div style={{
          maxWidth: '100%',
          margin: '0 auto',
          padding: '0 16px'
        }}>
        <div
  className="
    flex flex-col sm:flex-row 
    bg-white border-[3px] border-green-50 
    rounded-[clamp(16px,4vw,24px)]
    shadow-[0_12px_32px_rgba(0,0,0,0.15)]
    overflow-hidden transition-all duration-300 ease-in-out
  "
>
            <input
              type="text"
              placeholder="Mit keresel? (pl. meggy, lekvár...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: 'clamp(16px, 4vw, 24px)',
                border: 'none',
                outline: 'none',
                fontSize: 'clamp(14px, 4vw, 18px)',
                background: 'transparent',
                color: '#1f2937',
                fontWeight: '500',
                minHeight: '60px'
              }}
            />
            <button
  className="
    bg-gradient-to-br from-green-600 to-green-700 
    text-white border-none 
    px-[clamp(16px,4vw,24px)] 
    text-[clamp(18px,5vw,24px)] 
    transition-all duration-200 ease-in-out 
    flex items-center justify-center 
    min-h-[60px] 
    sm:rounded-none rounded-b-[16px]
    cursor-pointer
  "
>
            
              🔍
            </button>
          </div>
        </div>
      </section>

      {/* Categories - mobilra optimalizálva */}
      <section style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 16px clamp(40px, 8vw, 80px)'
      }}>
        <h2 style={{
          fontSize: 'clamp(24px, 6vw, 36px)',
          fontWeight: '700',
          color: '#1f2937',
          textAlign: 'center',
          marginBottom: 'clamp(32px, 6vw, 48px)'
        }}>
          Kategóriák
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 40vw, 220px), 1fr))',
          gap: 'clamp(16px, 4vw, 24px)'
        }}>
          {[
            { name: 'Őstermelők termékei', emoji: '🥕', gradient: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)' },
            { name: 'Elérhető a közeledben', emoji: '📍', gradient: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)' },
            { name: 'Lekvár és befőttek', emoji: '🍯', gradient: 'linear-gradient(135deg, #FEF2F2, #FECACA)' },
            { name: 'Kézműves szappanok', emoji: '🧼', gradient: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)' }
          ].map((category, index) => (
            <div key={index} style={{
              background: category.gradient,
              borderRadius: 'clamp(16px, 4vw, 24px)',
              padding: 'clamp(24px, 6vw, 40px) clamp(16px, 4vw, 24px)',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
              border: '2px solid white',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: 'clamp(60px, 15vw, 80px)',
                height: 'clamp(60px, 15vw, 80px)',
                background: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: 'clamp(24px, 6vw, 36px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
              }}>
                {category.emoji}
              </div>
              <h3 style={{
                fontSize: 'clamp(14px, 4vw, 18px)',
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

      {/* Products - mobilra optimalizálva */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px clamp(60px, 10vw, 100px)'
      }}>
        <h2 style={{
          fontSize: 'clamp(24px, 6vw, 36px)',
          fontWeight: '700',
          color: '#1f2937',
          textAlign: 'center',
          marginBottom: 'clamp(32px, 6vw, 48px)'
        }}>
          Kiemelt termékek
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 80vw, 320px), 1fr))',
          gap: 'clamp(20px, 5vw, 32px)'
        }}>
          {[
            { name: 'Meggy', price: '800 Ft/kg', seller: 'Marika Néni', location: 'Balatonfüred', emoji: '🍒', rating: 4.9 },
            { name: 'Meggyszörp', price: '1200 Ft/üveg', seller: 'Marika Néni', location: 'Balatonfüred', emoji: '🧃', rating: 4.8 },
            { name: 'Baracklekvár', price: '1000 Ft/üveg', seller: 'Kiss Margit', location: 'Jaszberény', emoji: '🍑', rating: 4.7 },
            { name: 'Összibarack', price: '600 Ft/kg', seller: 'Szabó Anna', location: 'Esztergom', emoji: '🍑', rating: 4.9 }
          ].map((product, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: 'clamp(16px, 4vw, 24px)',
              overflow: 'hidden',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
              border: '2px solid #f8fafc',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}>
              
              <div style={{
                height: 'clamp(180px, 40vw, 220px)',
                background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(60px, 15vw, 80px)',
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
              
              <div style={{ padding: 'clamp(20px, 5vw, 28px)' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px',
                  gap: '12px'
                }}>
                  <h3 style={{
                    fontSize: 'clamp(18px, 5vw, 24px)',
                    fontWeight: '700',
                    color: '#1f2937',
                    margin: 0,
                    lineHeight: '1.2'
                  }}>
                    {product.name}
                  </h3>
                  <span style={{
                    fontSize: 'clamp(16px, 4vw, 20px)',
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
                    fontSize: 'clamp(14px, 3.5vw, 16px)', 
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
                    fontSize: 'clamp(14px, 3.5vw, 16px)', 
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

      {/* Footer - mobilra optimalizálva */}
      <footer style={{
        background: 'linear-gradient(135deg, #1f2937, #111827)',
        color: 'white',
        padding: 'clamp(40px, 8vw, 64px) 16px clamp(20px, 4vw, 32px)',
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
            marginBottom: 'clamp(20px, 5vw, 32px)'
          }}>
            <div style={{
              width: 'clamp(36px, 8vw, 48px)',
              height: 'clamp(36px, 8vw, 48px)',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'clamp(18px, 5vw, 24px)'
            }}>
              🧺
            </div>
            <span style={{
              fontSize: 'clamp(18px, 5vw, 24px)',
              fontWeight: '700',
              color: 'white'
            }}>
              SzomszédKosara
            </span>
          </div>
          
          <p style={{
            color: '#9ca3af',
            marginBottom: 'clamp(20px, 5vw, 32px)',
            fontSize: 'clamp(14px, 4vw, 18px)'
          }}>
            Helyi termékek, közösségi kapcsolatok
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '16px',
            marginBottom: 'clamp(20px, 5vw, 32px)',
            maxWidth: '400px',
            margin: '0 auto clamp(20px, 5vw, 32px)'
          }}>
            {['Rólunk', 'ÁSZF', 'Adatvédelem', 'Kapcsolat'].map((link, index) => (
              <a key={index} href="#" style={{ 
                color: '#d1d5db', 
                textDecoration: 'none',
                fontSize: 'clamp(14px, 3.5vw, 16px)',
                fontWeight: '500',
                transition: 'color 0.2s ease',
                padding: '8px 0'
              }}>
                {link}
              </a>
            ))}
          </div>
          
          <p style={{
            fontSize: 'clamp(12px, 3vw, 14px)',
            color: '#6b7280',
            margin: 0,
            lineHeight: '1.4'
          }}>
            © 2025 SzomszédKosara. Minden jog fenntartva.
          </p>
        </div>
      </footer>

      {/* Teszt gombok - mobilon is láthatóak */}
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