// src/components/PaymentPage.js
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, DollarSign, Smartphone } from 'lucide-react';
import { db } from '../firebase/firebaseConfig'; // Import Firestore database
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Import Firestore methods

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const barId = searchParams.get('barId');
  const tableNumber = searchParams.get('tableNumber');
  const orderUnparsed = searchParams.get('order');
  const [order, setParsedOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    if (orderUnparsed) {
      try {
        const parsedOrder = JSON.parse(decodeURIComponent(orderUnparsed));
        setParsedOrder(parsedOrder);

        if (tableNumber && Number(tableNumber) < 1000) {
          setDeliveryFee(1);
        }
      } catch (error) {
        console.error("Failed to parse and consolidate order:", error);
      }
    }
  }, [orderUnparsed, tableNumber]);

  const totalAmount = order.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0) + deliveryFee;

  const placeStripe = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: order,
          barId,
          tableNumber,
          deliveryFee,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.sessionId) {
        throw new Error('No sessionId in response');
      }

      const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });

      if (result.error) {
        setError(result.error.message);
      }
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const placeCashOrder = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, 'orders'), {
        barId,
        tableNumber,
        items: order,
        status: 'pending',
        totalAmount,
        createdAt: serverTimestamp(),
      });

      router.push(`/success?method=cash&barId=${barId}&tableNumber=${tableNumber}`);
    } catch (err) {
      console.error('Error placing cash order:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSelection = (method) => {
    if (method === 'stripe') {
      placeStripe();
    } else if (method === 'cash') {
      placeCashOrder();
    } else if (method === 'satispay') {
      router.push('/satispay-payment');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-teal-300 p-6 font-sans">
      <div className="max-w-md mx-auto bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sommario</h2>

        <div className="mb-6">
          {order.map((item) => (
            <div
              key={item.id}
              className="bg-white bg-opacity-50 p-4 rounded-lg mb-2 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">€{item.price.toFixed(2)}</p>
                <p className="text-gray-700">Quantitá: {item.quantity}</p>
              </div>
              <div>
                <p className="text-lg font-bold">€{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          {deliveryFee > 0 && (
            <div className="mt-4 text-right">
              <p className="text-md font-bold">Costo consegna all'ombrellone: €{deliveryFee.toFixed(2)}</p>
            </div>
          )}
          <div className="mt-4 text-right">
            <p className="text-xl font-bold">Totale: €{totalAmount.toFixed(2)}</p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handlePaymentSelection('stripe')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center transition duration-300 disabled:opacity-50 shadow-md"
            disabled={isLoading}
          >
            <CreditCard className="mr-2" /> Paga con Stripe
          </button>
          <button
            onClick={() => handlePaymentSelection('cash')}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg flex items-center justify-center transition duration-300 disabled:opacity-50 shadow-md"
            disabled={isLoading}
          >
            <DollarSign className="mr-2" /> Paga in contanti
          </button>
          <button
            onClick={() => handlePaymentSelection('satispay')}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg flex items-center justify-center transition duration-300 disabled:opacity-50 shadow-md"
            disabled={isLoading}
          >
            <Smartphone className="mr-2" /> Paga con Satispay
          </button>
        </div>

        {isLoading && <p className="mt-4 text-center">Processando il pagamento...</p>}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}
