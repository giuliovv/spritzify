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
          {sortedOrders.map((order) => (
            <li key={order.id} className="bg-white shadow rounded-lg p-4 text-black">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">ID ordine: {order.id}</span>
                <span
                  className={`px-2 py-1 rounded ${
                    order.status === 'pagato' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p><strong>{order.tableNumber < 1000 ? 'Ombrellone' : 'Tavolo'} numero:</strong> {order.tableNumber % 1000}</p>
              <p>Totale: €{order.totalAmount.toFixed(2)}</p>
              <div className="mt-2">
                <h4 className="font-semibold">Items:</h4>
                <ul className="list-disc list-inside">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} - Quantitá: {item.quantity} - Prezzo: €{item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Ordinato alle: {new Date(order.createdAt.seconds * 1000).toLocaleString()}
              </p>
              <button
                onClick={() => handleReopenOrder(order.id)}
                className="mt-4 bg-red-500 text-white py-1 px-4 rounded"
              >
                Riapri ordine
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OlderOrderList;
