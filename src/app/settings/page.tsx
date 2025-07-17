'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [radius, setRadius] = useState(10);
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Értesítési beállítások</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Körzet (km-ben)</label>
        <input
          type="range"
          min={1}
          max={30}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-gray-600 mt-1">{radius} km-es körzetben érdekelnek ajánlatok</div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Érdeklődési körök</label>
        <div className="flex flex-wrap gap-2">
          {['paprika', 'tojás', 'méz', 'lekvár', 'tea', 'kozmetikum'].map((item) => (
            <button
              key={item}
              onClick={() => toggleInterest(item)}
              className={`px-3 py-1 rounded-full border ${
                interests.includes(item)
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-400">Ezek az adatok később push értesítésekhez lesznek használva.</div>
    </main>
  );
}
