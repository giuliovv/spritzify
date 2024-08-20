import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center p-4 bg-transparent border-t border-gray-200 h-24">
      <div className="flex items-center mb-2">
        <Image src="/logo.png" alt="Logo" width={30} height={30} />
      </div>
      <div className="flex space-x-4 text-center text-sm">
        <Link href="/privacy-policy" className="text-white hover:underline">
          Privacy Policy
        </Link>
        <Link href="/tos" className="text-white hover:underline">
          Terms of Service
        </Link>
        <a href="mailto:pietro.fantini1998@gmail.com" className="text-white hover:underline">
          Support
        </a>
      </div>
    </footer>
  );
}