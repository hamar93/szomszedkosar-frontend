'use client';

import { useState } from 'react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  productId?: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Contact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  location: string;
  verified: boolean;
  avatar: string;
  lastSeen: string;
}

interface ContactModalProps {
  seller: Contact;
  productName: string;
  productId: string;
  onClose: () => void;
}

export function ContactModal({ seller, productName, productId, onClose }: ContactModalProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'contact'>('chat');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'buyer_123',
      senderName: 'Te',
      receiverId: seller.id,
      productId: productId,
      content: `Szia! Érdekel a(z) ${productName}. Mikor tudnám átvenni?`,
      timestamp: '2024-12-15T10:30:00',
      read: true
    },
    {
      id: '2',
      senderId: seller.id,
      senderName: seller.name,
      receiverId: 'buyer_123',
      productId: productId,
      content: 'Szia! Holnap délután 15:00 után bármikor jó lenne. Mennyi kell belőle?',
      timestamp: '2024-12-15T11:15:00',
      read: true
    }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'buyer_123',
      senderName: 'Te',
      receiverId: seller.id,
      productId: productId,
      content: message,
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const callPhone = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const sendEmail = (email: string) => {
    const subject = `Érdeklődés: ${productName}`;
    const body = `Szia!\n\nÉrdekel a(z) ${productName} termék. Kérlek, vedd fel velem a kapcsolatot.\n\nÜdvözlettel`;
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '30px' }}>{seller.avatar}</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{seller.name}</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                {seller.location} • {seller.verified ? '✅ Ellenőrzött' : 'Új eladó'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #eee' }}>
          <button
            onClick={() => setActiveTab('chat')}
            style={{
              flex: 1,
              padding: '15px',
              border: 'none',
              backgroundColor: activeTab === 'chat' ? '#f8f9fa' : 'white',
              borderBottom: activeTab === 'chat' ? '2px solid #28a745' : 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'chat' ? '600' : 'normal'
            }}
          >
            💬 Üzenet
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            style={{
              flex: 1,
              padding: '15px',
              border: 'none',
              backgroundColor: activeTab === 'contact' ? '#f8f9fa' : 'white',
              borderBottom: activeTab === 'contact' ? '2px solid #28a745' : 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'contact' ? '600' : 'normal'
            }}
          >
            📞 Kapcsolat
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'chat' ? (
            <>
              {/* Messages */}
              <div style={{
                flex: 1,
                padding: '20px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      alignSelf: msg.senderId === 'buyer_123' ? 'flex-end' : 'flex-start',
                      maxWidth: '75%'
                    }}
                  >
                    <div style={{
                      padding: '10px 15px',
                      borderRadius: '12px',
                      backgroundColor: msg.senderId === 'buyer_123' ? '#28a745' : '#f8f9fa',
                      color: msg.senderId === 'buyer_123' ? 'white' : '#333',
                      fontSize: '14px',
                      lineHeight: '1.4'
                    }}>
                      {msg.content}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: '#999',
                      marginTop: '4px',
                      textAlign: msg.senderId === 'buyer_123' ? 'right' : 'left'
                    }}>
                      {new Date(msg.timestamp).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div style={{
                padding: '15px 20px',
                borderTop: '1px solid #eee',
                display: 'flex',
                gap: '10px'
              }}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Írd ide az üzeneted..."
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
                <button
                  onClick={sendMessage}
                  style={{
                    padding: '10px 15px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Küldés
                </button>
              </div>
            </>
          ) : (
            /* Contact Tab */
            <div style={{ padding: '30px' }}>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '16px', marginBottom: '15px', color: '#333' }}>Kapcsolatfelvételi lehetőségek</h4>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                  Válassz a közvetlen kapcsolatfelvételi módok közül:
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {seller.phone && (
                  <button
                    onClick={() => callPhone(seller.phone!)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '15px',
                      backgroundColor: '#e8f5e8',
                      border: '1px solid #28a745',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#28a745',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px'
                    }}>
                      📞
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '14px' }}>Telefonhívás</div>
                      <div style={{ fontSize: '13px', color: '#666' }}>{seller.phone}</div>
                    </div>
                  </button>
                )}

                {seller.email && (
                  <button
                    onClick={() => sendEmail(seller.email!)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '15px',
                      backgroundColor: '#f0f8ff',
                      border: '1px solid #007bff',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#007bff',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px'
                    }}>
                      📧
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '14px' }}>Email küldése</div>
                      <div style={{ fontSize: '13px', color: '#666' }}>{seller.email}</div>
                    </div>
                  </button>
                )}

                <div style={{
                  padding: '15px',
                  backgroundColor: '#fff8e1',
                  border: '1px solid #ffc107',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: '#856404'
                }}>
                  💡 <strong>Tipp:</strong> A belső üzenetrendszer a legbiztonságosabb módja a kapcsolattartásnak. 
                  A telefonszámot és email címet csak megbízható eladóktól fogadd el.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Termék oldal kapcsolatfelvételi gomb komponense
export function ContactButton({ seller, productName, productId }: { 
  seller: Contact; 
  productName: string; 
  productId: string; 
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        style={{
          width: '100%',
          padding: '12px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          marginBottom: '10px'
        }}
      >
        💬 Kapcsolatfelvétel
      </button>

      {showModal && (
        <ContactModal
          seller={seller}
          productName={productName}
          productId={productId}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

// Használat példa egy termék oldalon:
export function ProductPageExample() {
  const seller: Contact = {
    id: 'seller_123',
    name: 'Marika Néni',
    phone: '+36 30 123 4567',
    email: 'marika.neni@email.com',
    location: 'Balatonfüred',
    verified: true,
    avatar: '👩‍🌾',
    lastSeen: '2 órája online'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Friss meggy</h2>
      <p>800 Ft / kg</p>
      
      <ContactButton
        seller={seller}
        productName="Friss meggy"
        productId="product_123"
      />
      
      <button style={{
        width: '100%',
        padding: '12px 20px',
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer'
      }}>
        🛒 Kosárba
      </button>
    </div>
  );
}