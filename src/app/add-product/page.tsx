// src/app/add-product/page.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { LocationPicker } from '@/components/LocationSystem'

// LocationPicker típusok importálása
interface Location {
  lat: number;
  lng: number;
  address: string;
  city: string;
  country: string;
}

// Frissített kategóriák
const categories = [
  { 
    id: 'perishable', 
    name: 'Romlandó termékek', 
    icon: '🥬',
    emojis: [
      '🍎', '🍊', '🍌', '🍇', '🍓', '🍒', '🥝', '🍑', '🍍', '🥭', '🍉', '🫐', '🥥',
      '🥕', '🥒', '🍅', '🥬', '🥦', '🌶️', '🫒', '🌽', '🥔', '🧄', '🧅', '🥑', '🍆', '🫑',
      '🥚', '🐣', '🥩', '🍖', '🐔', '🐄', '🐷', '🦆', '🐟', '🦐', '🦀',
      '🥛', '🧀', '🧈', '🍳', '🥯'
    ]
  },
  { 
    id: 'preserved', 
    name: 'Tartós termékek', 
    icon: '🍯',
    emojis: [
      '🍯', '🫙', '🍓', '🍑', '🍇', '🍊', '🍋', '🥝',
      '🧃', '🍹', '🥤', '🍋', '🍓', '🍑',
      '🍯', '🐝', '🌻', '🌼',
      '🌿', '🍃', '🌱', '🌼', '🌸', '☕', '🫖',
      '🌿', '🍃', '🌱', '🧄', '🧅', '🌶️',
      '🥓', '🌭', '🍖', '🐟', '🧀'
    ]
  },
  { 
    id: 'cosmetics', 
    name: 'Házi kozmetikum', 
    icon: '🧼',
    emojis: ['🧼', '🧴', '🌿', '💆‍♀️', '🛁', '🕯️', '🧽', '🌸', '🌹', '🥥']
  },
  { 
    id: 'rural_marketplace', 
    name: 'Piactér', 
    icon: '🐄',
    emojis: [
      '🐄', '🐷', '🐔', '🐑', '🐐', '🦆', '🐰', '🐴', '🐈', '🐕',
      '🌾', '🌽', '🫘', '🥜', '🌰',
      '🛠️', '⚒️', '🪓', '🔨', '⛏️', '🪚', '🧰', '📦', '🚜', '🔧'
    ]
  },
  { 
    id: 'bakery', 
    name: 'Pékáruk', 
    icon: '🍞',
    emojis: ['🍞', '🥖', '🥨', '🧇', '🍰', '🎂', '🥧', '🧁', '🍪', '🥐']
  }
]

// Alkategóriák
const getSubcategories = (categoryId: string) => {
  const subcategoryMap = {
    'perishable': ['Gyümölcs', 'Zöldség', 'Tojás', 'Hús', 'Tejtermék'],
    'preserved': ['Lekvár', 'Szörp', 'Méz', 'Tea', 'Gyógynövény', 'Füstöltáru'],
    'cosmetics': ['Szappan', 'Krém', 'Balzsam', 'Olaj', 'Gyertya'],
    'rural_marketplace': ['Élő állat', 'Gabona', 'Eszközök', 'Takarmány'],
    'bakery': ['Kenyér', 'Péksütemény', 'Torta', 'Sütemény']
  }
  
  return subcategoryMap[categoryId as keyof typeof subcategoryMap] || []
}

// Mock felhasználó adatok
const currentUser = {
  name: 'Kiss Margit',
  type: 'registered_producer',
  monthlyAds: 2,
  monthlyPushes: 1,
  activeAds: 1
}

export default function AddProductPage() {
  const [step, setStep] = useState(1)
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState<Location | null>(null)
  const [useImage, setUseImage] = useState('emoji')
  const [selectedEmoji, setSelectedEmoji] = useState('')
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [price, setPrice] = useState('')
  const [unit, setUnit] = useState('kg')
  const [quantity, setQuantity] = useState('')
  const [isOrganic, setIsOrganic] = useState(false)
  const [deliveryOptions, setDeliveryOptions] = useState({
    pickup: true,
    delivery: false,
    shipping: false
  })
  const [sendPushNotification, setSendPushNotification] = useState(false)
  const [pushRadius, setPushRadius] = useState(10)

  const isLimitReached = {
    monthlyAds: currentUser.type === 'casual_seller' && currentUser.monthlyAds >= 5,
    monthlyPushes: currentUser.type === 'casual_seller' && currentUser.monthlyPushes >= 3,
    activeAds: currentUser.type === 'casual_seller' && currentUser.activeAds >= 3
  }

  const handleImageUpload = (e: any) => {
    const files = Array.from(e.target.files || [])
    setUploadedImages((prev: File[]) => [...prev, ...files].slice(0, 5))
  }

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleLocationSelect = (selectedLocation: Location) => {
    setLocation(selectedLocation);
  }

  const handleSubmit = () => {
    console.log('Termék feltöltése:', {
      productName, category, subcategory, description, location, useImage, selectedEmoji, 
      uploadedImages, price, unit, quantity, isOrganic, deliveryOptions,
      sendPushNotification, pushRadius
    })
    alert('Termék sikeresen feltöltve! (Demo)')
  }

  const selectedCategoryData = categories.find(cat => cat.id === category)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #fefcf3 50%, #fff7ed 100%)'
    }}>
      
      {/* Header - Mobiloptimalizált */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '16px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: window.innerWidth < 768 ? 'stretch' : 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div>
              <h1 style={{
                fontSize: window.innerWidth < 768 ? '24px' : '28px',
                fontWeight: '700',
                color: '#1f2937',
                margin: '0 0 8px 0'
              }}>
                Új termék feltöltése
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
                <span>Termék feltöltése</span>
              </div>
            </div>
            
            <Link
              href="/profile"
              style={{
                background: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '10px 16px',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                color: '#6b7280',
                textAlign: 'center'
              }}
            >
              ← Vissza a profilba
            </Link>
          </div>
          
          {/* Progress bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '8px'
          }}>
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                flex: '1'
              }}>
                <div style={{
                  width: window.innerWidth < 768 ? '28px' : '32px',
                  height: window.innerWidth < 768 ? '28px' : '32px',
                  borderRadius: '50%',
                  background: step >= stepNum ? '#16a34a' : '#e5e7eb',
                  color: step >= stepNum ? 'white' : '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: window.innerWidth < 768 ? '12px' : '14px',
                  fontWeight: '600',
                  flexShrink: 0
                }}>
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div style={{
                    flex: '1',
                    height: '2px',
                    background: step > stepNum ? '#16a34a' : '#e5e7eb'
                  }}></div>
                )}

          {/* STEP 2: Kép/Ikon választás */}
          {step === 2 && (
            <div>
              <h2 style={{
                fontSize: window.innerWidth < 768 ? '20px' : '24px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '20px'
              }}>
                Termék képe
              </h2>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  
                  {/* Saját kép feltöltése */}
                  <div
                    onClick={() => setUseImage('photo')}
                    style={{
                      background: useImage === 'photo' ? '#dcfce7' : 'white',
                      border: '3px solid #e5e7eb',
                      borderColor: useImage === 'photo' ? '#16a34a' : '#e5e7eb',
                      borderRadius: '12px',
                      padding: '16px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      flex: '1'
                    }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>📸</div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '6px'
                    }}>
                      Saját kép feltöltése
                    </h3>
                    <p style={{
                      fontSize: '13px',
                      color: '#6b7280',
                      margin: 0,
                      lineHeight: '1.3'
                    }}>
                      Mutasd meg a valódi termékek minőségét (max 5 kép)
                    </p>
                  </div>
                  
                  {/* Emoji ikon választás */}
                  <div
                    onClick={() => setUseImage('emoji')}
                    style={{
                      background: useImage === 'emoji' ? '#dcfce7' : 'white',
                      border: '3px solid #e5e7eb',
                      borderColor: useImage === 'emoji' ? '#16a34a' : '#e5e7eb',
                      borderRadius: '12px',
                      padding: '16px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      flex: '1'
                    }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>😊</div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '6px'
                    }}>
                      Emoji ikon
                    </h3>
                    <p style={{
                      fontSize: '13px',
                      color: '#6b7280',
                      margin: 0,
                      lineHeight: '1.3'
                    }}>
                      Gyors és egyszerű megoldás
                    </p>
                  </div>
                </div>
                
                {/* Képfeltöltés interface */}
                {useImage === 'photo' && (
                  <div style={{
                    border: '2px dashed #d1d5db',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    background: '#fafafa'
                  }}>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      style={{
                        cursor: 'pointer',
                        display: 'inline-block'
                      }}
                    >
                      <div style={{ fontSize: '32px', marginBottom: '12px' }}>📁</div>
                      <div style={{
                        background: '#16a34a',
                        color: 'white',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        display: 'inline-block'
                      }}>
                        Képek kiválasztása
                      </div>
                      <p style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        marginTop: '8px',
                        lineHeight: '1.3'
                      }}>
                        JPG, PNG, max 5MB/kép, max 5 kép
                      </p>
                    </label>
                    
                    {uploadedImages.length > 0 && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(auto-fill, minmax(${window.innerWidth < 768 ? '80px' : '100px'}, 1fr))`,
                        gap: '8px',
                        marginTop: '16px'
                      }}>
                        {uploadedImages.map((file: File, index) => (
                          <div key={index} style={{
                            position: 'relative',
                            aspectRatio: '1',
                            background: '#e5e7eb',
                            borderRadius: '6px',
                            overflow: 'hidden'
                          }}>
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Upload ${index + 1}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                            <button
                              onClick={() => removeImage(index)}
                              style={{
                                position: 'absolute',
                                top: '2px',
                                right: '2px',
                                background: '#dc2626',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer',
                                fontSize: '10px'
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Emoji választás */}
                {useImage === 'emoji' && selectedCategoryData && (
                  <div>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '12px'
                    }}>
                      Válassz ikont a(z) "{selectedCategoryData.name}" kategóriához:
                    </h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(auto-fill, minmax(${window.innerWidth < 768 ? '50px' : '60px'}, 1fr))`,
                      gap: '8px'
                    }}>
                      {selectedCategoryData.emojis.map((emoji, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedEmoji(emoji)}
                          style={{
                            background: selectedEmoji === emoji ? '#dcfce7' : 'white',
                            border: '2px solid #e5e7eb',
                            borderColor: selectedEmoji === emoji ? '#16a34a' : '#e5e7eb',
                            borderRadius: '8px',
                            padding: '10px',
                            cursor: 'pointer',
                            fontSize: window.innerWidth < 768 ? '24px' : '32px',
                            textAlign: 'center',
                            aspectRatio: '1'
                          }}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* STEP 3: Árazás és részletek */}
          {step === 3 && (
            <div>
              <h2 style={{
                fontSize: window.innerWidth < 768 ? '20px' : '24px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '20px'
              }}>
                Árazás és részletek
              </h2>
              
              {/* Ár és mértékegység */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '2fr 1fr',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Ár *
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="800"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
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
                    Mértékegység
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="kg">kg</option>
                    <option value="db">db</option>
                    <option value="üveg">üveg</option>
                    <option value="csomag">csomag</option>
                    <option value="liter">liter</option>
                  </select>
                </div>
              </div>
              
              {/* Mennyiség */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Elérhető mennyiség
                </label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="pl. 15 kg elérhető, 10 üveg készleten"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              {/* Bio termék */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: 'pointer',
                  background: '#f8fafc',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #e5e7eb'
                }}>
                  <input
                    type="checkbox"
                    checked={isOrganic}
                    onChange={(e) => setIsOrganic(e.target.checked)}
                    style={{ 
                      accentColor: '#16a34a', 
                      transform: 'scale(1.2)',
                      marginTop: '2px',
                      flexShrink: 0
                    }}
                  />
                  <div>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      🌱 Bio/Vegyszermentes termék
                    </span>
                    <p style={{
                      fontSize: '13px',
                      color: '#6b7280',
                      margin: '4px 0 0 0',
                      lineHeight: '1.3'
                    }}>
                      Vegyszermentes, természetes módon termelt
                    </p>
                  </div>
                </label>
              </div>
              
              {/* Szállítási opciók */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '12px'
                }}>
                  Szállítási lehetőségek
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    cursor: 'pointer',
                    padding: '8px'
                  }}>
                    <input
                      type="checkbox"
                      checked={deliveryOptions.pickup}
                      onChange={(e) => setDeliveryOptions({
                        ...deliveryOptions,
                        pickup: e.target.checked
                      })}
                      style={{ 
                        accentColor: '#16a34a', 
                        transform: 'scale(1.2)',
                        marginTop: '2px',
                        flexShrink: 0
                      }}
                    />
                    <span style={{ fontSize: '14px' }}>🚚 Személyes átvétel</span>
                  </label>
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    cursor: 'pointer',
                    padding: '8px'
                  }}>
                    <input
                      type="checkbox"
                      checked={deliveryOptions.delivery}
                      onChange={(e) => setDeliveryOptions({
                        ...deliveryOptions,
                        delivery: e.target.checked
                      })}
                      style={{ 
                        accentColor: '#16a34a', 
                        transform: 'scale(1.2)',
                        marginTop: '2px',
                        flexShrink: 0
                      }}
                    />
                    <span style={{ fontSize: '14px', lineHeight: '1.3' }}>🚗 Házhozszállítás (környéken)</span>
                  </label>
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    cursor: 'pointer',
                    padding: '8px'
                  }}>
                    <input
                      type="checkbox"
                      checked={deliveryOptions.shipping}
                      onChange={(e) => setDeliveryOptions({
                        ...deliveryOptions,
                        shipping: e.target.checked
                      })}
                      style={{ 
                        accentColor: '#16a34a', 
                        transform: 'scale(1.2)',
                        marginTop: '2px',
                        flexShrink: 0
                      }}
                    />
                    <span style={{ fontSize: '14px', lineHeight: '1.3' }}>📦 Postai küldés (tartós termékek)</span>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {/* STEP 4: Publikálás */}
          {step === 4 && (
            <div>
              <h2 style={{
                fontSize: window.innerWidth < 768 ? '20px' : '24px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '20px'
              }}>
                Publikálás és értesítések
              </h2>
              
              {/* Termék előnézete */}
              <div style={{
                background: '#f8fafc',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '20px',
                border: '2px solid #e5e7eb'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '12px'
                }}>
                  Termék előnézete
                </h3>
                
                <div style={{
                  display: 'flex',
                  flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                  gap: '12px',
                  alignItems: window.innerWidth < 768 ? 'center' : 'flex-start'
                }}>
                  {/* Termék képe/ikonja */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: useImage === 'photo' && uploadedImages.length > 0 ? '0' : '32px',
                    backgroundImage: useImage === 'photo' && uploadedImages.length > 0 
                      ? `url(${URL.createObjectURL(uploadedImages[0])})` 
                      : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    flexShrink: 0
                  }}>
                    {useImage === 'emoji' && selectedEmoji}
                  </div>
                  
                  {/* Termék info */}
                  <div style={{ 
                    flex: '1',
                    textAlign: window.innerWidth < 768 ? 'center' : 'left'
                  }}>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '8px'
                    }}>
                      {productName || 'Termék neve'}
                    </h4>
                    <div style={{
                      display: 'flex',
                      flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                      alignItems: window.innerWidth < 768 ? 'center' : 'flex-start',
                      gap: window.innerWidth < 768 ? '6px' : '16px',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#16a34a'
                      }}>
                        {price ? `${price} Ft/${unit}` : 'Ár nincs megadva'}
                      </span>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start',
                        gap: '4px'
                      }}>
                        {isOrganic && (
                          <span style={{
                            background: '#16a34a',
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: '600'
                          }}>
                            🌱 BIO
                          </span>
                        )}
                        {subcategory && (
                          <span style={{
                            background: '#f0fdf4',
                            color: '#16a34a',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: '600'
                          }}>
                            {subcategory}
                          </span>
                        )}
                      </div>
                    </div>
                    <p style={{
                      fontSize: '13px',
                      color: '#6b7280',
                      margin: '0 0 8px 0',
                      lineHeight: '1.3'
                    }}>
                      {description || 'Nincs leírás megadva'}
                    </p>
                    {location && (
                      <div style={{
                        fontSize: '12px',
                        color: '#16a34a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start',
                        gap: '4px'
                      }}>
                        📍 {location.city}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Push értesítés opció */}
              <div style={{
                background: sendPushNotification ? '#fef3c7' : '#f8fafc',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '20px',
                border: '2px solid #e5e7eb',
                borderColor: sendPushNotification ? '#fbbf24' : '#e5e7eb'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: 'pointer',
                  marginBottom: sendPushNotification ? '16px' : '0'
                }}>
                  <input
                    type="checkbox"
                    checked={sendPushNotification}
                    onChange={(e) => setSendPushNotification(e.target.checked)}
                    disabled={isLimitReached.monthlyPushes}
                    style={{ 
                      accentColor: '#16a34a', 
                      transform: 'scale(1.2)',
                      marginTop: '2px',
                      flexShrink: 0
                    }}
                  />
                  <div>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: isLimitReached.monthlyPushes ? '#9ca3af' : '#1f2937'
                    }}>
                      📢 Push értesítés küldése (500 Ft)
                    </span>
                    <p style={{
                      fontSize: '13px',
                      color: '#6b7280',
                      margin: '4px 0 0 0',
                      lineHeight: '1.3'
                    }}>
                      {isLimitReached.monthlyPushes 
                        ? '⚠️ Elérted a havi push értesítések limitjét (3/hó)'
                        : 'Értesítsd a környékbelieket az új termékről'
                      }
                    </p>
                  </div>
                </label>
                
                {sendPushNotification && !isLimitReached.monthlyPushes && (
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Értesítés távolsága: {pushRadius} km
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={pushRadius}
                      onChange={(e) => setPushRadius(parseInt(e.target.value))}
                      style={{
                        width: '100%',
                        accentColor: '#fbbf24'
                      }}
                    />
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                      color: '#6b7280',
                      marginTop: '4px'
                    }}>
                      <span>5 km</span>
                      <span>~{Math.round(pushRadius * pushRadius * 0.3)} potenciális vásárló</span>
                      <span>30 km</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
              </div>
            ))}
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            fontSize: window.innerWidth < 768 ? '10px' : '12px',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            <span>Alapadatok</span>
            <span>Kép/Ikon</span>
            <span>Árazás</span>
            <span>Publikálás</span>
          </div>
        </div>
      </div>

      {/* Form tartalma */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '16px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: window.innerWidth < 768 ? '20px' : '32px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          border: '2px solid #f8fafc'
        }}>
          
          {/* STEP 1: Alapadatok */}
          {step === 1 && (
            <div>
              <h2 style={{
                fontSize: window.innerWidth < 768 ? '20px' : '24px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '20px'
              }}>
                Termék alapadatok
              </h2>
              
              {/* Termék név */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Termék neve *
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="pl. Friss meggy, Házi lekvár, Bio sajt..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <LocationPicker onLocationSelect={handleLocationSelect} />
              
              {location && (
                <div style={{ 
                  marginBottom: '20px',
                  padding: '10px',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '8px',
                  border: '1px solid #16a34a'
                }}>
                  <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: '500' }}>
                    ✅ Kiválasztott helyszín: {location.address}
                  </div>
                </div>
              )}
              
              {/* Kategória választás */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '12px'
                }}>
                  Kategória *
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(auto-fit, minmax(${window.innerWidth < 768 ? '120px' : '140px'}, 1fr))`,
                  gap: '10px',
                  marginBottom: '16px'
                }}>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setCategory(cat.id)
                        setSubcategory('')
                      }}
                      style={{
                        background: category === cat.id ? '#dcfce7' : 'white',
                        border: '2px solid #e5e7eb',
                        borderColor: category === cat.id ? '#16a34a' : '#e5e7eb',
                        borderRadius: '10px',
                        padding: window.innerWidth < 768 ? '12px 8px' : '16px 12px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontSize: window.innerWidth < 768 ? '20px' : '24px', marginBottom: '6px' }}>
                        {cat.icon}
                      </div>
                      <div style={{
                        fontSize: window.innerWidth < 768 ? '11px' : '12px',
                        fontWeight: '600',
                        color: category === cat.id ? '#15803d' : '#6b7280',
                        lineHeight: '1.2'
                      }}>
                        {cat.name}
                      </div>
                    </button>
                  ))}
                </div>
                
                {category && (
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Pontosabb kategória (opcionális)
                    </label>
                    <div style={{
                      display: 'flex',
                      gap: '6px',
                      flexWrap: 'wrap'
                    }}>
                      {getSubcategories(category).map((sub) => (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => setSubcategory(subcategory === sub ? '' : sub)}
                          style={{
                            background: subcategory === sub ? '#dcfce7' : '#f8fafc',
                            color: subcategory === sub ? '#15803d' : '#6b7280',
                            border: '1px solid #e5e7eb',
                            borderColor: subcategory === sub ? '#16a34a' : '#e5e7eb',
                            borderRadius: '6px',
                            padding: '5px 10px',
                            fontSize: '11px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Leírás */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Leírás *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Írj részletesen a termékről: hogyan készült, milyen minőségű, mire használható..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
          )}

          {/* Navigációs gombok - Mobiloptimalizált */}
          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: window.innerWidth < 768 ? 'stretch' : 'center',
            gap: window.innerWidth < 768 ? '10px' : '0',
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid #e5e7eb'
          }}>
            {/* Vissza gomb */}
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                style={{
                  background: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: window.innerWidth < 768 ? '12px 20px' : '12px 24px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  color: '#6b7280',
                  order: window.innerWidth < 768 ? '2' : '1'
                }}
              >
                ← Vissza
              </button>
            ) : (
              window.innerWidth >= 768 && <div></div>
            )}
            
            {/* Tovább/Publikálás gomb */}
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && (!productName || !category || !description || !location)) ||
                  (step === 2 && useImage === 'emoji' && !selectedEmoji) ||
                  (step === 3 && !price)
                }
                style={{
                  background: (
                    (step === 1 && (!productName || !category || !description || !location)) ||
                    (step === 2 && useImage === 'emoji' && !selectedEmoji) ||
                    (step === 3 && !price)
                  ) ? '#9ca3af' : 'linear-gradient(135deg, #16a34a, #15803d)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: window.innerWidth < 768 ? '14px 20px' : '12px 24px',
                  fontSize: window.innerWidth < 768 ? '16px' : '14px',
                  fontWeight: '600',
                  cursor: (
                    (step === 1 && (!productName || !category || !description || !location)) ||
                    (step === 2 && useImage === 'emoji' && !selectedEmoji) ||
                    (step === 3 && !price)
                  ) ? 'not-allowed' : 'pointer',
                  order: window.innerWidth < 768 ? '1' : '2',
                  boxShadow: (
                    (step === 1 && (!productName || !category || !description || !location)) ||
                    (step === 2 && useImage === 'emoji' && !selectedEmoji) ||
                    (step === 3 && !price)
                  ) ? 'none' : window.innerWidth < 768 ? '0 6px 20px rgba(22, 163, 74, 0.3)' : 'none'
                }}
              >
                Tovább →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLimitReached.activeAds || isLimitReached.monthlyAds}
                style={{
                  background: isLimitReached.activeAds || isLimitReached.monthlyAds 
                    ? '#9ca3af' 
                    : 'linear-gradient(135deg, #16a34a, #15803d)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: window.innerWidth < 768 ? '16px 20px' : '16px 32px',
                  fontSize: window.innerWidth < 768 ? '16px' : '18px',
                  fontWeight: '600',
                  cursor: isLimitReached.activeAds || isLimitReached.monthlyAds ? 'not-allowed' : 'pointer',
                  order: window.innerWidth < 768 ? '1' : '2',
                  boxShadow: isLimitReached.activeAds || isLimitReached.monthlyAds 
                    ? 'none' 
                    : '0 8px 24px rgba(22, 163, 74, 0.3)'
                }}
              >
                🚀 Termék publikálása
                {sendPushNotification && !isLimitReached.monthlyPushes && ' (500 Ft)'}
              </button>
            )}
          </div>display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid #e5e7eb'
          }}>
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                style={{
                  background: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ← Vissza
              </button>
            ) : (
              <div></div>
            )}
            
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && (!productName || !category || !description || !location)}
              style={{
                background: (step === 1 && (!productName || !category || !description || !location)) 
                  ? '#9ca3af' 
                  : 'linear-gradient(135deg, #16a34a, #15803d)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: (step === 1 && (!productName || !category || !description || !location)) 
                  ? 'not-allowed' 
                  : 'pointer'
              }}
            >
              Tovább →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}