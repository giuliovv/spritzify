// src/components/dashboard/OlderOrderList.js

import React from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const OlderOrderList = ({ orders }) => {
  const sortedOrders = orders.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

  const handleReopenOrder = async (orderId) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { shipped: false });
      alert('Ordine riaperto con successo!');
    } catch (err) {
      console.error("Error reopening order: ", err);
      alert('Errore nel riaprire l\'ordine. Per favore riprova.');
    }
  };

  return (
    <div>
      {sortedOrders.length === 0 ? (
        <p className="text-white">Non ci sono ordini inviati da mostrare.</p>
      ) : (
        <ul className="space-y-4">
          {sortedOrders.map((order) => {
            const totalPrice = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 1;
            let title;
            if (order.tableNumber >= 500 && order.tableNumber < 1000) {
              title = `Area Lettini ${order.tableNumber - 500}`;
            } else if (order.tableNumber < 500) {
              title = `Ombrellone ${order.tableNumber}`;
            } else {
              title = `Tavolo ${order.tableNumber - 1000}`;
            }

            return (
              <li key={order.id} className="bg-white shadow rounded-lg p-4 text-black">
                <div className="mb-2">
                  <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-2 py-1 text-base rounded ${
                        order.status === 'pagato'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {order.status === 'pagato' ? 'Pagato' : 'Da pagare'}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <ul className="list-disc list-inside text-xl">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} - {item.quantity} x {item.price.toFixed(2)} €
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-lg text-gray-800 mt-2">
                  <strong>Totale:</strong> {totalPrice.toFixed(2)} €
                </p>
                {order.tableNumber >= 500 && order.tableNumber < 1000 && order.name && (
                  <p className="text-lg text-gray-800 mt-2">
                    <strong>Nome:</strong> {order.name}
                  </p>
                )}
                {order.message && (
                  <p className="text-lg text-gray-800 mt-2">
                    <strong>Messaggio:</strong> {order.message}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Ordinato alle: {new Date(order.createdAt.seconds * 1000).toLocaleTimeString()} - {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleReopenOrder(order.id)}
                  className="mt-4 bg-red-500 text-white py-1 px-4 rounded"
                >
                  Riapri ordine
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default OlderOrderList;