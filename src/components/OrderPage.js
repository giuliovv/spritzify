"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import bars from '../constants';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Sun, Umbrella, Martini } from 'lucide-react';

export default function OrderPage({ barId, tableNumber }) {
  const [bar, setBar] = useState(null);
  const [order, setOrder] = useState([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const selectedBar = bars.find(b => b.id === barId);
    setBar(selectedBar);
  }, [barId]);

  const addToOrder = (item) => {
    setOrder([...order, item]);
  };

  const placeOrder = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const orderData = {
        barId,
        tableNumber,
        items: order.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1
        })),
        status: 'pending',
        totalAmount: order.reduce((sum, item) => sum + item.price, 0),
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
          <Sun className="mr-2" /> Beach 100
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
                  <div>
                    <h3 className="text-xl font-semibold">{drink.icon} {drink.name}</h3>
                    <p className="text-gray-600">${drink.price}</p>
                  </div>
                  <button
                    onClick={() => addToOrder(drink)}
                    className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-full hover:bg-yellow-300 transition duration-300"
                  >
                    Add
                  </button>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <p className="mb-4">Total Items: {order.length}</p>
              <button
                onClick={placeOrder}
                disabled={order.length === 0 || isLoading}
                className="bg-teal-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-teal-400 transition duration-300 disabled:opacity-50"
              >
                {isLoading ? 'Placing Order...' : 'Place Order'}
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
            <h2 className="text-2xl font-bold mb-4 text-teal-800">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">Your drinks will be served shortly. Enjoy your time at Beach 100!</p>
            <button
              onClick={startNewOrder}
              className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-400 transition duration-300"
            >
              Place Another Order
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}