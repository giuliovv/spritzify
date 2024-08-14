// src/components/Dashboard.js
"use client"
import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import OrderList from './OrderList';

const Dashboard = ({ barId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ordersQuery = query(
      collection(db, 'orders'),
      where('barId', '==', barId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(ordersQuery,
      (snapshot) => {
        const ordersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(ordersData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching orders: ', err);
        setError('Failed to fetch orders. Please try again.');
        setLoading(false);
      }
    );

    // Cleanup function
    return () => unsubscribe();
  }, [barId]);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard for Bar {barId}</h1>
      <OrderList orders={orders} />
    </div>
  );
};

export default Dashboard;