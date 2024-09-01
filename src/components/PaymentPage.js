// src/components/PaymentPage.js

"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, Euro } from 'lucide-react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Footer from './Footer';
import { decryptOrder } from '../utils/orderEncryption';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const barId = searchParams.get('barId');
  const tableNumber = searchParams.get('tableNumber');
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [orderLoaded, setOrderLoaded] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isLettino, setIsLettino] = useState(false);
  const [locationType, setLocationType] = useState('');
  const [locationNumber, setLocationNumber] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(!barId);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderLoaded) {
        const encryptedOrder = localStorage.getItem('encryptedOrder');
        console.log('Encrypted order from localStorage:', encryptedOrder);
        if (encryptedOrder) {
          try {
            const decryptedOrder = decryptOrder(encryptedOrder);
            console.log('Decrypted order:', decryptedOrder);
            setOrder(decryptedOrder);

            if (tableNumber) {
              if (Number(tableNumber) < 1000) {
                setDeliveryFee(1);
              }

              if (Number(tableNumber) >= 500 && Number(tableNumber) < 1000) {
                setIsLettino(true);
              }
            }

            setOrderLoaded(true);
          } catch (error) {
            console.error("Failed to decrypt order:", error);
            setError("Failed to retrieve order details. Please try again.");
          }
        } else {
          console.log('No encrypted order found in localStorage');
          setError("No order found. Please return to the menu and place an order.");
        }
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [tableNumber, orderLoaded]);

  const totalAmount = order.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0) + deliveryFee;

  const sendOrderEmail = async (newOrder) => {
    try {
      await fetch("/api/sendOrderEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order: newOrder }),
      });
      console.log("New order processed and email sent:", newOrder);
    } catch (err) {
      console.error("Error sending order email: ", err);
    }
  };

  const placeStripe = async () => {
    setIsLoading(true);
    setError(null);

    if ((isLettino || !tableNumber) && !name) {
      setError('Per favore completa il campo nome prima di procedere.');
      setIsLoading(false);
      return;
    }

    if (!tableNumber && (!locationType || !locationNumber)) {
      setError('Per favore seleziona il tipo di postazione e il numero.');
      setIsLoading(false);
      return;
    }

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
          tableNumber: tableNumber || `${locationType}-${locationNumber}`,
          deliveryFee,
          name: isLettino || !tableNumber ? name : '',
          message: message || '',
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
      } else {
        localStorage.removeItem('encryptedOrder');
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

    if ((isLettino || !tableNumber) && !name) {
      setError('Per favore completa il campo nome prima di procedere.');
      setIsLoading(false);
      return;
    }

    if (!tableNumber && (!locationType || !locationNumber)) {
      setError('Per favore seleziona il tipo di postazione e il numero.');
      setIsLoading(false);
      return;
    }

    const req = {
      barId,
      tableNumber: tableNumber || `${locationType}-${locationNumber}`,
      items: order,
      status: 'da pagare',
      totalAmount,
      createdAt: serverTimestamp(),
      shipped: false,
      name: isLettino || !tableNumber ? name : '',
      message: message || '',
    };

    try {
      await addDoc(collection(db, 'orders'), req);

      sendOrderEmail(req);

      localStorage.removeItem('encryptedOrder');
      router.push(`/success?method=cash&barId=${barId}&tableNumber=${req.tableNumber}`);
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
    }
  };

  if (!barId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md text-black">
          <h1 className="text-2xl font-bold mb-4">Errore</h1>
          <p className="mb-4">C&apos;é stato un problema con l&apos;id del bar, per favore scansiona il QR code di nuovo</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-teal-300 p-6 font-sans flex flex-col justify-between">
      <div className="w-full max-w-2xl mx-auto bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 shadow-lg mb-8">
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
              <p className="text-md font-bold">Costo consegna all&apos;ombrellone: €{deliveryFee.toFixed(2)}</p>
            </div>
          )}
          <div className="mt-4 text-right">
            <p className="text-xl font-bold">Totale: €{totalAmount.toFixed(2)}</p>
          </div>
        </div>

        {!tableNumber && (
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Tipo di postazione*</label>
            <select
              value={locationType}
              onChange={(e) => setLocationType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
              required
            >
              <option value="">Seleziona</option>
              <option value="ombrellone">Ombrellone</option>
              <option value="lettino">Lettino</option>
              <option value="tavolo">Tavolo</option>
            </select>

            {locationType && (
              <>
                <label className="block text-gray-700 font-semibold mt-4 mb-2">Numero postazione*</label>
                <input
                  type="number"
                  value={locationNumber}
                  onChange={(e) =>
                    setLocationNumber(
                      locationType === 'lettino'
                        ? Number(e.target.value) + 500
                        : locationType === 'tavolo'
                        ? Number(e.target.value) + 1000
                        : e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  placeholder="Inserisci il numero"
                  required
                />
              </>
            )}
          </div>
        )}


        {(isLettino || !tableNumber) && (
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Nome*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
              placeholder="Inserisci il tuo nome"
              required
            />
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Messaggio (opzionale)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            placeholder="Aggiungi un messaggio (max 200 caratteri)"
            maxLength={200}
          />
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handlePaymentSelection('stripe')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center transition duration-300 disabled:opacity-50 shadow-md"
            disabled={isLoading}
          >
            <CreditCard className="mr-2" /> Paga Online
          </button>
          <button
            onClick={() => handlePaymentSelection('cash')}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg flex items-center justify-center transition duration-300 disabled:opacity-50 shadow-md"
            disabled={isLoading}
          >
            <Euro className="mr-2" /> Paga in contanti
          </button>
        </div>

        {isLoading && <p className="mt-4 text-center">Processando il pagamento...</p>}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
      <Footer className="mt-8" />
    </div>
  );
}