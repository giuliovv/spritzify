// src/components/Dashboard.js

"use client"
import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc } from 'firebase/firestore';
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
      where('status', '==', 'pending'),
      orderBy('createdAt', 'asc')
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
        setError('Non riesco a caricare gli ordini. Per favore riprova.');
        setLoading(false);
      }
    );

    // Cleanup function
    return () => unsubscribe();
  }, [barId]);

  const handleStatusChange = async (orderId) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: 'shipped' });
    } catch (err) {
      console.error('Error updating order status: ', err);
      setError('Non riesco ad aggiornare lo stato degli ordini. Per favore riprova.');
    }
  };

  if (loading) return <div>Caricamento ordini...</div>;
  if (error) return <div>Errore: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard per Bar {barId}</h1>
      <OrderList orders={orders} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default Dashboard;
