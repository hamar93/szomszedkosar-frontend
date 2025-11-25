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
      background: '#F5F5F0',
      fontFamily: '"Source Sans 3", sans-serif'
    }}>
      
      {/* Header */}
      <header style={{
        background: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid #E5E7EB'
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
            <div className="logo-dot" style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%'
            }}></div>
            <span style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: '700',
              color: '#1F2937'
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
              transition: 'color 0.2s ease'
            }}>
              🔍 Böngészés
            </Link>
            
            <Link href="/feed" style={{
              color: '#374151',
              fontWeight: '600',
              textDecoration: 'none',
              fontSize: '16px',
              transition: 'color 0.2s ease'
            }}>
              📰 Hírfolyam
            </Link>
            
            {isLoggedIn && (userType === 'producer' || userType === 'casual_seller') && (
              <Link href="/add-product" style={{
                color: '#374151',
                fontWeight: '600',
                textDecoration: 'none',
                fontSize: '16px',
                transition: 'color 0.2s ease'
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
                <Link href="/login" className="btn-primary" style={{
                  textDecoration: 'none',
                  display: 'inline-block'
                }}>
                  Belépés
                </Link>
                <Link href="/register" style={{
                  color: '#1B4332',
                  padding: '0.5rem 1rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '16px',
                  border: '1px solid #1B4332',
                  borderRadius: '8px',
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
              padding: '8px',
              color: '#1F2937'
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
                  <Link href="/login" className="btn-primary" style={{
                    textAlign: 'center',
                    textDecoration: 'none'
                  }}>
                    Belépés
                  </Link>
                  <Link href="/register" style={{
                    color: '#1B4332',
                    padding: '12px 0',
                    borderRadius: '8px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    fontSize: '16px',
                    textAlign: 'center',
                    border: '1px solid #1B4332'
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
        textAlign: 'center',
        background: 'linear-gradient(to bottom, #F0F4F1, #FFFFFF, #E8ECE9)'
      }}>
        <h1 style={{
          fontSize: isMobile ? '32px' : '56px',
          fontWeight: '700',
          color: '#1F2937',
          marginBottom: '24px',
          lineHeight: '1.2',
          letterSpacing: '-0.5px'
        }}>
          Vásárolj közvetlenül a
          <br />
          <span className="text-primary">
            környékbeli termelőktől
          </span>
        </h1>
        
        <p style={{
          fontSize: isMobile ? '18px' : '22px',
          color: '#4B5563',
          marginBottom: isMobile ? '40px' : '64px',
          maxWidth: '600px',
          margin: `0 auto ${isMobile ? '40px' : '64px'}`,
          fontWeight: '400',
          lineHeight: '1.6'
        }}>
          Friss, helyi, házias termékek megbízható forrásból.
        </p>

        {/* Hero kép */}
        <div style={{
          maxWidth: isMobile ? '300px' : '700px',
          height: isMobile ? '250px' : '400px',
          margin: `0 auto ${isMobile ? '40px' : '64px'}`,
          borderRadius: '12px',
          backgroundImage: 'url(/images/hero-image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
        </div>

        {/* Search Bar */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            border: '1px solid #E5E7EB',
            overflow: 'hidden'
          }}>
            <input
              type="text"
              placeholder={isMobile ? "Mit keresel?" : "Mit keresel? (pl. meggy, lekvár...)"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: isMobile ? '16px' : '20px',
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                color: '#1F2937',
                minHeight: '56px'
              }}
            />
            <button className="btn-primary" style={{
              borderRadius: 0,
              padding: isMobile ? '16px' : '0 32px',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '56px'
            }}>
              Keresés
            </button>
          </div>
        </div>
      </section>

      <LocationPrompt />

      {/* Categories / Features */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `0 16px ${isMobile ? '40px' : '80px'}`
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '32px'
        }}>
          {[
            { title: 'Frissesség', desc: 'Közvetlenül a kertből az asztalra.', icon: '🥕' },
            { title: 'Megbízhatóság', desc: 'Ellenőrzött helyi termelők.', icon: '🤝' },
            { title: 'Közösség', desc: 'Támogasd a helyi gazdaságot.', icon: '🏡' }
          ].map((feature, index) => (
            <div key={index} style={{
              textAlign: 'center',
              padding: '24px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: '#1B4332',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '28px',
                color: 'white'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1F2937',
                marginBottom: '8px'
              }}>
                {feature.title}
              </h3>
              <p style={{ color: '#6B7280' }}>
                {feature.desc}
              </p>
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
          fontSize: isMobile ? '28px' : '32px',
          fontWeight: '700',
          color: '#1F2937',
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          Kiemelt termékek
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {[
            { name: 'Meggy', price: '800 Ft/kg', seller: 'Marika Néni', location: 'Balatonfüred', emoji: '🍒', rating: 4.9 },
            { name: 'Meggyszörp', price: '1200 Ft/üveg', seller: 'Marika Néni', location: 'Balatonfüred', emoji: '🧃', rating: 4.8 },
            { name: 'Baracklekvár', price: '1000 Ft/üveg', seller: 'Kiss Margit', location: 'Jaszberény', emoji: '🍑', rating: 4.7 },
            { name: 'Összibarack', price: '600 Ft/kg', seller: 'Szabó Anna', location: 'Esztergom', emoji: '🍑', rating: 4.9 }
          ].map((product, index) => (
            <div key={index} className="card" style={{
              overflow: 'hidden',
              transition: 'transform 0.2s ease',
              cursor: 'pointer'
            }}>
              
              <div style={{
                height: '200px',
                background: '#F9FAFB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '64px',
                position: 'relative'
              }}>
                {product.emoji}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'white',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  ⭐ {product.rating}
                </div>
              </div>
              
              <div style={{ padding: '20px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1F2937',
                    margin: 0
                  }}>
                    {product.name}
                  </h3>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1B4332'
                  }}>
                    {product.price}
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '4px',
                  fontSize: '14px',
                  color: '#6B7280'
                }}>
                  <span>👤</span>
                  <span>{product.seller}</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '14px',
                  color: '#6B7280'
                }}>
                  <span>📍</span>
                  <span>{product.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#1F2937',
        color: 'white',
        padding: '64px 16px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#1B4332'
            }}></div>
            <span style={{
              fontSize: '20px',
              fontWeight: '700'
            }}>
              SzomszédKosara
            </span>
          </div>
          
          <p style={{
            color: '#9CA3AF',
            marginBottom: '32px'
          }}>
            Helyi termékek, közösségi kapcsolatok
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '32px',
            flexWrap: 'wrap'
          }}>
            {['Rólunk', 'ÁSZF', 'Adatvédelem', 'Kapcsolat'].map((link, index) => (
              <a key={index} href="#" style={{ 
                color: '#D1D5DB', 
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.2s ease'
              }}>
                {link}
              </a>
            ))}
          </div>
          
          <p style={{
            fontSize: '14px',
            color: '#6B7280',
            margin: 0
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