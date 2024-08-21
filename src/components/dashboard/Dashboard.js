"use client";
import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import OrderList from "./OrderList";
import LoadingCircle from "../LoadingCircle";

const Dashboard = ({ barId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ordersQuery = query(
      collection(db, "orders"),
      where("barId", "==", barId),
      where("shipped", "==", false),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(
      ordersQuery,
      (snapshot) => {
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
        console.log(ordersData);

        // Detect new orders using docChanges and call the email API
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const newOrder = { id: change.doc.id, ...change.doc.data() };
            sendOrderEmail(newOrder);
          }
        });

        setLoading(false);
      },
      (err) => {
        console.error("Error fetching orders: ", err);
        setError("Non riesco a caricare gli ordini. Per favore riprova.");
        setLoading(false);
      }
    );

    // Cleanup function
    return () => unsubscribe();
  }, [barId]);

  const sendOrderEmail = async (newOrder) => {
    try {
      await fetch("/api/sendOrderEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order: newOrder }),
      });
      console.log("New order processed and email sent:", newOrder);
    } catch (err) {
      console.error("Error sending order email: ", err);
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

  if (loading) return <LoadingCircle />;
  if (error) return <div>Errore: {error}</div>;

  return (
    <div className="p-4">
      <OrderList orders={orders} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default Dashboard;