'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { MapPin, User, ArrowLeft, ShoppingCart, MessageCircle, Leaf, Package, Truck } from 'lucide-react';
import api from '@/lib/api';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Try specific endpoint first
        try {
          const specificRes = await api.get(`/api/products/${params.id}`);
          setProduct(specificRes.data);
        } catch (e) {
          // Fallback if specific endpoint not implemented in backend yet
          const allRes = await api.get('/api/products');
          const found = allRes.data.find((p: any) => p._id === params.id);
          setProduct(found);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handlePurchase = async () => {
    if (!product || !product.stock || product.stock <= 0) return;

    try {
      // In a real app, we would get the user ID from the session
      // For now, we'll send a request and let the backend handle validation or use a mock user ID if needed
      // Ideally, we should use useSession() here.

      // Assuming the backend endpoint /api/orders exists as created
      const res = await api.post('/api/orders', {
        productId: product._id,
        buyerId: product.sellerEmail, // MOCK: Using seller as buyer for demo if no session. Ideally: session.user.id
        quantity: 1
      });

      if (res.status === 201) {
        alert('Sikeres megrendelés!');
        // Update local stock
        setProduct({ ...product, stock: product.stock - 1 });
      }
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Hiba történt a megrendelés során.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center text-[#1B4332] font-bold">
        Betöltés...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] font-sans">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">A termék nem található.</h1>
          <Link href="/feed" className="text-[#1B4332] font-bold hover:underline">
            Vissza a hírfolyamra
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">

        <Link href="/feed" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1B4332] font-bold mb-6 transition">
          <ArrowLeft size={20} /> Vissza a hírfolyamra
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT: IMAGE */}
            <div className="h-[400px] lg:h-auto bg-[#F0F4F1] relative flex items-center justify-center">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <Leaf className="text-[#1B4332]/20 w-32 h-32" />
              )}

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.isShippable && (
                  <div className="bg-blue-100/90 backdrop-blur px-4 py-2 rounded-xl text-sm font-bold text-blue-800 shadow-sm flex items-center gap-2">
                    <Package size={16} /> Postázható
                  </div>
                )}
                <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-sm font-bold text-[#1B4332] shadow-sm">
                  {product.category}
                </div>
              </div>
            </div>

            {/* RIGHT: DETAILS */}
            <div className="p-8 lg:p-12 flex flex-col">

              <div className="mb-auto">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-3xl lg:text-4xl font-bold text-[#1F2937]">{product.name}</h1>
                  <div className="text-2xl lg:text-3xl font-bold text-[#1B4332]">
                    {product.price} Ft <span className="text-lg text-gray-500 font-normal">/ {product.unit}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{product.sellerName || 'Termelő'}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin size={14} /> {product.location || 'Helyszín'}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#1F2937] mb-3">Leírás</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {product.description}
                </p>

                <div className="bg-gray-50 rounded-xl p-4 mb-8">
                  <h4 className="font-bold text-sm text-gray-700 mb-2 flex items-center gap-2">
                    <Truck size={16} /> Átvételi lehetőségek
                  </h4>
                  <p className="text-sm text-gray-600">
                    Egyeztetés az eladóval üzenetben.
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center justify-between">
                  <span className={`font-bold ${product.stock > 0 ? 'text-[#1B4332]' : 'text-red-600'}`}>
                    {product.stock > 0 ? `Készleten: ${product.stock} db` : 'ELFOGYOTT'}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handlePurchase}
                    disabled={!product.stock || product.stock <= 0}
                    className={`flex-1 py-4 rounded-xl font-bold text-lg transition shadow-md flex items-center justify-center gap-2 ${product.stock > 0
                        ? 'bg-[#1B4332] text-white hover:bg-[#2D6A4F]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    <ShoppingCart size={20} />
                    {product.stock > 0 ? 'Megrendelem' : 'ELFOGYOTT'}
                  </button>
                  <button
                    onClick={() => console.log('Üzenet:', product)}
                    className="flex-1 bg-white text-[#1F2937] border-2 border-gray-200 py-4 rounded-xl font-bold text-lg hover:border-[#1B4332] hover:text-[#1B4332] transition flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} /> Üzenet az eladónak
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}