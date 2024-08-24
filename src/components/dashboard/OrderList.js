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
        totalAmount: 0,
        datetimes: [],
      };
    }
    acc[order.tableNumber].orders.push(order);
    acc[order.tableNumber].totalAmount += order.totalAmount;
    acc[order.tableNumber].datetimes.push(order.createdAt);
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
      <h2 className="text-xl font-semibold mb-2 text-white">
        {onStatusChange ? 'Ordini aperti' : 'Ordini precedenti'}
      </h2>
      {sortedOrders.length === 0 ? (
        <p className="text-white">Non ci sono ordini da mostrare.</p>
      ) : (
        orderedTableNumbers.map((tableNumber) => (
          <div key={tableNumber} className="mb-6 p-4 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-white mb-2">
              {tableNumber < 1000 ? 'Ombrellone' : 'Tavolo'} numero: {tableNumber % 1000}
            </h3>
            <p className="text-white mb-2">Totale complessivo: €{groupedOrders[tableNumber].totalAmount.toFixed(2)}</p>
            <div className="mb-2">
              <h4 className="text-white font-semibold">Orario ordini:</h4>
              <ul className="list-disc list-inside text-gray-300">
                {groupedOrders[tableNumber].datetimes.map((datetime, index) => (
                  <li key={index}>
                    {new Date(datetime.seconds * 1000).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold">Dettaglio ordini:</h4>
              <ul className="space-y-4">
                {groupedOrders[tableNumber].orders.map((order) => (
                  <li key={order.id} className="bg-white shadow rounded-lg p-4 text-black">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">ID ordine: {order.id}</span>
                      <span
                        className={`px-2 py-1 rounded ${
                          order.status === 'pagato'
                            ? 'bg-green-200 text-green-800'
                            : 'bg-yellow-200 text-yellow-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
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
                    {onStatusChange && (
                      <button
                        onClick={() => onStatusChange(order.id)}
                        className="mt-4 bg-blue-500 text-white py-1 px-4 rounded"
                      >
                        Segna come inviato
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
