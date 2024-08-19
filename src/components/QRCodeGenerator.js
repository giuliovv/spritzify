'use client';

import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import jsPDF from 'jspdf';
import bars from '../constants';

export default function QRCodeGenerator() {
  const [selectedBar, setSelectedBar] = useState('');
  const [totalUmbrellas, setTotalUmbrellas] = useState('');
  const [totalTables, setTotalTables] = useState('');
  const [qrCodes, setQrCodes] = useState([]);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const generateQrCodes = (totalUmbrellas, totalTables, barId) => {
    const umbrellaCodes = Array.from({ length: totalUmbrellas }, (_, i) => {
      const umbrellaNumber = i + 1;
      return {
        label: `Ombrellone ${umbrellaNumber}`,
        url: `${window.location.origin}/bar/${barId}/${umbrellaNumber}`, // changed to barid in the url
      };
    });

    const tableCodes = Array.from({ length: totalTables }, (_, i) => {
      const tableNumber = i + 1001;
      return {
        label: `Tavolo ${tableNumber}`,
        url: `${window.location.origin}/bar/${barId}/${tableNumber}`, // changed to barid in the url
      };
    });

    return [...umbrellaCodes, ...tableCodes];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBar && totalUmbrellas && totalTables) {
      const barId = bars.find(bar => bar.id === selectedBar)?.id;
      const codes = generateQrCodes(Number(totalUmbrellas), Number(totalTables), barId);
      setQrCodes(codes);
      setPdfGenerated(true);
    }
  };

  const handleDownloadPdf = () => {
    const pdf = new jsPDF();
    let y = 10; // Starting Y position for the first QR code

    qrCodes.forEach((code, index) => {
      if (index !== 0 && index % 4 === 0) {
        pdf.addPage(); // Add new page after every 4 QR codes
        y = 10; // Reset Y position
      }

      // Get the QR code as an image
      const qrCodeElement = document.getElementById(`qr-code-${index}`);
      const imgData = qrCodeElement.toDataURL('image/png');

      // Add QR code image to the PDF
      pdf.addImage(imgData, 'PNG', 10, y, 50, 50);

      // Add label and URL text next to the QR code
      pdf.text(code.label, 70, y + 20); // Placing the label beside the QR code
      pdf.text(code.url, 70, y + 30);   // Placing the URL beside the QR code

      y += 60; // Adjust spacing between QR codes
    });

    const barId = selectedBar; // Use the selectedBar state to get the bar ID
    pdf.save(`QRcodes-${barId}.pdf`); // Save the PDF with the desired name
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="barSelect" className="block text-white mb-2">Seleziona Bar:</label>
          <select
            id="barSelect"
            value={selectedBar}
            onChange={(e) => setSelectedBar(e.target.value)}
            className="w-full px-3 py-2 rounded bg-white bg-opacity-50 text-purple-900"
            required
          >
            <option value="">Seleziona bar</option>
            {bars.map((bar) => (
              <option key={bar.id} value={bar.id}>{bar.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="totalUmbrellas" className="block text-white mb-2">Numero totale ombrelloni:</label>
          <input
            type="number"
            id="totalUmbrellas"
            value={totalUmbrellas}
            onChange={(e) => setTotalUmbrellas(e.target.value)}
            className="w-full px-3 py-2 rounded bg-white bg-opacity-50 text-purple-900"
            required
          />
        </div>
        <div>
          <label htmlFor="totalTables" className="block text-white mb-2">Numero totale tavoli:</label>
          <input
            type="number"
            id="totalTables"
            value={totalTables}
            onChange={(e) => setTotalTables(e.target.value)}
            className="w-full px-3 py-2 rounded bg-white bg-opacity-50 text-purple-900"
            required
          />
        </div>
        <button type="submit" className="w-full bg-yellow-400 text-purple-900 py-2 rounded-full hover:bg-yellow-300 transition duration-300">
          Genera QR Code
        </button>
      </form>

      {pdfGenerated && (
        <div className="mt-8">
          <button onClick={handleDownloadPdf} className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-400 transition duration-300">
            Download PDF
          </button>
        </div>
      )}

      {/* Hidden QRCode components to render the QR codes for capturing */}
      <div className="hidden">
        {qrCodes.map((code, index) => (
          <QRCode
            id={`qr-code-${index}`}
            key={index}
            value={code.url}
            size={256}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"H"}
          />
        ))}
      </div>
    </div>
  );
}