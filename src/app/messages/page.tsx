'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  MessageCircle,
  User,
  Clock,
  ArrowRight,
  Search,
  ArrowLeft,
  Send,
  Loader2
} from 'lucide-react';
import api from '@/lib/api';
import Header from '@/components/Header';

interface Message {
  _id: string;
  sender: string;
  recipient: string;
  content: string;
  product?: string;
  createdAt: string;
  isRead: boolean;
}

interface Conversation {
  partnerId: string;
  partnerName: string; // In a real app, we'd fetch user details. For now, use ID or email.
  lastMessage: string;
  lastMessageDate: string;
  unreadCount: number;
}

export default function MessagesPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial recipient from URL (e.g. from product page)
  const initialRecipient = searchParams.get('recipient');
  const initialProduct = searchParams.get('product');

  useEffect(() => {
    if (session?.user) {
      fetchMessages();
    }
  }, [session]);

  useEffect(() => {
    if (initialRecipient) {
      setSelectedPartnerId(initialRecipient);
    }
  }, [initialRecipient]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedPartnerId]);

  const fetchMessages = async () => {
    try {
      const userId = (session?.user as any).id || session?.user?.email;
      if (!userId) return;

      const res = await api.get(`/api/messages/${userId}`);
      const allMessages: Message[] = res.data;
      setMessages(allMessages);
      processConversations(allMessages, userId);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const processConversations = (allMessages: Message[], myId: string) => {
    const convMap = new Map<string, Conversation>();

    allMessages.forEach(msg => {
      const isMe = msg.sender === myId;
      const partnerId = isMe ? msg.recipient : msg.sender;

      if (!convMap.has(partnerId)) {
        convMap.set(partnerId, {
          partnerId,
          partnerName: partnerId, // Ideally fetch name
          lastMessage: msg.content,
          lastMessageDate: msg.createdAt,
          unreadCount: 0
        });
      }

      // Update last message if this one is newer (assuming sorted by date desc from API, but let's be safe)
      // actually API sorts by newest first, so the first one we encounter for a partner is the newest
    });

    setConversations(Array.from(convMap.values()));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newMessage.trim() || !selectedPartnerId || !session?.user) return;

    setSending(true);
    try {
      const myId = (session.user as any).id || session.user.email;

      const payload = {
        senderId: myId,
        recipientId: selectedPartnerId,
        content: newMessage,
        productId: initialProduct || undefined
      };

      const res = await api.post('/api/messages/send', payload);

      // Add to local list immediately
      const savedMsg = res.data;
      setMessages(prev => [savedMsg, ...prev]); // Add to top or resort? API returns sorted desc. 
      // Actually for the chat view we want ascending order usually, but let's stick to one source of truth.
      // Let's just re-fetch or manually append.

      // Re-fetch to be safe and update conversations list
      await fetchMessages();
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Nem sikerült elküldeni az üzenetet.');
    } finally {
      setSending(false);
    }
  };

  // Filter messages for the selected conversation
  const currentChatMessages = selectedPartnerId
    ? messages.filter(m =>
      (m.sender === selectedPartnerId && m.recipient === ((session?.user as any).id || session?.user?.email)) ||
      (m.recipient === selectedPartnerId && m.sender === ((session?.user as any).id || session?.user?.email))
    ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) // Oldest first for chat view
    : [];

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0] text-[#1B4332]">Betöltés...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937] flex flex-col">
      <Header />

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-6 flex gap-6 h-[calc(100vh-80px)]">

        {/* LEFT: Conversation List */}
        <div className={`w-full md:w-1/3 bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col ${selectedPartnerId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-bold text-lg text-[#1F2937] flex items-center gap-2">
              <MessageCircle size={20} className="text-[#1B4332]" /> Üzenetek
            </h2>
          </div>

          <div className="overflow-y-auto flex-1 p-2 space-y-2">
            {conversations.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <p>Nincsenek még üzeneteid.</p>
              </div>
            ) : (
              conversations.map(conv => (
                <button
                  key={conv.partnerId}
                  onClick={() => setSelectedPartnerId(conv.partnerId)}
                  className={`w-full text-left p-4 rounded-2xl transition flex items-center gap-3 ${selectedPartnerId === conv.partnerId ? 'bg-[#1B4332] text-white shadow-md' : 'hover:bg-gray-50 text-gray-700'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${selectedPartnerId === conv.partnerId ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <User size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold truncate">{conv.partnerName}</h3>
                      <span className={`text-xs ${selectedPartnerId === conv.partnerId ? 'text-white/70' : 'text-gray-400'}`}>
                        {new Date(conv.lastMessageDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${selectedPartnerId === conv.partnerId ? 'text-white/80' : 'text-gray-500'}`}>
                      {conv.lastMessage}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* RIGHT: Chat Area */}
        <div className={`w-full md:w-2/3 bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col ${!selectedPartnerId ? 'hidden md:flex' : 'flex'}`}>
          {selectedPartnerId ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50">
                <button onClick={() => setSelectedPartnerId(null)} className="md:hidden p-2 hover:bg-gray-200 rounded-full">
                  <ArrowLeft size={20} />
                </button>
                <div className="w-10 h-10 bg-[#1B4332] rounded-full flex items-center justify-center text-white">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1F2937]">{selectedPartnerId}</h3>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F9FAFB]">
                {currentChatMessages.map((msg) => {
                  const isMe = msg.sender === ((session?.user as any).id || session?.user?.email);
                  return (
                    <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${isMe ? 'bg-[#1B4332] text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'}`}>
                        <p className="text-sm">{msg.content}</p>
                        <div className={`text-[10px] mt-1 text-right ${isMe ? 'text-white/70' : 'text-gray-400'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Írj egy üzenetet..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition bg-gray-50 focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={sending || !newMessage.trim()}
                  className="bg-[#1B4332] text-white p-3 rounded-xl hover:bg-[#2D6A4F] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MessageCircle size={40} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">Válassz egy beszélgetést</h3>
              <p>vagy keress egy termelőt a hírfolyamban!</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
