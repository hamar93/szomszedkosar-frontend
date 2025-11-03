'use client';

import { useState } from 'react';
import { handleLocationInput } from '../lib/location';

const LocationPrompt = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSearchClick = async () => {
    await handleLocationInput(inputValue);
    // You might want to add feedback to the user here, e.g., a confirmation message
  };

  return (
    <div className="location-prompt-container" style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h1>🔎 Találj friss termékeket a közeledben!</h1>
      <p>
        Kérlek, add meg a címed, irányítószámod, vagy engedélyezd a helymeghatározást,
        hogy a 15 km-es körzeted termékeit mutathassuk.
      </p>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Cím vagy irányítószám..."
          style={{ padding: '10px', marginRight: '10px', width: '300px' }}
        />
        <button onClick={handleSearchClick} style={{ padding: '10px 20px' }}>
          Keresés
        </button>
      </div>
    </div>
  );
};

export default LocationPrompt;
