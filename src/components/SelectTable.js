'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SelectTable() {
  const [selectedUmbrella, setSelectedUmbrella] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const router = useRouter();
  const barId = 'micamar'; // Hardcoded bar ID

  const handleOrderClick = () => {
    const selectedNumber = selectedUmbrella || selectedTable;
    if (selectedNumber) {
      router.push(`${window.location.origin}/bar/${barId}/${selectedNumber}`);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="umbrellaSelect" className="block text-white mb-2">Numero Ombrellone:</label>
        <select
          id="umbrellaSelect"
          value={selectedUmbrella}
          onChange={(e) => {
            setSelectedUmbrella(e.target.value);
            setSelectedTable(''); // Clear table selection if umbrella is selected
          }}
          className="w-full px-3 py-2 rounded bg-white bg-opacity-50 text-purple-900"
        >
          <option value="">Seleziona ombrellone</option>
          {Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
            <option key={number} value={number}>{`${number}`}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="tableSelect" className="block text-white mb-2">Numero Tavolo:</label>
        <select
          id="tableSelect"
          value={selectedTable}
          onChange={(e) => {
            setSelectedTable(e.target.value);
            setSelectedUmbrella(''); // Clear umbrella selection if table is selected
          }}
          className="w-full px-3 py-2 rounded bg-white bg-opacity-50 text-purple-900"
        >
          <option value="">Seleziona tavolo</option>
          {Array.from({ length: 20 }, (_, i) => i + 1001).map((number) => (
            <option key={number} value={number}>{`${number}`}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleOrderClick}
        className="w-full bg-yellow-400 text-purple-900 py-2 rounded-full hover:bg-yellow-300 transition duration-300"
        disabled={!selectedUmbrella && !selectedTable}
      >
        Ordina
      </button>
    </div>
  );
}