'use client';

import { useState, useEffect } from 'react';

export default function SupportPage() {
  const [chatStartTime, setChatStartTime] = useState<number | null>(null);
  const [waitingTimer, setWaitingTimer] = useState<NodeJS.Timeout | null>(null);
  const [messageCount, setMessageCount] = useState(0);
  const [messages, setMessages] = useState([
    { type: 'system', text: 'Üdvözlünk a SzomszédKosár ügyfélszolgálatánál! Kérlek, írd le a problémádat, és munkatársaink hamarosan válaszolnak.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showWaitingMessage, setShowWaitingMessage] = useState(false);
  const [chatDisabled, setChatDisabled] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Hogyan regisztrálhatok őstermelőként?",
      answer: "Regisztráció után a profilodban válaszd az \"Őstermelő\" opciót, és töltsd fel a szükséges dokumentumokat. Ezután korlátlanul használhatod a platform összes funkcióját."
    },
    {
      question: "Mennyibe kerül a push értesítés?",
      answer: "Egy push értesítés 500 Ft-ba kerül, ami célzottan a megadott körzetben (10-30 km) kerül kiküldésre. SimplePay rendszeren keresztül fizethetsz."
    },
    {
      question: "Mit jelent az \"alkalmi eladó\" korlátozás?",
      answer: "Alkalmi eladók havonta maximum 5 hirdetést és 3 push értesítést adhatnak fel. Ez a NAV szabályok betartása végett van így."
    },
    {
      question: "Hogyan működik a fizetés?",
      answer: "A platform ingyenes, csak a push értesítésekért és hírfolyam kiemelésekért kell fizetni. SimplePay rendszeren keresztül bankkártyával vagy átutalással fizethetsz."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const startWaitingTimer = () => {
    if (waitingTimer) return;
    
    const timer = setTimeout(() => {
      setShowWaitingMessage(true);
      setMessages(prev => [...prev, {
        type: 'system',
        text: 'Minden munkatársunk leterhelt. Kérlek, küldj emailt a support@szomszedkosar.hu címre!'
      }]);
      setChatDisabled(true);
    }, 5 * 60 * 1000); // 5 minutes
    
    setWaitingTimer(timer);
  };

  const sendMessage = () => {
    if (!inputValue.trim() || chatDisabled) return;
    
    setMessages(prev => [...prev, { type: 'user', text: inputValue }]);
    setInputValue('');
    setMessageCount(prev => prev + 1);
    
    // Start timer after first message
    if (messageCount === 0) {
      setChatStartTime(Date.now());
      startWaitingTimer();
      
      // Simulate thinking
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'system',
          text: 'Köszönjük az üzeneted! Munkatársaink hamarosan válaszolnak...'
        }]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    return () => {
      if (waitingTimer) {
        clearTimeout(waitingTimer);
      }
    };
  }, [waitingTimer]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px' }}>
      {/* Simple Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '24px', marginRight: '10px' }}>🛒</div>
        <div style={{ fontSize: '20px', fontWeight: 'bold', marginRight: 'auto' }}>SzomszédKosár</div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#" style={{ color: '#007bff', textDecoration: 'underline' }}>🔍 Böngészés</a>
          <a href="#" style={{ color: '#007bff', textDecoration: 'underline' }}>📄 Hírfolyam</a>
          <a href="#" style={{ color: '#007bff', textDecoration: 'underline' }}>Bejelentkezés</a>
          <a href="#" style={{ color: '#007bff', textDecoration: 'underline' }}>Regisztráció</a>
        </div>
      </div>

      {/* Page Title */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '10px', color: '#333' }}>Ügyfélszolgálat</h1>
        <p style={{ color: '#666' }}>Segítünk minden kérdésedben!</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Chat Section */}
        <div style={{ border: '1px solid #ddd', padding: '20px', backgroundColor: 'white' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '5px' }}>Élő Chat</h2>
            <p style={{ fontSize: '14px', color: '#666' }}>Beszélj velünk közvetlenül</p>
          </div>

          {showWaitingMessage && (
            <div style={{ 
              backgroundColor: '#fff3cd', 
              border: '1px solid #ffeaa7', 
              padding: '10px', 
              marginBottom: '15px', 
              color: '#856404',
              textAlign: 'center'
            }}>
              ⏰ Minden munkatársunk leterhelt. Kérlek, küldj emailt a support@szomszedkosar.hu címre, és hamarosan válaszolunk!
            </div>
          )}

          <div style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            marginBottom: '15px', 
            height: '300px',
            backgroundColor: '#f9f9f9'
          }}>
            <div style={{ height: '250px', overflowY: 'auto', marginBottom: '10px' }}>
              {messages.map((message, index) => (
                <div key={index} style={{
                  padding: '8px 12px',
                  marginBottom: '10px',
                  borderRadius: '5px',
                  maxWidth: '80%',
                  backgroundColor: message.type === 'user' 
                    ? '#007bff' 
                    : message.type === 'system'
                    ? '#fff3cd'
                    : '#e9ecef',
                  color: message.type === 'user' ? 'white' : '#333',
                  marginLeft: message.type === 'user' ? 'auto' : '0',
                  marginRight: message.type === 'user' ? '0' : 'auto'
                }}>
                  {message.text}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={chatDisabled}
                style={{
                  flex: 1,
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '3px',
                  backgroundColor: chatDisabled ? '#f5f5f5' : 'white'
                }}
                placeholder={chatDisabled ? "Chat lezárva - használd az email támogatást" : "Írd ide az üzeneted..."}
                maxLength={500}
              />
              <button
                onClick={sendMessage}
                disabled={chatDisabled}
                style={{
                  padding: '8px 15px',
                  backgroundColor: chatDisabled ? '#6c757d' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: chatDisabled ? 'not-allowed' : 'pointer'
                }}
              >
                Küldés
              </button>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Kapcsolat</h2>
          
          <div style={{ marginBottom: '30px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              marginBottom: '15px', 
              padding: '15px',
              border: '1px solid #ddd',
              backgroundColor: 'white'
            }}>
              <div style={{ fontSize: '20px' }}>📧</div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px' }}>Email Support</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>support@szomszedkosar.hu</p>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              marginBottom: '15px', 
              padding: '15px',
              border: '1px solid #ddd',
              backgroundColor: 'white'
            }}>
              <div style={{ fontSize: '20px' }}>⚡</div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px' }}>Válaszidő</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>24 órán belül válaszolunk</p>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              marginBottom: '15px', 
              padding: '15px',
              border: '1px solid #ddd',
              backgroundColor: 'white'
            }}>
              <div style={{ fontSize: '20px' }}>🕒</div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px' }}>Ügyfélfogadás</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Hétfő-Péntek: 9:00-17:00</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Gyakori Kérdések</h3>
            
            <div>
              {faqItems.map((item, index) => (
                <div key={index} style={{ border: '1px solid #ddd', marginBottom: '5px', backgroundColor: 'white' }}>
                  <div 
                    style={{
                      padding: '15px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontWeight: '500'
                    }}
                    onClick={() => toggleFaq(index)}
                  >
                    {item.question}
                    <span style={{ fontSize: '18px' }}>{openFaq === index ? '-' : '+'}</span>
                  </div>
                  {openFaq === index && (
                    <div style={{ padding: '0 15px 15px', fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}