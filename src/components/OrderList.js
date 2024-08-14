// src/components/OrderList.js
import React from 'react';

const OrderList = ({ orders, onStatusChange }) => {
  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.tableNumber]) {
      acc[order.tableNumber] = [];
    }
    acc[order.tableNumber].push(order);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-black">Ordini recenti</h2>
      {orders.length === 0 ? (
        <p className="text-black">Non ci sono ordini per ora.</p>
      ) : (
        Object.keys(groupedOrders).map((tableNumber) => (
          <div key={tableNumber} className="mb-4">
            <h3 className="text-lg font-bold text-black">Ombrellone numero: {tableNumber}</h3>
            <ul className="space-y-4">
              {groupedOrders[tableNumber].map((order) => (
                <li key={order.id} className="bg-white shadow rounded-lg p-4 text-black">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">ID ordine: {order.id}</span>
                    <span className="px-2 py-1 rounded bg-yellow-200 text-yellow-800">
                      {order.status}
                    </span>
                  </div>
                  <p>Totale: ${order.totalAmount.toFixed(2)}</p>
                  <div className="mt-2">
                    <h4 className="font-semibold">Items:</h4>
                    <ul className="list-disc list-inside">
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.name} - Quantitá: {item.quantity} - Prezzo: ${item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Ordinato alle: {new Date(order.createdAt.seconds * 1000).toLocaleString()}
                  </p>
                  <button
                    onClick={() => onStatusChange(order.id)}
                    className="mt-4 bg-blue-500 text-white py-1 px-4 rounded"
                  >
                    Segna come consegnato
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
