// src/components/OrderPage.js

"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import bars from '../constants';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Sun, Umbrella, Martini } from 'lucide-react';
import Image from 'next/image';

export default function OrderPage({ barId, tableNumber }) {
  const [bar, setBar] = useState(null);
  const [order, setOrder] = useState([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const drinkCount = order.reduce((counts, item) => {
    counts[item.id] = (counts[item.id] || 0) + 1;
    return counts;
  }, {});

  useEffect(() => {
    const selectedBar = bars.find(b => b.id === barId);
    setBar(selectedBar);
  }, [barId]);

  const addToOrder = (item) => {
    setOrder([...order, item]);
  };

  const removeFromOrder = (item) => {
    const index = order.findIndex(i => i.id === item.id);
    if (index !== -1) {
      const newOrder = [...order];
      newOrder.splice(index, 1);
      setOrder(newOrder);
    }
  };

  const placeOrder = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const uniqueItems = Array.from(new Set(order.map(item => item.id)))
        .map(id => {
          const item = order.find(i => i.id === id);
          return {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: drinkCount[item.id],
          };
        });

      const orderData = {
        barId,
        tableNumber,
        items: uniqueItems,
        status: 'pending',
        totalAmount: uniqueItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      console.log('Order placed with ID: ', docRef.id);
      setIsOrderPlaced(true);
    } catch (err) {
      console.error('Error placing order: ', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const startNewOrder = () => {
    setOrder([]);
    setIsOrderPlaced(false);
  };

  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!bar) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-teal-300 p-6 font-sans">
      <header className="text-center mb-12">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-white mb-2 flex items-center justify-center"
        >
          <Sun className="mr-2" /> {bar.name}
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-white"
        >
          <Umbrella className="inline mr-2" /> Ombrellone {tableNumber}
        </motion.p>
      </header>

      <main className="max-w-md mx-auto bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 shadow-lg">
        {!isOrderPlaced ? (
          <>
            <div className="grid gap-4 mb-8">
              {bar.menu.map((drink) => (
                <motion.div
                  key={drink.id}
                  className="bg-white bg-opacity-50 p-4 rounded-lg flex justify-between items-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <Image
                      src={drink.image}
                      alt={drink.name}
                      width={40}
                      height={40}
                      className="mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">
                        {drink.icon} {drink.name} 
                      </h3>
                      <p className="text-gray-600">${drink.price}</p>
                      {drinkCount[drink.id] > 0 && (
                        <p className="text-gray-700">Nel carrello: {drinkCount[drink.id]}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {drinkCount[drink.id] > 0 && (
                      <button
                        onClick={() => removeFromOrder(drink)}
                        className="bg-red-400 text-white px-2 py-1 rounded-full hover:bg-red-300 transition duration-300 mr-2"
                      >
                        -
                      </button>
                    )}
                    <button
                      onClick={() => addToOrder(drink)}
                      className="bg-yellow-400 text-blue-900 px-2 py-1 rounded-full hover:bg-yellow-300 transition duration-300"
                    >
                      +
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              {/* <p className="mb-4">Ordini totali: {order.length}</p> */}
              <button
                onClick={placeOrder}
                disabled={order.length === 0 || isLoading}
                className="bg-teal-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-teal-400 transition duration-300 disabled:opacity-50"
              >
                {isLoading ? 'Ordine in corso...' : 'Ordina'}
              </button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Martini size={64} className="mx-auto mb-4 text-teal-500" />
            <h2 className="text-2xl font-bold mb-4 text-teal-800">L&apos;ordine ha avuto successo!</h2>
            <p className="text-gray-600 mb-6">Il tuo ordine arriverá presto.</p>
            <button
              onClick={startNewOrder}
              className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-400 transition duration-300"
            >
              Ordina qualcos&apos;altro
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
