'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { MapPin, User, ArrowLeft, ShoppingCart, MessageCircle, Leaf, Package, Truck, Minus, Plus } from 'lucide-react';
import api from '@/lib/api';
import { useSession } from 'next-auth/react';

export default function ProductDetailPage() {
  const { data: session } = useSession();
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [purchasing, setPurchasing] = useState(false);

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

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handlePurchase = async () => {
    if (!product || !product.stock || product.stock <= 0) return;

    if (!session?.user) {
      alert('A vásárláshoz be kell jelentkezned!');
      return;
    }

    setPurchasing(true);
    try {
      const res = await api.post('/api/orders', {
        productId: product._id,
        buyerId: (session.user as any).id || session.user.email, // Use real session ID
        quantity: quantity
      });

      if (res.status === 201) {
        alert('Sikeres rendelés!');
        // Refresh product to get new stock
        await fetchProduct();
        setQuantity(1);
      }
    } catch (error: any) {
      console.error('Purchase failed:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Ismeretlen hiba történt.';
      alert(`Megrendelési hiba: ${errorMsg}`);
    } finally {
      setPurchasing(false);
    }
  };

  const incrementQty = () => {
    if (product && quantity < product.stock) {
      setQuantity(q => q + 1);
    }
  };

  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
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

  const isOutOfStock = !product.stock || product.stock <= 0;

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
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
                    {product.sellerAvatar ? <img src={product.sellerAvatar} className="w-full h-full object-cover" /> : <User size={24} />}
                  </div>
                  <div>
                    <Link href={`/shop/${product.sellerEmail || product.sellerName}`} className="font-bold text-gray-900 hover:text-[#1B4332] hover:underline transition">
                      {product.sellerName || 'Termelő'}
                    </Link>
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
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center justify-between">
                  <span className={`font-bold text-lg ${!isOutOfStock ? 'text-[#1B4332]' : 'text-red-600'}`}>
                    {!isOutOfStock ? `Készleten: ${product.stock} ${product.unit}` : 'ELFOGYOTT'}
                  </span>
                </div>

                {!isOutOfStock && (
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-gray-700">Mennyiség:</span>
                    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                      <button
                        onClick={decrementQty}
                        className="p-3 hover:bg-gray-100 transition text-gray-600"
                        disabled={quantity <= 1}
                      >
                        <Minus size={18} />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val) && val >= 1 && val <= product.stock) {
                            setQuantity(val);
                          }
                        }}
                        className="w-16 text-center font-bold text-[#1F2937] outline-none"
                        min="1"
                        max={product.stock}
                      />
                      <button
                        onClick={incrementQty}
                        className="p-3 hover:bg-gray-100 transition text-gray-600"
                        disabled={quantity >= product.stock}
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handlePurchase}
                    disabled={isOutOfStock || purchasing}
                    className={`flex-1 py-4 rounded-xl font-bold text-lg transition shadow-md flex items-center justify-center gap-2 ${!isOutOfStock
                      ? 'bg-[#1B4332] text-white hover:bg-[#2D6A4F]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    {purchasing ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <ShoppingCart size={20} />
                    )}
                    {!isOutOfStock ? 'Megrendelem' : 'ELFOGYOTT'}
                  </button>
                  <Link
                    href={`/messages?recipient=${product.sellerEmail || ''}&product=${product._id}`}
                    className="flex-1 bg-white text-[#1F2937] border-2 border-gray-200 py-4 rounded-xl font-bold text-lg hover:border-[#1B4332] hover:text-[#1B4332] transition flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} /> Üzenet az eladónak
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}