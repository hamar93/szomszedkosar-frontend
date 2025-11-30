'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import dynamic from 'next/dynamic';
import api from '@/lib/api';
import { Loader2 } from 'lucide-react';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/Map'), {
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-2xl"><Loader2 className="animate-spin text-[#1B4332]" /></div>
});

interface Producer {
    _id: string;
    name: string;
    city?: string;
    location?: {
        latitude: number;
        longitude: number;
    };
}

export default function MapPage() {
    const [producers, setProducers] = useState<Producer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducers = async () => {
            try {
                const res = await api.get('/api/users', { params: { role: 'producer' } });
                // Filter producers who have location data
                // For demo purposes, if no location, we might want to mock it or filter them out
                // Here we filter to only those with location
                const producersWithLocation = res.data.filter((p: any) => p.location && p.location.latitude && p.location.longitude);

                // MOCK DATA FOR DEMO if no real location data exists yet
                if (producersWithLocation.length === 0 && res.data.length > 0) {
                    const mocked = res.data.map((p: any, index: number) => ({
                        ...p,
                        location: {
                            latitude: 47.4979 + (Math.random() - 0.5) * 0.1,
                            longitude: 19.0402 + (Math.random() - 0.5) * 0.1
                        }
                    }));
                    setProducers(mocked);
                } else {
                    setProducers(producersWithLocation);
                }
            } catch (error) {
                console.error("Error fetching producers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducers();
    }, []);

    return (
        <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937] flex flex-col">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full flex flex-col">
                <h1 className="text-3xl font-bold text-[#1B4332] mb-6">Termelők Térképe</h1>

                <div className="flex-grow bg-white p-4 rounded-3xl shadow-sm border border-gray-100 h-[600px] relative z-0">
                    <Map producers={producers} />
                </div>
            </main>
        </div>
    );
}
