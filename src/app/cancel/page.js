// src/app/cancel/page.js

"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Footer from '../../components/Footer';

function CancelPageContent() {
  const searchParams = useSearchParams();
  const barId = searchParams.get('barId');
  const tableNumber = searchParams.get('tableNumber');

  const handleRetryOrderClick = () => {
    window.location.href = `/bar/${barId}/${tableNumber}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-400 to-red-300 flex items-center justify-center">
      <div className="bg-white bg-opacity-20 p-8 rounded-xl backdrop-blur-md text-center shadow-lg">
        <div className="text-red-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-red-800 mb-2">
          L&apos;ordine è stato annullato!
        </h1>
        <p className="text-gray-600 mb-6">Non è stato effettuato alcun pagamento.</p>
        <button
          onClick={handleRetryOrderClick}
          className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-400 transition duration-300"
        >
          Riprova a ordinare
        </button>
      </div>
    </div>
  );
}

export default function CancelPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CancelPageContent />
      </Suspense>
      <Footer />
    </>
  );
}