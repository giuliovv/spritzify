'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import bars from '../constants';
import QRCode from 'qrcode.react';

export default function QRCodeGenerator() {
  const [selectedBar, setSelectedBar] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBar && tableNumber) {
      const barName = bars.find(bar => bar.id === selectedBar)?.name.replace(/\s+/g, '').toLowerCase();
      const generatedUrl = `/bar/${barName}/${tableNumber}`;
      setQrCodeUrl(window.location.origin + generatedUrl);
    //   router.push(generatedUrl);
    }
  };

  return (
    <div className="space-y-4">
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

      {qrCodeUrl && (
        <div className="mt-8 text-center">
          <h2 className="text-xl text-white mb-4">Scan this QR Code:</h2>
          <QRCode value={qrCodeUrl} size={256} bgColor={"#ffffff"} fgColor={"#000000"} level={"H"} />
          <p className="mt-4 text-white">{qrCodeUrl}</p>
        </div>
      )}
    </div>
  );
}
