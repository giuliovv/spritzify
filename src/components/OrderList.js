// src/components/OrderList.js
import React from 'react';

const OrderList = ({ orders }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-black">Recent Orders</h2>
      {orders.length === 0 ? (
        <p className="text-black">No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="bg-white shadow rounded-lg p-4 text-black">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">Order ID: {order.id}</span>
                <span className={`px-2 py-1 rounded ${
                  order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                  order.status === 'completed' ? 'bg-green-200 text-green-800' :
                  'bg-red-200 text-red-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <p>Table Number: {order.tableNumber}</p>
              <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
              <div className="mt-2">
                <h4 className="font-semibold">Items:</h4>
                <ul className="list-disc list-inside">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Ordered at: {new Date(order.createdAt.seconds * 1000).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;