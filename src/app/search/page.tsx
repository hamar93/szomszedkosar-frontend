// src/app/search/page.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'

// Termék kategóriák és típusok
const categories = [
  { 
    id: 'perishable', 
    name: 'Romlandó termékek', 
    icon: '🥬',
    subcategories: ['Gyümölcs', 'Zöldség', 'Tojás', 'Hús', 'Tejtermék']
  },
  { 
    id: 'preserved', 
    name: 'Tartós termékek', 
    icon: '🍯',
    subcategories: ['Lekvár', 'Szörp', 'Füstöltáru', 'Méz', 'Tea', 'Gyógynövény']
  },
  { 
    id: 'cosmetics', 
    name: 'Házi kozmetikum', 
    icon: '🧼',
    subcategories: ['Szappan', 'Krém', 'Balzsam', 'Olaj']
  },
  { 
    id: 'rural_marketplace', 
    name: 'Falusi marketplace', 
    icon: '🐄',
    subcategories: ['Élő állat', 'Gabona', 'Eszközök', 'Takarmány']
  }
]

// Mock termékek
const mockProducts = [
  // Romlandó termékek
  {
    id: '1',
    name: 'Friss meggy',
    category: 'perishable',
    subcategory: 'Gyümölcs',
    price: 800,
    unit: 'kg',
    seller: 'Marika Néni',
    location: 'Balatonfüred',
    distance: '2 km',
    rating: 4.9,
    reviews: 23,
    emoji: '🍒',
    description: 'Frissen szedett házi meggy, vegyszermentes.',
    quantity: '15 kg elérhető',
    delivery: ['pickup', 'local_delivery'],
    urgent: true,
    organic: true
  },
  {
    id: '2',
    name: 'Bio tojás',
    category: 'perishable',
    subcategory: 'Tojás',
    price: 60,
    unit: 'db',
    seller: 'Kovács Gazda',
    location: 'Veszprém',
    distance: '5 km',
    rating: 4.8,
    reviews: 45,
    emoji: '🥚',
    description: 'Szabadtartású tyúkok tojásai.',
    quantity: '50 db készleten',
    delivery: ['pickup'],
    organic: true
  },
  {
    id: '3',
    name: 'Bakonyi barna csirke',
    category: 'perishable',
    subcategory: 'Hús',
    price: 2500,
    unit: 'kg',
    seller: 'János B.',
    location: 'Bakony',
    distance: '8 km',
    rating: 4.9,
    reviews: 67,
    emoji: '🐔',
    description: 'Előrendelés: jövő kedden 10 csirke vágás.',
    quantity: 'Előrendelés szükséges',
    delivery: ['pickup'],
    preorder: true,
    date: 'Jövő kedd'
  },
  
  // Tartós termékek
  {
    id: '4',
    name: 'Házi meggylekvár',
    category: 'preserved',
    subcategory: 'Lekvár',
    price: 1200,
    unit: 'üveg',
    seller: 'Kiss Margit',
    location: 'Jaszberény',
    distance: '12 km',
    rating: 4.7,
    reviews: 34,
    emoji: '🍯',
    description: 'Cukor nélkül főzött, steviával édesített.',
    quantity: '20 üveg készleten',
    delivery: ['pickup', 'local_delivery', 'shipping'],
    organic: true
  },
  {
    id: '5',
    name: 'Akác méz',
    category: 'preserved',
    subcategory: 'Méz',
    price: 2800,
    unit: 'kg',
    seller: 'Méhész Pista',
    location: 'Tata',
    distance: '15 km',
    rating: 5.0,
    reviews: 89,
    emoji: '🍯',
    description: 'Kristálytiszta akácméz, saját méhészetből.',
    quantity: '50 kg elérhető',
    delivery: ['pickup', 'shipping']
  },
  {
    id: '8',
    name: 'Házi vadgesztenye méz',
    category: 'preserved',
    subcategory: 'Méz',
    price: 3200,
    unit: 'kg',
    seller: 'Bakonyi Méhész',
    location: 'Zirc',
    distance: '18 km',
    rating: 4.9,
    reviews: 45,
    emoji: '🍯',
    description: 'Sötét, aromás vadgesztenye méz. Különleges íz.',
    quantity: '25 kg készleten',
    delivery: ['pickup', 'shipping'],
    organic: true
  },
  {
    id: '9',
    name: 'Kamilla tea (szárított)',
    category: 'preserved',
    subcategory: 'Tea',
    price: 1800,
    unit: 'csomag',
    seller: 'Gyógynövény Kert',
    location: 'Szentendre',
    distance: '14 km',
    rating: 4.8,
    reviews: 23,
    emoji: '🌼',
    description: 'Házi szárítású kamilla virág. Nyugtató hatású.',
    quantity: '30 csomag (50g)',
    delivery: ['pickup', 'local_delivery', 'shipping'],
    organic: true
  },
  {
    id: '10',
    name: 'Gyógynövény tea keverék',
    category: 'preserved',
    subcategory: 'Tea',
    price: 2200,
    unit: 'csomag',
    seller: 'Herbárium Néni',
    location: 'Visegrád',
    distance: '16 km',
    rating: 4.6,
    reviews: 18,
    emoji: '🌿',
    description: 'Saját kertből: menta, citromfű, levendula keverék.',
    quantity: '15 csomag (100g)',
    delivery: ['pickup', 'shipping'],
    organic: true
  },
  {
    id: '11',
    name: 'Hársfavirág tea',
    category: 'preserved',
    subcategory: 'Tea',
    price: 1600,
    unit: 'csomag',
    seller: 'Erdei Gyűjtő',
    location: 'Pilisszentkereszt',
    distance: '22 km',
    rating: 4.7,
    reviews: 31,
    emoji: '🌸',
    description: 'Vadról szedett hársvirág, természetesen szárítva.',
    quantity: '40 csomag (30g)',
    delivery: ['pickup', 'shipping']
  },
  {
    id: '12',
    name: 'Füstölt szalonna',
    category: 'preserved',
    subcategory: 'Füstöltáru',
    price: 4500,
    unit: 'kg',
    seller: 'Tanyasi Gazda',
    location: 'Kunság',
    distance: '25 km',
    rating: 4.9,
    reviews: 67,
    emoji: '🥓',
    description: 'Házi füstölésű szalonna, tölgyfa füsttel.',
    quantity: '20 kg elérhető',
    delivery: ['pickup']
  },
  {
    id: '13',
    name: 'Házi kolbász',
    category: 'preserved',
    subcategory: 'Füstöltáru',
    price: 3800,
    unit: 'kg',
    seller: 'Mészáros Józsi',
    location: 'Gödöllő',
    distance: '19 km',
    rating: 4.8,
    reviews: 52,
    emoji: '🌭',
    description: 'Házi készítésű, füstölt kolbász. Hagyományos recept.',
    quantity: '12 kg készleten',
    delivery: ['pickup', 'local_delivery']
  },
  
  // Munch-szerű kedvezmények
  {
    id: '6',
    name: 'Túlérett almák - AKCIÓ!',
    category: 'perishable',
    subcategory: 'Gyümölcs',
    price: 250,
    originalPrice: 400,
    unit: 'kg',
    seller: 'Szabó Kert',
    location: 'Esztergom',
    distance: '7 km',
    rating: 4.5,
    reviews: 12,
    emoji: '🍎',
    description: 'Túlérett, de még kiváló befőzéshez!',
    quantity: '30 kg - gyorsan elkel',
    delivery: ['pickup'],
    discount: true,
    discountPercent: 37,
    urgent: true
  },
  
  // Falusi marketplace
  {
    id: '7',
    name: 'Mangalica malac',
    category: 'rural_marketplace',
    subcategory: 'Élő állat',
    price: 45000,
    unit: 'db',
    seller: 'Tanyasi Gazda',
    location: 'Kunság',
    distance: '25 km',
    rating: 4.8,
    reviews: 8,
    emoji: '🐷',
    description: 'Fajtiszta mangalica malac, 3 hónapos.',
    quantity: '5 db elérhető',
    delivery: ['pickup']
  }
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSubcategory, setSelectedSubcategory] = useState('all')
  const [sortBy, setSortBy] = useState('distance') // distance, price_low, price_high, rating
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    maxDistance: 30,
    priceRange: [0, 10000],
    organic: false,
    delivery: 'all', // pickup, local_delivery, shipping
    urgent: false,
    discount: false
  })

  // Szűrés és rendezés
  const filteredProducts = mockProducts
    .filter(product => {
      // Szöveges keresés
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      
      // Kategória szűrés
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false
      }
      
      // Alkategória szűrés
      if (selectedSubcategory !== 'all' && product.subcategory !== selectedSubcategory) {
        return false
      }
      
      // Távolság szűrés
      const distance = parseInt(product.distance.replace(' km', ''))
      if (distance > filters.maxDistance) {
        return false
      }
      
      // Ár szűrés
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }
      
      // Bio szűrés
      if (filters.organic && !product.organic) {
        return false
      }
      
      // Sürgős szűrés
      if (filters.urgent && !product.urgent) {
        return false
      }
      
      // Kedvezmény szűrés
      if (filters.discount && !product.discount) {
        return false
      }
      
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return parseInt(a.distance) - parseInt(b.distance)
        case 'price_low':
          return a.price - b.price
        case 'price_high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #fefcf3 50%, #fff7ed 100%)'
    }}>
      
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        zIndex: 40
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px 16px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#1f2937',
                margin: '0 0 8px 0'
              }}>
                Termékek böngészése
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
                <span>Böngészés</span>
              </div>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                background: showFilters ? '#16a34a' : 'white',
                color: showFilters ? 'white' : '#16a34a',
                border: '2px solid #16a34a',
                borderRadius: '12px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🔧 Szűrők {showFilters ? '✓' : ''}
            </button>
          </div>
          
          {/* Keresősáv */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div style={{
              flex: 1,
              display: 'flex',
              background: 'white',
              borderRadius: '12px',
              border: '2px solid #e5e7eb',
              overflow: 'hidden'
            }}>
              <input
                type="text"
                placeholder="Mit keresel? (pl. meggy, lekvár, csirke...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '16px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px'
                }}
              />
              <button style={{
                background: '#16a34a',
                color: 'white',
                border: 'none',
                padding: '16px',
                cursor: 'pointer',
                fontSize: '16px'
              }}>
                🔍
              </button>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                background: 'white'
              }}
            >
              <option value="distance">Távolság szerint</option>
              <option value="price_low">Ár: alacsony→magas</option>
              <option value="price_high">Ár: magas→alacsony</option>
              <option value="rating">Értékelés szerint</option>
            </select>
          </div>
          
          {/* Kategóriák */}
          <div style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSelectedSubcategory('all')
              }}
              style={{
                background: selectedCategory === 'all' ? '#16a34a' : 'white',
                color: selectedCategory === 'all' ? 'white' : '#6b7280',
                border: '2px solid #e5e7eb',
                borderColor: selectedCategory === 'all' ? '#16a34a' : '#e5e7eb',
                borderRadius: '12px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              📋 Összes
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id)
                  setSelectedSubcategory('all')
                }}
                style={{
                  background: selectedCategory === category.id ? '#16a34a' : 'white',
                  color: selectedCategory === category.id ? 'white' : '#6b7280',
                  border: '2px solid #e5e7eb',
                  borderColor: selectedCategory === category.id ? '#16a34a' : '#e5e7eb',
                  borderRadius: '12px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Alkategóriák */}
          {selectedCategoryData && (
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '12px',
              overflowX: 'auto',
              paddingBottom: '4px'
            }}>
              <button
                onClick={() => setSelectedSubcategory('all')}
                style={{
                  background: selectedSubcategory === 'all' ? '#dcfce7' : '#f8fafc',
                  color: selectedSubcategory === 'all' ? '#15803d' : '#6b7280',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                Összes
              </button>
              
              {selectedCategoryData.subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  style={{
                    background: selectedSubcategory === sub ? '#dcfce7' : '#f8fafc',
                    color: selectedSubcategory === sub ? '#15803d' : '#6b7280',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '4px 12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Szűrők panel */}
      {showFilters && (
        <div style={{
          background: '#f8fafc',
          borderBottom: '1px solid #e5e7eb',
          padding: '20px 16px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            
            {/* Távolság */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Maximum távolság: {filters.maxDistance} km
              </label>
              <input
                type="range"
                min="5"
                max="50"
                value={filters.maxDistance}
                onChange={(e) => setFilters({...filters, maxDistance: parseInt(e.target.value)})}
                style={{
                  width: '100%',
                  accentColor: '#16a34a'
                }}
              />
            </div>
            
            {/* Gyors szűrők */}
            <div>
              <span style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Gyors szűrők
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={filters.organic}
                    onChange={(e) => setFilters({...filters, organic: e.target.checked})}
                    style={{ accentColor: '#16a34a' }}
                  />
                  <span style={{ fontSize: '14px' }}>🌱 Csak bio termékek</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={filters.urgent}
                    onChange={(e) => setFilters({...filters, urgent: e.target.checked})}
                    style={{ accentColor: '#16a34a' }}
                  />
                  <span style={{ fontSize: '14px' }}>🔥 Sürgős ajánlatok</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={filters.discount}
                    onChange={(e) => setFilters({...filters, discount: e.target.checked})}
                    style={{ accentColor: '#16a34a' }}
                  />
                  <span style={{ fontSize: '14px' }}>💰 Akciós termékek</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Termékek listája */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 16px'
      }}>
        
        {/* Eredmények száma */}
        <div style={{
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '16px',
            color: '#6b7280'
          }}>
            {filteredProducts.length} termék találat
          </span>
          
          {/* Gyors akcók */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setFilters({...filters, urgent: !filters.urgent})}
              style={{
                background: filters.urgent ? '#fbbf24' : 'white',
                color: filters.urgent ? 'white' : '#fbbf24',
                border: '2px solid #fbbf24',
                borderRadius: '8px',
                padding: '4px 8px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🔥 Sürgős
            </button>
            <button
              onClick={() => setFilters({...filters, discount: !filters.discount})}
              style={{
                background: filters.discount ? '#dc2626' : 'white',
                color: filters.discount ? 'white' : '#dc2626',
                border: '2px solid #dc2626',
                borderRadius: '8px',
                padding: '4px 8px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              💰 Akció
            </button>
          </div>
        </div>
        
        {/* Termékek grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                border: product.urgent ? '3px solid #fbbf24' : '2px solid #f8fafc',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.15)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)'
              }}
            >
              
              {/* Címkék */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                zIndex: 10
              }}>
                {product.urgent && (
                  <span style={{
                    background: '#fbbf24',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>
                    🔥 SÜRGŐS
                  </span>
                )}
                {product.discount && (
                  <span style={{
                    background: '#dc2626',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>
                    -{product.discountPercent}%
                  </span>
                )}
                {product.organic && (
                  <span style={{
                    background: '#16a34a',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>
                    🌱 BIO
                  </span>
                )}
                {product.preorder && (
                  <span style={{
                    background: '#8b5cf6',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>
                    📅 ELŐRENDEL
                  </span>
                )}
              </div>
              
              {/* Értékelés */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'white',
                borderRadius: '8px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                zIndex: 10
              }}>
                <span style={{ fontSize: '12px' }}>⭐</span>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#1f2937' }}>
                  {product.rating}
                </span>
                <span style={{ fontSize: '10px', color: '#6b7280' }}>
                  ({product.reviews})
                </span>
              </div>
              
              {/* Termék kép/emoji */}
              <div style={{
                height: '180px',
                background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '60px'
              }}>
                {product.emoji}
              </div>
              
              {/* Termék információ */}
              <div style={{ padding: '20px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1f2937',
                    margin: 0,
                    lineHeight: '1.2'
                  }}>
                    {product.name}
                  </h3>
                  
                  <div style={{ textAlign: 'right' }}>
                    {product.originalPrice && (
                      <div style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        textDecoration: 'line-through'
                      }}>
                        {product.originalPrice} Ft/{product.unit}
                      </div>
                    )}
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: product.discount ? '#dc2626' : '#16a34a'
                    }}>
                      {product.price} Ft/{product.unit}
                    </div>
                  </div>
                </div>
                
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: '0 0 12px 0',
                  lineHeight: '1.4'
                }}>
                  {product.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '12px'
                }}>
                  <span>👤 {product.seller}</span>
                  <span>📍 {product.distance}</span>
                </div>
                
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '16px'
                }}>
                  📦 {product.quantity}
                </div>
                
                {/* Szállítási opciók */}
                <div style={{
                  display: 'flex',
                  gap: '4px',
                  marginBottom: '16px',
                  flexWrap: 'wrap'
                }}>
                  {product.delivery.includes('pickup') && (
                    <span style={{
                      background: '#f0fdf4',
                      color: '#16a34a',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: '600'
                    }}>
                      🚚 Átvétel
                    </span>
                  )}
                  {product.delivery.includes('local_delivery') && (
                    <span style={{
                      background: '#fef3c7',
                      color: '#f59e0b',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: '600'
                    }}>
                      🚗 Kiszállítás
                    </span>
                  )}
                  {product.delivery.includes('shipping') && (
                    <span style={{
                      background: '#ede9fe',
                      color: '#8b5cf6',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: '600'
                    }}>
                      📦 Postázás
                    </span>
                  )}
                </div>
                
                {/* Gombok */}
                <div style={{
                  display: 'flex',
                  gap: '8px'
                }}>
                  <button style={{
                    flex: 1,
                    background: 'white',
                    border: '2px solid #16a34a',
                    color: '#16a34a',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    💬 Üzenet
                  </button>
                  <Link
                    href={`/product/${product.id}`}
                    style={{
                      flex: 1,
                      background: '#16a34a',
                      color: 'white',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textDecoration: 'none',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    👁️ Részletek
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#6b7280'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
              Nincs találat
            </h3>
            <p>Próbáld meg módosítani a keresési feltételeket.</p>
          </div>
        )}
        
        {/* Load more gomb */}
        {filteredProducts.length > 0 && (
          <div style={{
            textAlign: 'center',
            marginTop: '40px'
          }}>
            <button style={{
              background: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#6b7280',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#16a34a'
              e.currentTarget.style.color = '#16a34a'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb'
              e.currentTarget.style.color = '#6b7280'
            }}>
              További termékek betöltése
            </button>
          </div>
        )}
      </div>
    </div>
  )
}