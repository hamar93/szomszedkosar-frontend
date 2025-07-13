'use client'

import { useState } from 'react'
import Link from 'next/link'

const getProductById = (id: string) => {
  const products = {
    '1': {
      id: '1',
      name: 'Friss meggy',
      category: 'perishable',
      subcategory: 'Gyümölcs',
      price: 800,
      unit: 'kg',
      seller: {
        name: 'Marika Néni',
        avatar: '👩‍🌾',
        location: 'Balatonfüred',
        verified: true,
        rating: 4.9,
        totalSales: 156,
        memberSince: '2023',
        phone: '+36 20 123 4567'
      },
      distance: '2 km',
      rating: 4.9,
      reviews: 23,
      emoji: '🍒',
      images: ['/images/meggy1.jpg', '/images/meggy2.jpg'],
      description: 'Frissen szedett házi meggy, vegyszermentes termesztés. Tökéletes befőzéshez, sütemények készítéséhez vagy friss fogyasztásra. A meggyek érettségük csúcsán kerülnek leszedésre.',
      longDescription: `
        Házi kertünkben termett meggyek, amelyeket vegyszermentes módon termesztünk. 
        A fák több mint 15 évesek, így az íz kifejezetten intenzív és édes-savanyú.

        Ideális felhasználás:
        • Friss fogyasztás
        • Befőzés, lekvár készítés
        • Sütemények, torták
        • Szárítás

        A szüret reggel 6-8 óra között történik, így a meggyek hűvösek és frissek maradnak.
      `,
      quantity: '15 kg elérhető',
      availableQuantity: 15,
      minOrder: 2,
      maxOrder: 15,
      delivery: [
        { type: 'pickup', name: 'Személyes átvétel', price: 0, description: 'Balatonfüred, Petőfi u. 12.' },
        { type: 'local_delivery', name: 'Helyi kiszállítás', price: 500, description: '10 km-es körzetben' }
      ],
      urgent: true,
      organic: true,
      harvestDate: '2024-06-20',
      expiryDays: 3,
      storageInstructions: 'Hűvös, száraz helyen tárolva 3-4 napig friss marad.',
      nutritionInfo: {
        calories: 50,
        protein: 1,
        carbs: 12,
        fat: 0.3,
        fiber: 1.6,
        vitaminC: 10
      }
    }
  }

  return products[id as keyof typeof products]
}

interface Props {
  id: string
}

export default function ProductDetailPageClient({ id }: Props) {
  const [selectedQuantity, setSelectedQuantity] = useState(2)
  const [selectedDelivery, setSelectedDelivery] = useState('pickup')
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showReviews, setShowReviews] = useState(true)
  const [showNutrition, setShowNutrition] = useState(false)

  const product = getProductById(id)

  if (!product) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ fontSize: '64px' }}>😕</div>
        <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Termék nem található</h2>
        <Link href="/search" style={{
          background: '#16a34a',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600'
        }}>
          Vissza a böngészéshez
        </Link>
      </div>
    )
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Ár: {product.price} Ft / {product.unit}</p>
    </div>
  )
}
