'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { MapPin, User, ArrowLeft, ShoppingCart, MessageCircle, Leaf, Package, Truck, Minus, Plus, XIcon, Loader2, Check } from 'lucide-react';
import api from '@/lib/api';
import { useSession } from 'next-auth/react';

export default function ProductDetailPage() {
  const { data: session } = useSession();
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [purchasing, setPurchasing] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery' | 'shipping'>('pickup');
  const [sellerLogistics, setSellerLogistics] = useState<any>(null);

  // Check if user is a chef
  const isChef = (session?.user as any)?.role === 'chef';
  // Check if wholesale is available and user is eligible
  const isWholesaleEligible = product?.isWholesaleAvailable && isChef;
  // Calculate current price based on quantity and eligibility
  const itemPrice = isWholesaleEligible && quantity >= product.minWholesaleQuantity
    ? product.wholesalePrice
    : product?.price;

  const deliveryCost = deliveryMethod === 'delivery' ? (sellerLogistics?.deliveryCost || 0) : 0;
  const totalPrice = (itemPrice * quantity) + deliveryCost;

  const fetchProduct = async () => {
    try {
      // Try specific endpoint first
      let productData;
      try {
        const specificRes = await api.get(`/api/products/${params.id}`);
        productData = specificRes.data;
      } catch (e) {
        // Fallback
        const allRes = await api.get('/api/products');
        productData = allRes.data.find((p: any) => p._id === params.id);
      }
      setProduct(productData);

      // Fetch seller logistics if we have seller email
      if (productData?.sellerEmail) {
        try {
          const usersRes = await api.get('/api/users', { params: { role: 'producer' } });
          const seller = usersRes.data.find((u: any) => u.email === productData.sellerEmail);
          if (seller && seller.logistics) {
            setSellerLogistics(seller.logistics);
            // Set default method
            if (seller.logistics.hasLocalPickup) setDeliveryMethod('pickup');
            else if (seller.logistics.hasHomeDelivery) setDeliveryMethod('delivery');
            else if (seller.logistics.hasShipping) setDeliveryMethod('shipping');
          }
        } catch (err) {
          console.error('Failed to fetch seller logistics', err);
        }
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

  const handlePurchaseClick = () => {
    if (!product || !product.stock || product.stock <= 0) return;
    if (!session?.user) {
      alert('A vásárláshoz be kell jelentkezned!');
      return;
    }
    setShowDeliveryModal(true);
  };

  const confirmPurchase = async () => {
    setPurchasing(true);
    try {
      const res = await api.post('/api/orders', {
        productId: product._id,
        buyerId: (session?.user as any).id || session?.user?.email,
        quantity: quantity,
        price: totalPrice, // Total including delivery
        itemPrice: itemPrice,
        deliveryMethod: deliveryMethod,
        deliveryCost: deliveryCost,
        isWholesale: isWholesaleEligible && quantity >= product.minWholesaleQuantity
      });

      if (res.status === 201) {
        alert('Sikeres rendelés!');
        setShowDeliveryModal(false);
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
                  <div className="flex flex-col items-end">
                    <div className="text-2xl lg:text-3xl font-bold text-[#1B4332]">
                      {itemPrice} Ft <span className="text-lg text-gray-500 font-normal">/ {product.unit}</span>
                    </div>
                    {isWholesaleEligible && (
                      <div className="text-sm text-green-600 font-bold bg-green-50 px-2 py-1 rounded-lg mt-1">
                        Nagyker ár elérhető {product.minWholesaleQuantity} {product.unit} felett! ({product.wholesalePrice} Ft)
                      </div>
                    )}
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
                    <Truck size={16} /> Szállítási információk
                  </h4>
                  {sellerLogistics ? (
                    <div className="text-sm text-gray-600 space-y-1">
                      {sellerLogistics.hasLocalPickup && <div>• Személyes átvétel: <span className="font-bold">{sellerLogistics.pickupAddress || 'Cím egyeztetése üzenetben'}</span></div>}
                      {sellerLogistics.hasHomeDelivery && <div>• Házhozszállítás: <span className="font-bold">{sellerLogistics.deliveryRadius} km-ig ({sellerLogistics.deliveryCost} Ft)</span></div>}
                      {sellerLogistics.hasShipping && product.isShippable && <div>• Postai csomagküldés elérhető</div>}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">
                      Egyeztetés az eladóval üzenetben.
                    </p>
                  )}
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
                    onClick={handlePurchaseClick}
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
                    {!isOutOfStock
                      ? (isWholesaleEligible && quantity >= product.minWholesaleQuantity ? 'B2B Előrendelés Leadása' : 'Megrendelem')
                      : 'ELFOGYOTT'}
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

        {/* DELIVERY MODAL */}
        {showDeliveryModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#1F2937]">Szállítási mód kiválasztása</h2>
                <button onClick={() => setShowDeliveryModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XIcon size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* 1. Pickup */}
                {sellerLogistics?.hasLocalPickup && (
                  <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${deliveryMethod === 'pickup' ? 'border-[#1B4332] bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'pickup'}
                      onChange={() => setDeliveryMethod('pickup')}
                      className="mt-1 w-4 h-4 text-[#1B4332] focus:ring-[#1B4332]"
                    />
                    <div>
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        <MapPin size={16} /> Személyes átvétel
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {sellerLogistics.pickupAddress || 'Cím egyeztetése üzenetben'}
                      </div>
                      <div className="text-[#1B4332] font-bold text-sm mt-1">Ingyenes</div>
                    </div>
                  </label>
                )}

                {/* 2. Home Delivery */}
                {sellerLogistics?.hasHomeDelivery && (
                  <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${deliveryMethod === 'delivery' ? 'border-[#1B4332] bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'delivery'}
                      onChange={() => setDeliveryMethod('delivery')}
                      className="mt-1 w-4 h-4 text-[#1B4332] focus:ring-[#1B4332]"
                    />
                    <div>
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        <Truck size={16} /> Házhozszállítás
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {sellerLogistics.deliveryRadius} km-es körzetben
                      </div>
                      <div className="text-[#1B4332] font-bold text-sm mt-1">+ {sellerLogistics.deliveryCost} Ft</div>
                    </div>
                  </label>
                )}

                {/* 3. Shipping */}
                {sellerLogistics?.hasShipping && product.isShippable && (
                  <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${deliveryMethod === 'shipping' ? 'border-[#1B4332] bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'shipping'}
                      onChange={() => setDeliveryMethod('shipping')}
                      className="mt-1 w-4 h-4 text-[#1B4332] focus:ring-[#1B4332]"
                    />
                    <div>
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        <Package size={16} /> Postai csomagküldés
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Foxpost, Packeta, MPL
                      </div>
                      <div className="text-gray-500 text-xs mt-1">Díj egyeztetése utólag</div>
                    </div>
                  </label>
                )}

                {/* Fallback if no logistics set */}
                {!sellerLogistics && (
                  <div className="text-center text-gray-500 py-4">
                    Az eladó nem állított be részletes szállítási módokat.
                    <br />
                    Kérjük egyeztess vele üzenetben!
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Termék ára ({quantity} db):</span>
                  <span className="font-bold">{itemPrice * quantity} Ft</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Szállítás:</span>
                  <span className="font-bold">{deliveryCost > 0 ? `+ ${deliveryCost} Ft` : 'Ingyenes / Egyeztetés'}</span>
                </div>
                <div className="border-t border-gray-200 my-2 pt-2 flex justify-between text-lg font-bold text-[#1B4332]">
                  <span>Összesen:</span>
                  <span>{totalPrice} Ft</span>
                </div>
              </div>

              <button
                onClick={confirmPurchase}
                disabled={purchasing}
                className="w-full bg-[#1B4332] text-white py-4 rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-md flex items-center justify-center gap-2"
              >
                {purchasing ? <Loader2 className="animate-spin" /> : <Check size={20} />}
                Rendelés véglegesítése
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}