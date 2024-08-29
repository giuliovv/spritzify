// src/components/dashboard/OrderList.js

import React from 'react';

const OrderList = ({ orders, onStatusChange }) => {
  // Sort orders by createdAt globally
  const sortedOrders = orders.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

  // Group sorted orders by tableNumber
  const groupedOrders = sortedOrders.reduce((acc, order) => {
    if (!acc[order.tableNumber]) {
      acc[order.tableNumber] = {
        orders: [],
      };
    }
    acc[order.tableNumber].orders.push(order);
    return acc;
  }, {});

  // Extract the order of table numbers based on first appearance in the sorted list
  const orderedTableNumbers = Object.keys(groupedOrders).sort((a, b) => {
    const firstOrderA = groupedOrders[a].orders[0].createdAt.seconds;
    const firstOrderB = groupedOrders[b].orders[0].createdAt.seconds;
    return firstOrderB - firstOrderA;
  });

  return (
    <div>
      {sortedOrders.length === 0 ? (
        <p className="text-white text-3xl">Non ci sono ordini da mostrare.</p>
      ) : (
        orderedTableNumbers.map((tableNumber) => {
          let title;
          if (tableNumber >= 500 && tableNumber < 1000) {
            title = `Area Lettini ${tableNumber - 500}`;
          } else if (tableNumber < 500) {
            title = `Ombrellone ${tableNumber}`;
          } else {
            title = `Tavolo ${tableNumber - 1000}`;
          }
  
          const orderCount = groupedOrders[tableNumber].orders.length;
          const orderLabel = orderCount === 1 ? 'ordine' : 'ordini';
  
          return (
            <div key={tableNumber} className="mb-6 p-4 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-3xl font-bold text-white mb-1 flex justify-between items-center">
                {title}
                <span className="text-xl font-normal text-right">({orderCount} {orderLabel})</span>
              </h3>
              <div>
                <ul className="space-y-4 text-2xl">
                  {groupedOrders[tableNumber].orders.map((order) => {
                    const totalPrice = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
                    return (
                      <li key={order.id} className="bg-white shadow rounded-lg p-4 text-black">
                        <div className="flex justify-between items-center mb-2">
                          <ul className="list-disc list-inside">
                            {order.items.map((item, index) => (
                              <li key={index} className="text-xl">
                                {item.name} x {item.quantity}
                              </li>
                            ))}
                          </ul>
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
                        <p className="text-lg text-gray-800 mt-2">
                          <strong>Totale:</strong> {totalPrice.toFixed(2)} €
                        </p>
                        {tableNumber >= 500 && tableNumber < 1000 && order.name && (
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
                        {onStatusChange && (
                          <button
                            onClick={() => onStatusChange(order.id)}
                            className="mt-4 bg-blue-500 text-white text-sm py-1 px-4 rounded"
                          >
                            Segna come consegnato
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrderList;