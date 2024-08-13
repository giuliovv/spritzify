'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export default function QRCodeGenerator() {
  const [bars, setBars] = useState([]);
  const [selectedBar, setSelectedBar] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchBars = async () => {
      const barsCollection = collection(db, 'bars');
      const barSnapshot = await getDocs(barsCollection);
      const barList = barSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBars(barList);
    };

    fetchBars();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBar && tableNumber) {
      router.push(`/bar/${selectedBar}?tableNumber=${tableNumber}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="barSelect" className="block text-white mb-2">Select Bar:</label>
        <select
          id="barSelect"
          value={selectedBar}
          onChange={(e) => setSelectedBar(e.target.value)}
          className="w-full px-3 py-2 rounded bg-white bg-opacity-50 text-purple-900"
          required
        >
          <option value="">Select a bar</option>
          {bars.map((bar) => (
            <option key={bar.id} value={bar.id}>{bar.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="tableNumber" className="block text-white mb-2">Table Number:</label>
        <input
          type="number"
          id="tableNumber"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="w-full px-3 py-2 rounded bg-white bg-opacity-50 text-purple-900"
          required
        />
      </div>
      <button type="submit" className="w-full bg-yellow-400 text-purple-900 py-2 rounded-full hover:bg-yellow-300 transition duration-300">
        Generate QR Code URL
      </button>
    </form>
  );
}