"use client"

import { useState, useEffect } from 'react';

export default function OrderPage({ barId, tableNumber }) {
  const [bar, setBar] = useState(null);
  const [order, setOrder] = useState([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Hardcoded data
  const bars = [
    {
      id: 'beach100',
      name: 'Beach 100',
      theme: 'from-purple-600 to-indigo-600',
      menu: [
        { id: 'item1', name: 'Margarita', price: 12 },
        { id: 'item2', name: 'Old Fashioned', price: 15 },
        { id: 'item3', name: 'Mojito', price: 10 },
      ]
    },
    {
      id: 'bar2',
      name: 'Chill Vibes',
      theme: 'from-green-600 to-blue-600',
      meu: [
        { id: 'item4', name: 'Gin Tonic', price: 11 },
        { id: 'item5', name: 'Whiskey Sour', price: 14 },
        { id: 'item6', name: 'Pina Colada', price: 13 },
      ]
    }
  ];

  useEffect(() => {
    const selectedBar = bars.find(b => b.id === barId);
    setBar(selectedBar);
  }, [barId]);

  const addToOrder = (item) => {
    setOrder([...order, item]);
  };

  const placeOrder = () => {
    setIsOrderPlaced(true);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bar?.theme || ''} text-white p-6`}>
      <main className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center font-['Poppins']">🍹 {bar?.name || 'Unknown Bar'}</h1>
        <p className="text-xl mb-8 text-center">Ombrellone {tableNumber}</p>
        
        {!isOrderPlaced ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {bar?.menu.map((item) => (
                <div key={item.id} className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-md">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="mb-4">${item.price}</p>
                  <button
                    onClick={() => addToOrder(item)}
                    className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-full hover:bg-yellow-300 transition duration-300"
                  >
                    Add to Order
                  </button>
                </div>
              ))}
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-purple-600 p-4">
              <div className="max-w-3xl mx-auto flex justify-between items-center">
                <p>Total Items: {order.length}</p>
                <button
                  onClick={placeOrder}
                  className="bg-green-400 text-purple-900 px-6 py-2 rounded-full hover:bg-green-300 transition duration-300"
                >
                  Place Order
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center bg-white bg-opacity-20 p-8 rounded-lg backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
            <p>Your drinks and food will be served shortly. Enjoy your time at {bar?.name || 'the bar'}!</p>
          </div>
        )}
      </main>
    </div>
  );
}
