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
      // Gyümölcs
      '🍎', '🍊', '🍌', '🍇', '🍓', '🍒', '🥝', '🍑', '🍍', '🥭', '🍉', '🫐', '🥥',
      // Zöldség  
      '🥕', '🥒', '🍅', '🥬', '🥦', '🌶️', '🫒', '🌽', '🥔', '🧄', '🧅', '🥑', '🍆', '🫑',
      // Tojás
      '🥚', '🐣',
      // Hús
      '🥩', '🍖', '🐔', '🐄', '🐷', '🦆', '🐟', '🦐', '🦀',
      // Tejtermék
      '🥛', '🧀', '🧈', '🍳', '🥯'
    ]
  },
  { 
    id: 'preserved', 
    name: 'Tartós termékek', 
    icon: '🍯',
    emojis: [
      // Lekvár
      '🍯', '🫙', '🍓', '🍑', '🍇', '🍊', '🍋', '🥝',
      // Szörp
      '🧃', '🍹', '🥤', '🍋', '🍓', '🍑',
      // Méz
      '🍯', '🐝', '🌻', '🌼',
      // Tea
      '🌿', '🍃', '🌱', '🌼', '🌸', '☕', '🫖',
      // Gyógynövény
      '🌿', '🍃', '🌱', '🧄', '🧅', '🌶️',
      // Füstöltáru
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
      // Élő állat
      '🐄', '🐷', '🐔', '🐑', '🐐', '🦆', '🐰', '🐴', '🐈', '🐕',
      // Gabona
      '🌾', '🌽', '🫘', '🥜', '🌰',
      // Eszközök
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
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        zIndex: 40
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '16px' // Egységes padding minden eszközön
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column', // Mobil: oszloposan
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div>
              <h1 style={{
                fontSize: '24px', // Kisebb cím mobilon
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
                textAlign: 'center', // Centrálás mobilon
                alignSelf: 'stretch' // Teljes szélesség mobilon
              }}
            >
              ← Vissza a profilba
            </Link>
          </div>
          
          {/* Progress bar - Mobiloptimalizált */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px', // Kisebb gap mobilon
            marginBottom: '8px'
          }}>
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px', // Kisebb gap
                flex: '1' // Egyenlő elosztás
              }}>
                <div style={{
                  width: '28px', // Kisebb kör mobilon
                  height: '28px',
                  borderRadius: '50%',
                  background: step >= stepNum ? '#16a34a' : '#e5e7eb',
                  color: step >= stepNum ? 'white' : '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px', // Kisebb szöveg
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
              </div>
            ))}
          </div>
          
          {/* Step labels - Mobilbarát */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            fontSize: '10px', // Még kisebb szöveg mobilon
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

      {/* Form tartalma - Mobiloptimalizált */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '16px' // Egységes padding mindenhol
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px', // Kisebb border radius mobilon
          padding: '20px', // Kisebb padding mobilon
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          border: '2px solid #f8fafc'
        }}>
          
          {/* STEP 1: Alapadatok - Mobiloptimalizált */}
          {step === 1 && (
            <div>
              <h2 style={{
                fontSize: '20px', // Kisebb cím
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '20px'
              }}>
                Termék alapadatok
              </h2>
              
              {/* Termék név - Mobilbarát */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px', // Kisebb label
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
                    padding: '12px', // Kisebb padding
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px', // Kisebb border radius
                    fontSize: '14px', // Kisebb szöveg
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
              </div>

              {/* LocationPicker - Már mobilbarát */}
              <LocationPicker onLocationSelect={handleLocationSelect} />
              
              {/* Kiválasztott helyszín - Mobiloptimalizált */}
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
              
              {/* Kategória választás - Responsive grid */}
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
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', // Kisebb min-width mobilra
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
                        padding: '12px 8px', // Kisebb padding
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontSize: '20px', marginBottom: '6px' }}>
                        {cat.icon}
                      </div>
                      <div style={{
                        fontSize: '11px', // Kisebb szöveg
                        fontWeight: '600',
                        color: category === cat.id ? '#15803d' : '#6b7280',
                        lineHeight: '1.2'
                      }}>
                        {cat.name}
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Alkategória - Responsive */}
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
                            padding: '5px 10px', // Kisebb padding
                            fontSize: '11px', // Kisebb szöveg
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
              
              {/* Leírás - Mobiloptimalizált */}
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
              </div>
            </div>
          )}
          
          {/* STEP 2: Kép/Ikon - Mobiloptimalizált */}
          {step === 2 && (
            <div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '20px'
              }}>
                Termék képe
              </h2>
              
              {/* Képfeltöltás választók - Mobilbarát */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column', // Mobil: oszloposan
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
                      transition: 'all 0.2s ease'
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
                      transition: 'all 0.2s ease'
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
                
                {/* Képfeltöltés interface - Mobiloptimalizált */}
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
                    
                    {/* Feltöltött képek - Mobilbarát grid */}
                    {uploadedImages.length > 0 && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', // Kisebb képek mobilon
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
                
                {/* Emoji választás - Mobiloptimalizált grid */}
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
                      gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))', // Kisebb cellák mobilon
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
                            fontSize: '24px', // Kisebb emoji mobilon
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
          
          {/* STEP 3: Árazás - Mobiloptimalizált */}
          {step === 3 && (
            <div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '20px'
              }}>
                Árazás és részletek
              </h2>
              
              {/* Ár és mértékegység - Responsive grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
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
              
              {/* Mennyiség - Mobiloptimalizált */}
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
              </div>
              
              {/* Bio termék - Mobilbarát checkbox */}
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
              
              {/* Szállítási opciók - Mobiloptimalizált */}
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
                    <span style={{ fontSize: '14px', lineHeight: '1.3' }}>📦 Postai küldés (tartós termékek)</span>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {/* STEP 4: Publikálás - Mobiloptimalizált */}
          {step === 4 && (
            <div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '20px'
              }}>
                Publikálás és értesítések
              </h2>
              
              {/* Termék előnézete - Mobilbarát */}
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
                  flexDirection: 'column', // Mobil: oszloposan
                  gap: '12px'
                }}>
                  {/* Termék képe/ikonja - Mobilon felül */}
                  <div style={{
                    alignSelf: 'center',
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
                    backgroundPosition: 'center'
                  }}>
                    {useImage === 'emoji' && selectedEmoji}
                  </div>
                  
                  {/* Termék info - Centrált mobilon */}
                  <div style={{ textAlign: 'center' }}>
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
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
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
                        justifyContent: 'center',
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
                    {/* Helyszín megjelenítése */}
                    {location && (
                      <div style={{
                        fontSize: '12px',
                        color: '#16a34a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}>
                        📍 {location.city}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Push értesítés - Mobiloptimalizált */}
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
                
                {/* Push beállítások - Mobilbarát */}
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
          )}
          
          {/* Navigációs gombok - Mobiloptimalizált */}
          <div style={{
            display: 'flex',
            flexDirection: 'column', // Mobil: oszloposan
            gap: '12px',
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid #e5e7eb'
          }}>
            
            {/* Desktop layout */}
            <div style={{
              display: 'none' // Elrejtve mobilon
            }} className="desktop-nav">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    style={{
                      background: 'white',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      color: '#6b7280',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    ← Vissza
                  </button>
                ) : (
                  <div></div>
                )}
                
                {step < 4 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={
                      (step === 1 && (!productName || !category || !description || !location)) ||
                      (step === 2 && useImage === 'emoji' && !selectedEmoji) ||
                      (step === 3 && !price)
                    }
                    style={{
                      background: 'linear-gradient(135deg, #16a34a, #15803d)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      opacity: (
                        (step === 1 && (!productName || !category || !description || !location)) ||
                        (step === 2 && useImage === 'emoji' && !selectedEmoji) ||
                        (step === 3 && !price)
                      ) ? 0.5 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
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
                      padding: '16px 32px',
                      fontSize: '18px',
                      fontWeight: '600',
                      cursor: isLimitReached.activeAds || isLimitReached.monthlyAds ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: isLimitReached.activeAds || isLimitReached.monthlyAds 
                        ? 'none' 
                        : '0 8px 24px rgba(22, 163, 74, 0.3)'
                    }}
                  >
                    🚀 Termék publikálása
                    {sendPushNotification && !isLimitReached.monthlyPushes && ' (500 Ft)'}
                  </button>
                )}
              </div>
            </div>
            
            {/* Mobile layout - Mobilbarát gombok */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }} className="mobile-nav">
              
              {/* Tovább/Publikálás gomb - Mindig felül */}
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
                    borderRadius: '10px',
                    padding: '14px 20px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: (
                      (step === 1 && (!productName || !category || !description || !location)) ||
                      (step === 2 && useImage === 'emoji' && !selectedEmoji) ||
                      (step === 3 && !price)
                    ) ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%'
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
                    borderRadius: '10px',
                    padding: '16px 20px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isLimitReached.activeAds || isLimitReached.monthlyAds ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    boxShadow: isLimitReached.activeAds || isLimitReached.monthlyAds 
                      ? 'none' 
                      : '0 6px 20px rgba(22, 163, 74, 0.3)'
                  }}
                >
                  🚀 Termék publikálása
                  {sendPushNotification && !isLimitReached.monthlyPushes && ' (500 Ft)'}
                </button>
              )}
              
              {/* Vissza gomb - Csak ha van előző lépés */}
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  style={{
                    background: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    color: '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%'
                  }}
                >
                  ← Vissza
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for responsive navigation */}
      <style jsx>{`
        .desktop-nav {
          display: flex !important;
        }
        .mobile-nav {
          display: none !important;
        }
        
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  )
}
                  
    </div>
  )
}

export default AddProductPage