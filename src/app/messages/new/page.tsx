'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function NewMessagePage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const sellerId = searchParams.get('to')
  const productName = searchParams.get('productName') || 'a terméked iránt'

  const [message, setMessage] = useState('')
  const [preFilled, setPreFilled] = useState(false)

  useEffect(() => {
    if (!preFilled && productName) {
      setMessage(`Szia, érdeklődnék ${productName} iránt.`);
      setPreFilled(true)
    }
  }, [productName, preFilled])

  const handleSend = () => {
    if (message.trim() === '') return

    alert('Üzenet elküldve az eladónak!')
    router.push('/messages')
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Új üzenet</h1>

      <p className="text-gray-600 mb-2">
        Üzenet írása az eladónak: <span className="font-semibold">{sellerId || '[ismeretlen]'}</span>
      </p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={6}
        className="w-full border rounded p-3 mb-4"
        placeholder="Írd ide az üzeneted..."
      />

      <button
        onClick={handleSend}
        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
      >
        Üzenet küldése
      </button>
    </main>
  )
}
