"use client";
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Footer from '../../components/Footer'; // Import Footer
import LoadingCircle from '@/components/LoadingCircle';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const barId = searchParams.get('barId');
  const tableNumber = searchParams.get('tableNumber');

  const handleOrderMoreClick = () => {
    window.location.href = `/bar/${barId}/${tableNumber}`;
  };

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="bg-white bg-opacity-20 p-8 rounded-xl backdrop-blur-md text-center shadow-lg">
        <div className="text-teal-500 mb-4">
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-teal-800 mb-2">
          L&apos;ordine ha avuto successo!
        </h1>
        <p className="text-gray-600 mb-6">Il tuo ordine arriverá presto.</p>
        <button
          onClick={handleOrderMoreClick}
          className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-400 transition duration-300"
        >
          Ordina qualcos&apos;altro
        </button>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 to-teal-300">
      <Suspense fallback={<LoadingCircle />}>
        <SuccessPageContent />
      </Suspense>
      <Footer className="mt-8" />
    </div>
  );
}