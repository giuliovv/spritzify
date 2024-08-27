// src/components/dashboard/Header.js

"use client"
import { useState } from 'react';
import Link from 'next/link';
import bars from '@/constants'; // Import the bars data from constants.js

const Header = ({ barId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const bar = bars.find(b => b.id === barId);

  return (
    <div className="flex justify-between items-center p-4 bg-transparent text-white border-b border-gray-200 relative">
      <h1 className="text-2xl font-bold">
        Dashboard {bar?.name || 'Unknown Bar'}
      </h1>

      {/* Burger button to open menu on all screen sizes */}
      <div className="flex">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown menu for all screen sizes */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-gray-800 rounded-lg shadow-lg z-50 p-4">
          <div className="flex flex-col gap-y-4 items-start">
            <Link
              href={`/qrcodegenerator/${barId}?barId=${barId}`}
              className="text-white underline"
              onClick={() => setIsOpen(false)} // Close menu on click
            >
              Genera QR Code
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;