'use client';

import { useState, useEffect } from 'react';
import Newsfeed from './Newsfeed';
import LocationPrompt from '@/components/LocationPrompt';

// 1. UserLocation Interface
interface UserLocation {
  latitude: number;
  longitude: number;
  city: string;
  zipCode: string;
}

// 2. FeedPage Functional Component
export default function FeedPage() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  useEffect(() => {
    const storedLocation = localStorage.getItem('szomszedkosar_user_location');
    if (storedLocation) {
      setUserLocation(JSON.parse(storedLocation));
    }
  }, []);

  // 3. Conditional Rendering Logic
  if (!userLocation) {
    return (
      <div className="min-h-screen bg-[#F5F5F0]">
        <Header />
        <LocationPrompt />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Header />
      <Newsfeed />
    </div>
  );
}
