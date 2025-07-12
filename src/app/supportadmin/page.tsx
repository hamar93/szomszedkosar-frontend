'use client';

import { useState } from 'react';

interface Message {
  type: 'user' | 'support' | 'system';
  text: string;
  time: string;
}

interface ChatData {
  name: string;
  info: string;
  avatar: string;
  messages: Message[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  userId: string;
  email: string;
  phone: string;
  lastActivity: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'individual' | 'farmer' | 'business';
  registrationDate: string;
  totalSpent: number;
  status: 'active' | 'suspended' | 'banned';
  warnings: number;
}

export default function AdminSupportPage() {
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const chatData: Record<string, ChatData> = {
    urgent1: {
      name: 'János Kovács',
      info: 'Regisztrált 2024.03.15 • Őstermelő',
      avatar: 'J',
      priority: 'urgent',
      category: 'payment',
      userId: 'user_001',
      email: 'janos.kovacs@email.com',
      phone: '+36 30 123 4567',
      lastActivity: '2 perce',
      messages: [
        { type: 'user', text: 'Sziasztok! Fizetni akartam a push értesítésért, de a SimplePay nem működik.', time: '14:32' },
        { type: 'user', text: 'Mindig hibát ír ki amikor a kártyaadatokat beírom.', time: '14:33' },
        { type: 'system', text: 'Várakozási idő: 8 perc', time: '14:33' }
      ]
    },
    normal1: {
      name: 'Mária Nagy',
      info: 'Új felhasználó • Vendég',
      avatar: 'M',
      priority: 'medium',
      category: 'registration',
      userId: 'user_002',
      email: 'maria.nagy@email.com',
      phone: '+36 20 987 6543',
      lastActivity: '5 perce',
      messages: [
        { type: 'user', text: 'Jó napot! Szeretnék regisztrálni, de nem tudom, hogy őstermelőként vagy magánszemélyként?', time: '14:42' },
        { type: 'system', text: 'Várakozási idő: 3 perc', time: '14:42' }
      ]
    }
  };

  const users: User[] = [
    {
      id: 'user_001',
      name: 'János Kovács',
      email: 'janos.kovacs@email.com',
      userType: 'farmer',
      registrationDate: '2024-03-15',
      totalSpent: 12500,
      status: 'active',
      warnings: 0
    },
    {
      id: 'user_002',
      name: 'Mária Nagy',
      email: 'maria.nagy@email.com',
      userType: 'individual',
      registrationDate: '2024-12-10',
      totalSpent: 0,
      status: 'active',
      warnings: 0
    },
    {
      id: 'user_003',
      name: 'Péter Szabó',
      email: 'peter.szabo@email.com',
      userType: 'business',
      registrationDate: '2024-01-20',
      totalSpent: 45000,
      status: 'suspended',
      warnings: 2
    }
  ];

  const openChat = (chatId: string) => {
    setCurrentChat(chatId);
  };

  const insertQuickResponse = (text: string) => {
    setInputValue(text);
  };

  const sendMessage = () => {
    if (!inputValue.trim() || !currentChat) return;

    const newMessage: Message = {
      type: 'support',
      text: inputValue,
      time: new Date().toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })
    };

    chatData[currentChat].messages.push(newMessage);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const banUser = (userId: string) => {
    if (confirm('Biztosan kitiltod ezt a felhasználót?')) {
      const user = users.find(u => u.id === userId);
      if (user) {
        user.status = 'banned';
        alert(`${user.name} kitiltva!`);
      }
    }
  };

  const suspendUser = (userId: string) => {
    if (confirm('Biztosan felfüggeszted ezt a felhasználót?')) {
      const user = users.find(u => u.id === userId);
      if (user) {
        user.status = 'suspended';
        alert(`${user.name} felfüggesztve!`);
      }
    }
  };

  const refundPayment = (userId: string, amount: number) => {
    if (confirm(`Biztosan visszatéríted a ${amount} Ft-ot?`)) {
      alert(`${amount} Ft visszatérítés kezdeményezve!`);
    }
  };

  const currentChatData = currentChat ? chatData[currentChat] : null;
  const currentUser = selectedUser ? users.find(u => u.id === selectedUser) : null;

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', 
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.05)', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: 'linear-gradient(45deg, #e53e3e, #c53030)', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px'
          }}>
            🛒
          </div>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>SzomszédKosár Admin Support</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            padding: '8px 16px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#48bb78', borderRadius: '50%' }}></div>
            <span style={{ fontSize: '14px' }}>Support Agent - Online</span>
          </div>
          <button style={{ 
            padding: '8px 16px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '6px',
            color: 'white',
            cursor: 'pointer'
          }}>
            Kijelentkezés
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100vh - 70px)' }}>
        {/* Enhanced Sidebar */}
        <div style={{ 
          width: '350px', 
          backgroundColor: 'rgba(255, 255, 255, 0.05)', 
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '20px',
          overflowY: 'auto'
        }}>
          {/* Navigation Tabs */}
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            {[
              { id: 'chats', label: 'Chattek', icon: '💬' },
              { id: 'users', label: 'Felhasználók', icon: '👥' },
              { id: 'reports', label: 'Jelentések', icon: '📊' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: activeTab === tab.id ? '#e53e3e' : 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '12px',
                  margin: '0 2px'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'chats' && (
            <>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                <div style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                  borderRadius: '8px', 
                  padding: '15px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e53e3e' }}>8</div>
                  <div style={{ fontSize: '12px', color: '#a0aec0' }}>Aktív chat</div>
                </div>
                <div style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                  borderRadius: '8px', 
                  padding: '15px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e53e3e' }}>23</div>
                  <div style={{ fontSize: '12px', color: '#a0aec0' }}>Mai megoldott</div>
                </div>
              </div>

              {/* Queue */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Sürgős chattek</div>
                <div 
                  style={{
                    backgroundColor: 'rgba(245, 101, 101, 0.1)',
                    border: '1px solid rgba(245, 101, 101, 0.5)',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '8px',
                    cursor: 'pointer'
                  }}
                  onClick={() => openChat('urgent1')}
                >
                  <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>János - Fizetési probléma</div>
                  <div style={{ fontSize: '11px', color: '#a0aec0' }}>8 perce vár • Magas prioritás</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Aktív chattek</div>
                <div 
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '8px',
                    cursor: 'pointer'
                  }}
                  onClick={() => openChat('normal1')}
                >
                  <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Mária - Regisztráció</div>
                  <div style={{ fontSize: '11px', color: '#a0aec0' }}>3 perce vár • Normál prioritás</div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '15px' }}>Felhasználó kezelés</div>
              <input
                type="text"
                placeholder="Keresés név vagy email alapján..."
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  color: 'white',
                  marginBottom: '15px'
                }}
              />
              {users.map(user => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user.id)}
                  style={{
                    backgroundColor: selectedUser === user.id ? 'rgba(229, 62, 62, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '500' }}>{user.name}</div>
                    <div style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      backgroundColor: user.status === 'active' ? '#48bb78' : user.status === 'suspended' ? '#ed8936' : '#e53e3e',
                      color: 'white'
                    }}>
                      {user.status === 'active' ? 'AKTÍV' : user.status === 'suspended' ? 'FELFÜGGESZTVE' : 'KITILTVA'}
                    </div>
                  </div>
                  <div style={{ fontSize: '11px', color: '#a0aec0' }}>{user.email}</div>
                  <div style={{ fontSize: '11px', color: '#a0aec0' }}>
                    {user.userType === 'farmer' ? 'Őstermelő' : user.userType === 'business' ? 'Vállalkozás' : 'Magánszemély'} • 
                    {user.totalSpent.toLocaleString()} Ft költés
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reports' && (
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '15px' }}>Jelentések és statisztikák</div>
              <div style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                borderRadius: '8px', 
                padding: '15px',
                marginBottom: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#e53e3e' }}>92%</div>
                <div style={{ fontSize: '12px', color: '#a0aec0' }}>Megoldási arány</div>
              </div>
              <div style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                borderRadius: '8px', 
                padding: '15px',
                marginBottom: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#e53e3e' }}>3.2 perc</div>
                <div style={{ fontSize: '12px', color: '#a0aec0' }}>Átlag válaszidő</div>
              </div>
              <button style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#e53e3e',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                cursor: 'pointer',
                marginTop: '10px'
              }}>
                📊 Részletes jelentés
              </button>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {currentChatData ? (
            <>
              {/* Chat Header */}
              <div style={{ 
                padding: '20px', 
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(255, 255, 255, 0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: 'linear-gradient(45deg, #4299e1, #3182ce)', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}>
                    {currentChatData.avatar}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>{currentChatData.name}</h3>
                    <p style={{ margin: 0, fontSize: '12px', color: '#a0aec0' }}>{currentChatData.info}</p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                      <span style={{ 
                        fontSize: '10px', 
                        padding: '2px 6px', 
                        borderRadius: '10px',
                        backgroundColor: currentChatData.priority === 'urgent' ? '#e53e3e' : '#4a5568',
                        color: 'white'
                      }}>
                        {currentChatData.priority === 'urgent' ? 'SÜRGŐS' : 'NORMÁL'}
                      </span>
                      <span style={{ 
                        fontSize: '10px', 
                        padding: '2px 6px', 
                        borderRadius: '10px',
                        backgroundColor: '#4a5568',
                        color: 'white'
                      }}>
                        {currentChatData.category === 'payment' ? 'FIZETÉS' : 'REGISZTRÁCIÓ'}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={{ 
                    padding: '8px 12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '6px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}>
                    👤 Profil
                  </button>
                  <button 
                    onClick={() => refundPayment(currentChatData.userId, 500)}
                    style={{ 
                      padding: '8px 12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '6px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    💰 Visszatérítés
                  </button>
                  <button 
                    onClick={() => suspendUser(currentChatData.userId)}
                    style={{ 
                      padding: '8px 12px',
                      backgroundColor: 'rgba(255, 165, 0, 0.3)',
                      border: '1px solid rgba(255, 165, 0, 0.5)',
                      borderRadius: '6px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    ⏸️ Felfüggesztés
                  </button>
                  <button 
                    onClick={() => banUser(currentChatData.userId)}
                    style={{ 
                      padding: '8px 12px',
                      backgroundColor: 'rgba(220, 38, 38, 0.3)',
                      border: '1px solid rgba(220, 38, 38, 0.5)',
                      borderRadius: '6px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    🚫 Kitiltás
                  </button>
                  <button style={{ 
                    padding: '8px 12px',
                    backgroundColor: '#e53e3e',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}>
                    ✕ Bezárás
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                {currentChatData.messages.map((message, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: message.type === 'support' ? 'flex-end' : message.type === 'system' ? 'center' : 'flex-start',
                    marginBottom: '15px'
                  }}>
                    <div style={{
                      maxWidth: '70%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      backgroundColor: message.type === 'user' 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : message.type === 'support'
                        ? '#e53e3e'
                        : 'rgba(255, 193, 7, 0.2)',
                      color: message.type === 'system' ? '#ffc107' : 'white',
                      border: message.type === 'system' ? '1px solid rgba(255, 193, 7, 0.3)' : 'none'
                    }}>
                      {message.text}
                      <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>
                        {message.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div style={{ padding: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  {[
                    'Köszönöm a megkeresést!', 
                    'Egy pillanat, utánanézek...', 
                    'További kérdésed van?', 
                    'Megoldódott a problémád?',
                    'Átirányítom a megfelelő osztályra.',
                    'Kérlek, küldd el a képernyőképet!',
                    'Visszatérítést kezdeményezem.',
                    'Technikai hiba miatt késik a rendszer.'
                  ].map((text) => (
                    <button
                      key={text}
                      onClick={() => insertQuickResponse(text)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '15px',
                        color: '#a0aec0',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      {text}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'white',
                      resize: 'vertical',
                      minHeight: '44px',
                      maxHeight: '120px'
                    }}
                    placeholder="Írd ide a válaszodat..."
                    rows={2}
                  />
                  <button
                    onClick={sendMessage}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: '#e53e3e',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Küldés
                  </button>
                </div>
              </div>
            </>
          ) : selectedUser && currentUser ? (
            <div style={{ padding: '20px' }}>
              <h2 style={{ marginBottom: '20px' }}>Felhasználó részletek: {currentUser.name}</h2>
              <div style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                borderRadius: '12px', 
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <strong>Email:</strong> {currentUser.email}<br/>
                    <strong>Típus:</strong> {currentUser.userType === 'farmer' ? 'Őstermelő' : currentUser.userType === 'business' ? 'Vállalkozás' : 'Magánszemély'}<br/>
                    <strong>Regisztráció:</strong> {new Date(currentUser.registrationDate).toLocaleDateString('hu-HU')}<br/>
                    <strong>Összes költés:</strong> {currentUser.totalSpent.toLocaleString()} Ft
                  </div>
                  <div>
                    <strong>Státusz:</strong> <span style={{
                      color: currentUser.status === 'active' ? '#48bb78' : currentUser.status === 'suspended' ? '#ed8936' : '#e53e3e'
                    }}>
                      {currentUser.status === 'active' ? 'Aktív' : currentUser.status === 'suspended' ? 'Felfüggesztve' : 'Kitiltva'}
                    </span><br/>
                    <strong>Figyelmeztetések:</strong> {currentUser.warnings}<br/>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button 
                    onClick={() => suspendUser(currentUser.id)}
                    style={{ 
                      padding: '10px 20px',
                      backgroundColor: '#ed8936',
                      border: 'none',
                      borderRadius: '6px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Felfüggesztés
                  </button>
                  <button 
                    onClick={() => banUser(currentUser.id)}
                    style={{ 
                      padding: '10px 20px',
                      backgroundColor: '#e53e3e',
                      border: 'none',
                      borderRadius: '6px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Kitiltás
                  </button>
                  <button 
                    onClick={() => refundPayment(currentUser.id, 1000)}
                    style={{ 
                      padding: '10px 20px',
                      backgroundColor: '#48bb78',
                      border: 'none',
                      borderRadius: '6px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Visszatérítés
                  </button>
                  <button style={{ 
                    padding: '10px 20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '6px',
                    color: 'white',
                    cursor: 'pointer'
                  }}>
                    Üzenet küldése
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              textAlign: 'center',
              color: '#a0aec0'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.5 }}>💬</div>
              <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Support Dashboard</h3>
              <p>Válassz egy chatet a bal oldalról, vagy kezelj felhasználókat a megfelelő fülön.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}