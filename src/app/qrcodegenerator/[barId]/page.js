import { Suspense } from 'react';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import LoadingCircle from '@/components/LoadingCircle';
import Footer from '@/components/Footer';
import AuthGuard from '@/components/AuthGuardQR';
import bars from '@/constants'; // Import the bars data

export default function QRCodePage({ searchParams }) {
  const { barId } = searchParams;

  // Find the bar by barId to get the bar name
  const bar = bars.find(b => b.id === barId);
  const barName = bar ? bar.name : 'Unknown Bar'; // Fallback to 'Unknown Bar' if not found

  return (
    <AuthGuard barId={barId}>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex flex-col justify-between p-4">
        <main className="bg-white bg-opacity-20 p-8 rounded-lg backdrop-blur-md w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">
            {`Generatore QR code per ${barName}`}
          </h1>
          <Suspense fallback={<LoadingCircle />}>
            <QRCodeGenerator barId={barId} />
          </Suspense>
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
}