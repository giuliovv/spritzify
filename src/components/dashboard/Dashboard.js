// src/components/dashboard/Dashboard.js

"use client";
import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc, getDocs, startAfter, limit } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import OrderList from "./OrderList";
import OlderOrderList from "./OlderOrderList";
import LoadingCircle from "../LoadingCircle";
import { RefreshCw } from "lucide-react"; // Importing the Lucide icon

const Dashboard = ({ barId }) => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [olderOrders, setOlderOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('active');
  const [lastVisible, setLastVisible] = useState(null);

  useEffect(() => {
    const activeOrdersQuery = query(
      collection(db, "orders"),
      where("barId", "==", barId),
      where("shipped", "==", false),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      activeOrdersQuery,
      (snapshot) => {
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActiveOrders(ordersData);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching active orders: ", err);
        setError("Non riesco a caricare gli ordini attivi. Per favore riprova.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [barId]);

  const fetchOlderOrders = async () => {
    setLoading(true);
    const olderOrdersQuery = query(
      collection(db, "orders"),
      where("barId", "==", barId),
      where("shipped", "==", true),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    try {
      const snapshot = await getDocs(olderOrdersQuery);
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOlderOrders(ordersData);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching older orders: ", err);
      setError("Non riesco a caricare gli ordini precedenti. Per favore riprova.");
      setLoading(false);
    }
  };

  const loadMoreOlderOrders = async () => {
    if (!lastVisible) return;

    setLoading(true);
    const moreOlderOrdersQuery = query(
      collection(db, "orders"),
      where("barId", "==", barId),
      where("shipped", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(lastVisible),
      limit(10)
    );

    try {
      const snapshot = await getDocs(moreOlderOrdersQuery);
      const moreOrdersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOlderOrders([...olderOrders, ...moreOrdersData]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching more older orders: ", err);
      setError("Non riesco a caricare altri ordini precedenti. Per favore riprova.");
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { shipped: true });
    } catch (err) {
      console.error("Error updating order status: ", err);
      setError("Non riesco ad aggiornare lo stato degli ordini. Per favore riprova.");
    }
  };

  const refreshOlderOrders = () => {
    fetchOlderOrders(); // Refresh the older orders list
  };

  if (loading) return <LoadingCircle />;
  if (error) return <div>Errore: {error}</div>;

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('active')}
        >
          Ordini Attivi
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'older' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => {
            setActiveTab('older');
            if (olderOrders.length === 0) fetchOlderOrders();
          }}
        >
          Ordini Inviati
        </button>
      </div>
      {activeTab === 'active' ? (
        <OrderList orders={activeOrders} onStatusChange={handleStatusChange} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Ordini Inviati</h2>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded flex items-center"
              onClick={refreshOlderOrders}
            >
              <RefreshCw className="w-5 h-5" /> 
            </button>
          </div>
          <OlderOrderList orders={olderOrders} />
          {lastVisible && (
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              onClick={loadMoreOlderOrders}
            >
              Carica altri ordini
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
