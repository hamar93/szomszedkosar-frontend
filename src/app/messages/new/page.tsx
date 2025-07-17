import { Suspense } from 'react'
import MessageForm from './MessageForm'

export default function NewMessagePage() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Új üzenet</h1>
      <Suspense fallback={<p>Betöltés...</p>}>
        <MessageForm />
      </Suspense>
    </main>
  )
}