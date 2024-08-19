import QRCodeGenerator from '../components/QRCodeGenerator';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex flex-col justify-between p-4">
      <main className="bg-white bg-opacity-20 p-8 rounded-lg backdrop-blur-md w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-white font-['Poppins']">
          Beach Bar QR Generator
        </h1>
        <QRCodeGenerator />
      </main>
      <Footer />
    </div>
  );
}