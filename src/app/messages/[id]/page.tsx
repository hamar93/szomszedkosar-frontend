'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function MessageThreadPage() {
  const { id } = useParams()
  const [messages, setMessages] = useState([
    { from: 'partner', text: 'Szia, érdekelne a terméked még elérhető?', time: '2 órája' },
    { from: 'me', text: 'Igen, még van belőle pár darab!', time: '1 órája' }
  ])
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = () => {
    if (newMessage.trim() === '') return

    setMessages([...messages, { from: 'me', text: newMessage, time: 'most' }])
    setNewMessage('')
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Beszélgetés</h1>

      <div className="border rounded-lg p-4 mb-4 space-y-3 bg-white shadow-sm">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.from === 'me'
                  ? 'bg-green-100 text-right'
                  : 'bg-gray-100 text-left'
              }`}
            >
              <div className="text-sm">{msg.text}</div>
              <div className="text-xs text-gray-500 mt-1">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Írd be az üzeneted..."
          className="flex-1 border rounded px-4 py-2"
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Küldés
        </button>
      </div>
    </main>
  )
}
