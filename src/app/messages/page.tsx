'use client'
export default function MessagesPage() {
  const messages = [
    {
      id: 'conv-1',
      name: 'Nagy Anna',
      product: 'Házi eperlekvár',
      lastMessage: 'Érdekelne, hogy cukormentes-e?',
      time: '2 órája'
    },
    {
      id: 'conv-2',
      name: 'Kovács Bence',
      product: 'Bio tojás',
      lastMessage: 'Holnap el tudnám hozni reggel.',
      time: '1 napja'
    }
  ];

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Üzenetek</h1>

      <p className="text-gray-600 mb-6">
        Itt jelennek meg az érdeklődőid és vásárlóid által küldött üzenetek. Használd a felületet az egyeztetéshez!
      </p>

      <div className="space-y-4">
        {messages.map((msg) => (
          <a
            key={msg.id}
            href={`/messages/${msg.id}`}
            className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">{msg.name}</h2>
              <span className="text-sm text-gray-400">{msg.time}</span>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">{msg.product}:</span> {msg.lastMessage}
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}
