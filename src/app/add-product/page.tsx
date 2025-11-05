// src/app/add-product/page.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { LocationPicker } from '@/components/LocationSystem'
import { triggerFreshAlert } from '@/lib/api/alerts'
import { AlertPayload } from '@/types/AlertPayload'
type UserType = 'registered_producer' | 'casual_seller';

interface Location {
  lat: number;
  lng: number;
  address: string;
  city: string;
  country: string;
}

const categories = [
  { 
    id: 'perishable', 
    name: 'Romlandó termékek', 
    icon: '🥬',
    emojis: ['🍎', '🍊', '🍌', '🍇', '🍓', '🍒', '🥝', '🍑', '🍍', '🥭', '🍉', '🫐', '🥥', '🥕', '🥒', '🍅', '🥬', '🥦', '🌶️', '🫒', '🌽', '🥔', '🧄', '🧅', '🥑', '🍆', '🫑', '🥚', '🐣', '🥩', '🍖', '🐔', '🐄', '🐷', '🦆', '🐟', '🦐', '🦀', '🥛', '🧀', '🧈', '🍳', '🥯']
  },
  { 
    id: 'preserved', 
    name: 'Tartós termékek', 
    icon: '🍯',
    emojis: ['🍯', '🫙', '🍓', '🍑', '🍇', '🍊', '🍋', '🥝', '🧃', '🍹', '🥤', '🍋', '🍓', '🍑', '🍯', '🐝', '🌻', '🌼', '🌿', '🍃', '🌱', '🌼', '🌸', '☕', '🫖', '🌿', '🍃', '🌱', '🧄', '🧅', '🌶️', '🥓', '🌭', '🍖', '🐟', '🧀']
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
    emojis: ['🐄', '🐷', '🐔', '🐑', '🐐', '🦆', '🐰', '🐴', '🐈', '🐕', '🌾', '🌽', '🫘', '🥜', '🌰', '🛠️', '⚒️', '🪓', '🔨', '⛏️', '🪚', '🧰', '📦', '🚜', '🔧']
  },
  { 
    id: 'bakery', 
    name: 'Pékáruk', 
    icon: '🍞',
    emojis: ['🍞', '🥖', '🥨', '🧇', '🍰', '🎂', '🥧', '🧁', '🍪', '🥐']
  }
]

const getSubcategories = (categoryId: string): string[] => {
  const subcategoryMap: Record<string, string[]> = {
    'perishable': ['Gyümölcs', 'Zöldség', 'Tojás', 'Hús', 'Tejtermék'],
    'preserved': ['Lekvár', 'Szörp', 'Méz', 'Tea', 'Gyógynövény', 'Füstöltáru'],
    'cosmetics': ['Szappan', 'Krém', 'Balzsam', 'Olaj', 'Gyertya'],
    'rural_marketplace': ['Élő állat', 'Gabona', 'Eszközök', 'Takarmány'],
    'bakery': ['Kenyér', 'Péksütemény', 'Torta', 'Sütemény']
  }
  
  return subcategoryMap[categoryId] || []
}

const currentUser: {
  name: string;
  type: UserType;
  monthlyAds: number;
  monthlyPushes: number;
  activeAds: number;
} = {
  name: 'Kiss Margit',
  type: 'registered_producer',
  monthlyAds: 2,
  monthlyPushes: 1,
  activeAds: 1
};

export default function AddProductPage() {
  const [step, setStep] = useState<number>(1)
  const [productName, setProductName] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [subcategory, setSubcategory] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [location, setLocation] = useState<Location | null>(null)
  const [useImage, setUseImage] = useState<'emoji' | 'photo'>('emoji')
  const [selectedEmoji, setSelectedEmoji] = useState<string>('')
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [price, setPrice] = useState<string>('')
  const [unit, setUnit] = useState<string>('kg')
  const [quantity, setQuantity] = useState<string>('')
  const [isOrganic, setIsOrganic] = useState<boolean>(false)
  const [deliveryOptions, setDeliveryOptions] = useState({
    pickup: true,
    delivery: false,
    shipping: false
  })
  const [sendPushNotification, setSendPushNotification] = useState<boolean>(false)
  const [pushRadius, setPushRadius] = useState<number>(10)
  const [sendAlert, setSendAlert] = useState<boolean>(false)
  const [alertSubmissionSuccessful, setAlertSubmissionSuccessful] = useState<boolean>(false)

  const isLimitReached = {
    monthlyAds: currentUser.type === 'casual_seller' && currentUser.monthlyAds >= 5,
    monthlyPushes: currentUser.type === 'casual_seller' && currentUser.monthlyPushes >= 3,
    activeAds: currentUser.type === 'casual_seller' && currentUser.activeAds >= 3
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedImages((prev: File[]) => [...prev, ...files].slice(0, 5))
  }

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleLocationSelect = (selectedLocation: Location) => {
    setLocation(selectedLocation)
  }

  const handleSubmit = async () => {
    if (step < 4) {
      setStep(step + 1);
      return;
    }

    if (sendAlert && location) {
      const payload: AlertPayload = {
        productId: Math.floor(Math.random() * 1000), // Dummy product ID
        sellerLat: location.lat,
        sellerLon: location.lng,
        alertRadiusKm: 10,
        message: `Új termék a közelben: ${productName}`,
      };
      try {
        await triggerFreshAlert(payload);
        setAlertSubmissionSuccessful(true);
      } catch (error) {
        console.error("Alert submission failed", error);
        // Handle error state in UI
      }
    } else {
      // Handle regular product submission logic here
      console.log("Regular product submission");
    }

    console.log('Termék feltöltése:', {
      productName, category, subcategory, description, location, useImage, selectedEmoji, 
      uploadedImages, price, unit, quantity, isOrganic, deliveryOptions,
      sendPushNotification, pushRadius
    })
  }

  const selectedCategoryData = categories.find(cat => cat.id === category)

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
          maxWidth: '800px',
          margin: '0 auto',
          padding: '16px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div>
              <h1 style={{
                fontSize: '24px',
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
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: step >= stepNum ? '#16a34a' : '#e5e7eb',
                  color: step >= stepNum ? 'white' : '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
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
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            fontSize: '10px',
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
          padding: '20px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          border: '2px solid #f8fafc'
        }}>
          
          {/* STEP 1: Alapadatok */}
          {step === 1 && (
            <div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '20px'
              }}>
                Termék alapadatok
              </h2>
              
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
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
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
                        padding: '12px 8px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontSize: '20px', marginBottom: '6px' }}>
                        {cat.icon}
                      </div>
                      <div style={{
                        fontSize: '11px',
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
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  background: '#f8fafc',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #e5e7eb'
                }}>
                  <input
                    type="checkbox"
                    checked={sendAlert}
                    onChange={(e) => setSendAlert(e.target.checked)}
                    style={{
                      accentColor: '#16a34a',
                      transform: 'scale(1.2)',
                      flexShrink: 0
                    }}
                  />
                  <div>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      Friss Riasztás küldése a 10 km-es körzetbe
                    </span>
                    <p style={{
                      fontSize: '13px',
                      color: '#6b7280',
                      margin: '4px 0 0 0',
                      lineHeight: '1.4'
                    }}>
                      Értesítsd a környékbelieket az új, friss termékedről!
                    </p>
                  </div>
                </label>
              </div>

              {alertSubmissionSuccessful && (
                <div style={{
                  background: '#dcfce7',
                  color: '#166534',
                  padding: '12px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  marginBottom: '20px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  ✅ Friss riasztás elküldve a környékbelieknek!
                </div>
              )}

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

          {/* STEP 2: Kép/Ikon választás */}
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
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  
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
                        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
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
                
                {useImage === 'emoji' && selectedCategoryData && (
                  <div>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '12px'
                    }}>
                      Válassz ikont a(z) &quot;{selectedCategoryData.name}&quot; kategóriához:
                    </h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
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
                            fontSize: '24px',
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
          
          {/* STEP 3: Árazás */}
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
                      lineHeight: '1.4'
                    }}>
                      Kiemelt fontosságú a környezetbarát termesztés és feldolgozás
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}
          
          {/* STEP 4: Publikálás */}
          {step === 4 && (
            <div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '20px'
              }}>
                Publikálás
              </h2>
              
              <div style={{
                background: '#f0fdf4',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '20px',
                border: '1px solid #16a34a'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#15803d',
                  margin: '0 0 8px 0'
                }}>
                  Kész vagy a termék publikálására!
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#374151',
                  margin: 0
                }}>
                  Ellenőrizd az adatokat, majd nyomj a &quot;Termék publikálása&quot; gombra.
                </p>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <div>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Termék adatai
                  </h4>
                  <div style={{
                    background: '#fafafa',
                    borderRadius: '8px',
                    padding: '12px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151'
                      }}>
                        <span>Termék neve:</span>
                        <span style={{ fontWeight: '600', color: '#1f2937' }}>{productName}</span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151'
                      }}>
                        <span>Kategória:</span>
                        <span style={{ fontWeight: '600', color: '#1f2937' }}>{category}</span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151'
                      }}>
                        <span>Alkategória:</span>
                        <span style={{ fontWeight: '600', color: '#1f2937' }}>{subcategory || 'Nincs megadva'}</span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151'
                      }}>
                        <span>Leírás:</span>
                        <span style={{ fontWeight: '600', color: '#1f2937' }}>{description}</span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151'
                      }}>
                        <span>Helyszín:</span>
                        <span style={{ fontWeight: '600', color: '#1f2937' }}>{location?.address || 'Nincs megadva'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Kép/Ikon
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {useImage === 'photo' && uploadedImages.length > 0 && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                        gap: '8px'
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
                          </div>
                        ))}
                      </div>
                    )}
                    {useImage === 'emoji' && (
                      <div style={{
                        fontSize: '32px',
                        textAlign: 'center',
                        color: '#1f2937'
                      }}>
                        {selectedEmoji}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Elérhetőségek
                </label>
                <div style={{
                  background: '#fafafa',
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      <span>Telefonszám:</span>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>+36 30 123 4567</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      <span>Email:</span>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>margit.kiss@email.com</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Szállítási és átvételi lehetőségek
                </label>
                <div style={{
                  background: '#fafafa',
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      <span>Átvételi lehetőség:</span>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>
                        {deliveryOptions.pickup ? 'Személyes átvétel' : 'Nincs'}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      <span>Házhoz szállítás:</span>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>
                        {deliveryOptions.delivery ? 'Elérhető' : 'Nincs'}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      <span>Postai küldemény:</span>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>
                        {deliveryOptions.shipping ? 'Elérhető' : 'Nincs'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Footer buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '24px'
          }}>
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              style={{
                background: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '10px 16px',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                color: '#6b7280',
                textAlign: 'center',
                cursor: step === 1 ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              ← Vissza
            </button>
            <button
              onClick={handleSubmit}
              style={{
                background: '#16a34a',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 16px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'white',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flex: '1'
              }}
            >
              {step === 4 ? 'Termék publikálása' : 'Következő lépés →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}