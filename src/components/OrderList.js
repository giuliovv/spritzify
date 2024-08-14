// src/components/OrderList.js
import React from 'react';

const OrderList = ({ orders }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-black">Ordini recenti</h2>
      {orders.length === 0 ? (
        <p className="text-black">Non ci sono ordini per ora.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="bg-white shadow rounded-lg p-4 text-black">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">ID ordine: {order.id}</span>
                <span className={`px-2 py-1 rounded ${
                  order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                  order.status === 'completed' ? 'bg-green-200 text-green-800' :
                  'bg-red-200 text-red-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <p>Ombrellone numero: {order.tableNumber}</p>
              <p>Totale: ${order.totalAmount.toFixed(2)}</p>
              <div className="mt-2">
                <h4 className="font-semibold">Items:</h4>
                <ul className="list-disc list-inside">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} - Quantita': {item.quantity} - Prezzo: ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Ordinato alle: {new Date(order.createdAt.seconds * 1000).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;