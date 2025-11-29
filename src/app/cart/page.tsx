'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { ShoppingCart, MapPin, CreditCard, Loader2, ArrowRight } from 'lucide-react';
import api from '@/lib/api';
import { useSession } from 'next-auth/react';

export default function CartPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { data: session } = useSession();

    const productId = searchParams.get('productId');
    const quantityParam = searchParams.get('quantity');

    const [product, setProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState(Number(quantityParam) || 1);
    const [loading, setLoading] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);

    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');

    useEffect(() => {
        if (productId) {
            setLoading(true);
            api.get(`/api/products/${productId}`)
                .then(res => setProduct(res.data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [productId]);

    useEffect(() => {
        if (session?.user) {
            // Pre-fill address from user profile if available (assuming we stored it in city or similar)
            // For now just leave empty or use city
            if ((session.user as any).city) {
                setDeliveryAddress((session.user as any).city);
            }
        }
    }, [session]);

    const handleCheckout = async () => {
        if (!session?.user) {
            alert('Kérlek jelentkezz be a vásárláshoz!');
            router.push('/login');
            return;
        }

        if (!deliveryAddress.trim()) {
            alert('Kérlek add meg a szállítási címet!');
            return;
        }

        setOrderLoading(true);
        try {
            // 1. Create Order
            const orderRes = await api.post('/api/orders', {
                productId: product._id,
                quantity: quantity,
                deliveryAddress,
                paymentType: paymentMethod
            });

            const orderId = orderRes.data._id;

            // 2. Process Payment
            if (paymentMethod === 'card') {
                const payRes = await api.post('/api/payments/create-order-checkout', {
                    orderId,
                    userId: (session.user as any).id || session.user.email
                });

                if (payRes.data.url) {
                    window.location.href = payRes.data.url;
                }
            } else {
                // Cash on delivery
                alert('Rendelés sikeresen leadva! Fizetés átvételkor.');
                router.push('/profile?tab=orders'); // Redirect to orders tab (need to implement)
            }

        } catch (error: any) {
            console.error('Checkout error:', error);
            alert(error.response?.data?.message || 'Hiba történt a rendelés során.');
        } finally {
            setOrderLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">Betöltés...</div>;

    if (!product) {
        return (
            <div className="min-h-screen bg-[#F5F5F0] font-sans">
                <Header />
                <div className="text-center py-20">
                    <ShoppingCart size={48} className="mx-auto mb-4 text-gray-300" />
                    <h2 className="text-xl font-bold text-gray-600">A kosarad üres</h2>
                    <p className="text-gray-500 mb-6">Válassz terméket a kínálatból!</p>
                    <button onClick={() => router.push('/feed')} className="text-[#1B4332] font-bold hover:underline">
                        Vissza a termékekhez
                    </button>
                </div>
            </div>
        );
    }

    const totalPrice = product.price * quantity;

    return (
        <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">
            <Header />

            <main className="max-w-3xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-[#1F2937] mb-8 flex items-center gap-3">
                    <ShoppingCart className="text-[#1B4332]" /> Pénztár
                </h1>

                <div className="grid gap-6">
                    {/* 1. Termék áttekintés */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4">Rendelés összegzése</h2>
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />}
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-bold text-lg">{product.name}</h3>
                                <p className="text-gray-500">{product.price} Ft / {product.unit}</p>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-xl">{totalPrice} Ft</div>
                                <div className="text-sm text-gray-500">{quantity} db</div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Szállítási adatok */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <MapPin size={20} /> Szállítási adatok
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Szállítási cím</label>
                                <input
                                    type="text"
                                    value={deliveryAddress}
                                    onChange={(e) => setDeliveryAddress(e.target.value)}
                                    placeholder="Város, Utca, Házszám"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 3. Fizetési mód */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <CreditCard size={20} /> Fizetési mód
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                onClick={() => setPaymentMethod('card')}
                                className={`p-4 rounded-xl border-2 text-left transition ${paymentMethod === 'card' ? 'border-[#1B4332] bg-green-50' : 'border-gray-100 hover:border-gray-300'}`}
                            >
                                <div className="font-bold flex items-center gap-2 mb-1">
                                    <CreditCard size={18} /> Bankkártya
                                </div>
                                <p className="text-sm text-gray-500">Biztonságos fizetés Stripe-on keresztül</p>
                            </button>

                            <button
                                onClick={() => setPaymentMethod('cash')}
                                className={`p-4 rounded-xl border-2 text-left transition ${paymentMethod === 'cash' ? 'border-[#1B4332] bg-green-50' : 'border-gray-100 hover:border-gray-300'}`}
                            >
                                <div className="font-bold flex items-center gap-2 mb-1">
                                    Utánvét
                                </div>
                                <p className="text-sm text-gray-500">Fizetés átvételkor a futárnál</p>
                            </button>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                        onClick={handleCheckout}
                        disabled={orderLoading}
                        className="w-full bg-[#1B4332] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#2D6A4F] transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {orderLoading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
                        Rendelés leadása ({totalPrice} Ft)
                    </button>

                </div>
            </main>
        </div>
    );
}
