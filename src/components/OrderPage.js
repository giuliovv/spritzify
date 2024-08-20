// src/components/OrderPage.js
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import bars from '../constants';
import { Sun, Umbrella, Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Footer from './Footer';
import LoadingCircle from './LoadingCircle';

const MENU_CATEGORIES = ['Drink', 'Pizza', 'Breakfast'];

export default function OrderPage({ barId, tableNumber }) {
  const [bar, setBar] = useState(null);
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();

  const drinkCount = order.reduce((counts, item) => {
    counts[item.id] = (counts[item.id] || 0) + 1;
    return counts;
  }, {});

  useEffect(() => {
    const selectedBar = bars.find((b) => b.id === barId);
    setBar(selectedBar);
  }, [barId]);

  const addToOrder = (item) => {
    setOrder([...order, item]);
  };

  const removeFromOrder = (item) => {
    const index = order.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      const newOrder = [...order];
      newOrder.splice(index, 1);
      setOrder(newOrder);
    }
  };

  const placeOrder = () => {
    const uniqueItems = Array.from(new Set(order.map((item) => item.id))).map((id) => {
      const item = order.find((i) => i.id === id);
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: order.filter((i) => i.id === id).length,
      };
    });

    const serializedOrder = encodeURIComponent(JSON.stringify(uniqueItems));
    router.push(`/payment?barId=${barId}&tableNumber=${tableNumber}&order=${serializedOrder}`);
  };

  const filteredMenu = bar?.menu.filter((item) => {
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (selectedCategory && item.category !== selectedCategory.toLowerCase()) {
      return false;
    }
    return true;
  });

  const getSuggestions = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 11) {
      return bar?.menu.filter((item) => item.category === 'breakfast');
    } else if (currentHour < 15) {
      return bar?.menu.filter((item) => item.category === 'pizza');
    } else {
      return bar?.menu.filter((item) => item.category === 'drink');
    }
  };

  const suggestions = getSuggestions();

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  // Show the loading circle while the bar is being loaded
  if (!bar) return <LoadingCircle />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-teal-300 p-6 font-sans flex flex-col justify-between">
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
          <Umbrella className="inline mr-2" /> {tableNumber < 1000 ? 'Ombrellone' : 'Tavolo'} {tableNumber%1000}
        </motion.p>
      </header>

      <main className="w-full max-w-xl mx-auto bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 shadow-lg mb-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Suggestions</h2>
          <div className="grid gap-4">
            {suggestions.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white bg-opacity-50 p-4 rounded-lg flex justify-between items-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">
                      {item.icon} {item.name}
                    </h3>
                    <p className="text-gray-600">€{item.price}</p>
                    {drinkCount[item.id] > 0 && (
                      <p className="text-gray-700">Nel carrello: {drinkCount[item.id]}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  {drinkCount[item.id] > 0 && (
                    <button
                      onClick={() => removeFromOrder(item)}
                      className="bg-red-400 text-white px-2 py-1 rounded-full hover:bg-red-300 transition duration-300 mr-2"
                    >
                      -
                    </button>
                  )}
                  <button
                    onClick={() => addToOrder(item)}
                    className="bg-yellow-400 text-blue-900 px -2 py-1 rounded-full hover:bg-yellow-300 transition duration-300"
                  >
                    +
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Menu</h2>
          <div className="flex justify-between mb-4">
            <div className="flex space-x-4">
              {MENU_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category
                      ? 'bg-teal-500 text-white'
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75 text-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white bg-opacity-50 focus:bg-opacity-75 transition-colors pl-8 pr-4 py-2 rounded-full w-48 text-gray-700"
              />
            </div>
          </div>
          <div className="grid gap-4">
            {filteredMenu?.map((drink) => (
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
                    <p className="text-gray-600">€{drink.price}</p>
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
        </div>

        <div className="text-center">
          <button
            onClick={placeOrder}
            disabled={order.length === 0 || isLoading}
            className="bg-teal-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-teal-400 transition duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Ordine in corso...' : 'Ordina'}
          </button>
        </div>
      </main>
      <Footer className="mt-8" />
    </div>
  );
}