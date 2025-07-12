'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [userType, setUserType] = useState<'buyer' | 'producer'>('buyer')
  const [isOccasionalSeller, setIsOccasionalSeller] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    businessDescription: ''
  })

  const handleGoogleRegister = () => {
    console.log('Google regisztráció')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Regisztráció:', { ...formData, userType, isOccasionalSeller })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #fefcf3 50%, #fff7ed 100%)',
      padding: '48px 16px'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
            textDecoration: 'none'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)'
            }}>
              🛒
            </div>
            <span style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937'
            }}>
              Szomszéd Kosara
            </span>
          </Link>
          
          {/* Animated basket icon */}
          <div style={{
            width: '120px',
            height: '120px',
            margin: '0 auto 24px',
            background: 'linear-gradient(135deg, #ffffff, #f0fdf4)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            border: '4px solid #dcfce7'
          }}>
            <span style={{ fontSize: '48px' }}>🧺</span>
          </div>
          
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '8px'
          }}>
            Regisztráció
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#6b7280'
          }}>
            Csatlakozz a helyi közösséghez!
          </p>
        </div>

        {/* Registration Form */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          padding: '32px',
          border: '1px solid #f3f4f6'
        }}>
          <form onSubmit={handleSubmit}>
            
            {/* User Type Selection */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '16px'
              }}>
                Milyen típusú fiók szeretnél?
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <button
                  type="button"
                  onClick={() => setUserType('buyer')}
                  style={{
                    padding: '24px',
                    borderRadius: '16px',
                    border: userType === 'buyer' ? '3px solid #16a34a' : '2px solid #e5e7eb',
                    background: userType === 'buyer' ? '#f0fdf4' : 'white',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    boxShadow: userType === 'buyer' ? '0 4px 12px rgba(22, 163, 74, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <span style={{ fontSize: '32px' }}>🛍️</span>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      Vásárló
                    </span>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    Helyi termékeket szeretnék vásárolni
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setUserType('producer')}
                  style={{
                    padding: '24px',
                    borderRadius: '16px',
                    border: userType === 'producer' ? '3px solid #16a34a' : '2px solid #e5e7eb',
                    background: userType === 'producer' ? '#f0fdf4' : 'white',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    boxShadow: userType === 'producer' ? '0 4px 12px rgba(22, 163, 74, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <span style={{ fontSize: '32px' }}>👩‍🌾</span>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      Őstermelő
                    </span>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    Saját termékeket szeretnék eladni
                  </p>
                </button>
              </div>

              {/* Alkalmi eladó opció */}
              {userType === 'buyer' && (
                <div style={{
                  background: '#fff7ed',
                  borderRadius: '16px',
                  padding: '16px',
                  border: '2px solid #fed7aa'
                }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={isOccasionalSeller}
                      onChange={(e) => setIsOccasionalSeller(e.target.checked)}
                      style={{
                        width: '20px',
                        height: '20px',
                        marginTop: '2px',
                        accentColor: '#16a34a'
                      }}
                    />
                    <div>
                      <span style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#1f2937'
                      }}>
                        Alkalmi eladó vagyok
                      </span>
                      <p style={{
                        fontSize: '14px',
                        color: '#6b7280',
                        margin: '4px 0 0 0'
                      }}>
                        Időnként szeretnék termékeket eladni (max 5 hirdetés/hó)
                      </p>
                    </div>
                  </label>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Teljes név *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Kiss János"
                  onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  E-mail cím *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  placeholder="janos@example.com"
                  onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Jelszó *
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  placeholder="••••••••"
                  onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Jelszó megerősítése *
                </label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  placeholder="••••••••"
                  onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Telefonszám *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  placeholder="+36 20 123 4567"
                  onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Cím/Település *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  placeholder="2500 Esztergom"
                  onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            {/* Producer/Seller Description */}
            {(userType === 'producer' || isOccasionalSeller) && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  {userType === 'producer' ? 'Gazdaság/Termelés leírása *' : 'Mit szeretnél eladni?'}
                </label>
                <textarea
                  required={userType === 'producer'}
                  value={formData.businessDescription}
                  onChange={(e) => setFormData({...formData, businessDescription: e.target.value})}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                  placeholder={
                    userType === 'producer' 
                      ? "Zöldségeket és házi készítésű termékeket kínálok..."
                      : "Alkalmanként lekvárokat, sajtokat árulok..."
                  }
                  onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            )}

            {/* Terms */}
            <div style={{
              background: '#f9fafb',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  required
                  style={{
                    width: '20px',
                    height: '20px',
                    marginTop: '2px',
                    accentColor: '#16a34a'
                  }}
                />
                <span style={{
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  Elfogadom az{' '}
                  <Link href="/terms" style={{
                    color: '#16a34a',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}>
                    Általános Szerződési Feltételeket
                  </Link>
                  {' '}és az{' '}
                  <Link href="/privacy" style={{
                    color: '#16a34a',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}>
                    Adatkezelési Tájékoztatót
                  </Link>
                </span>
              </label>
            </div>

            {/* Submit Buttons */}
            <div style={{ marginBottom: '24px' }}>
              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '16px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(22, 163, 74, 0.3)',
                  transition: 'all 0.2s',
                  marginBottom: '16px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(22, 163, 74, 0.4)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(22, 163, 74, 0.3)'
                }}
              >
                Regisztráció 🚀
              </button>

              <div style={{
                position: 'relative',
                textAlign: 'center',
                marginBottom: '16px'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: '#e5e7eb'
                }}></div>
                <span style={{
                  background: 'white',
                  padding: '0 16px',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  vagy
                </span>
              </div>

              <button
                type="button"
                onClick={handleGoogleRegister}
                style={{
                  width: '100%',
                  background: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '16px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f9fafb'
                  e.currentTarget.style.borderColor = '#d1d5db'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'white'
                  e.currentTarget.style.borderColor = '#e5e7eb'
                }}
              >
                <span style={{ fontSize: '20px' }}>🔍</span>
                <span>Regisztráció Google-lal</span>
              </button>
            </div>

            {/* Login Link */}
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#6b7280' }}>Van már fiókod? </span>
              <Link href="/login" style={{
                color: '#16a34a',
                textDecoration: 'none',
                fontWeight: '600'
              }}>
                Bejelentkezés
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}