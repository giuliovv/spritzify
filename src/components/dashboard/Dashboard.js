// src/components/dashboard/Dashboard.js

"use client"
import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc, setDoc } from "firebase/firestore";
import { getToken } from "firebase/messaging";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth, messaging, firebaseConfig } from "../../firebase/firebaseConfig";
import OrderList from "./OrderList";
import LoadingCircle from "../LoadingCircle";
import { useRouter } from 'next/navigation';

const Dashboard = ({ barId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState('not-requested');
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchOrders(currentUser.uid);
      } else {
        router.push('/login');
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, [barId, router]);

  const fetchOrders = (userId) => {
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
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching orders: ", err);
        setError("Non riesco a caricare gli ordini. Per favore riprova.");
        setLoading(false);
      }
    );

    return unsubscribe;
  };

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Register service worker
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service Worker registered with scope:', registration.scope);

        if (messaging) {
          const currentToken = await getToken(messaging, { 
            vapidKey: 'BH5uCQfhQHK5nvFXAaw8iBKVLa5UdO4XaF44x_Eh6hZ_sC5lLwgcnZuF7hXfa7uNpPfz-oIWnaXHkVt0f3R3CD0',
            serviceWorkerRegistration: registration
          });
          
          if (currentToken && user) {
            console.log('FCM token:', currentToken);
            await saveUserToken(user.email, currentToken);
            setNotificationStatus('enabled');
          } else {
            console.log('No registration token available.');
            setNotificationStatus('error');
          }
        } else {
          console.log('Firebase messaging is not supported in this browser');
          setNotificationStatus('not-supported');
        }
      } else {
        console.log('Notification permission denied');
        setNotificationStatus('denied');
      }
    } catch (err) {
      console.error('An error occurred while setting up notifications:', err);
      setNotificationStatus('error');
    }
  };

  const saveUserToken = async (userEmail, token) => {
    try {
      const userRef = doc(db, "users", userEmail);
      await setDoc(userRef, {
        email: userEmail,
        fcmToken: token,
        barId: barId
      }, { merge: true });
      console.log('User token saved successfully');
    } catch (err) {
      console.error('Error saving user token:', err);
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
      <h1>Ciao, {user?.email}</h1>
      {notificationStatus === 'not-requested' && (
        <button 
          onClick={requestNotificationPermission}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Attiva notifiche
        </button>
      )}
      {notificationStatus === 'enabled' && (
        <p className="mb-4 text-green-500">Notifiche attive!</p>
      )}
      {notificationStatus === 'denied' && (
        <p className="mb-4 text-red-500">Non sono stati dati i permessi per le notifiche. Per favore attivale nelle impostazioni del tuo browser.</p>
      )}
      {notificationStatus === 'error' && (
        <p className="mb-4 text-red-500">An error occurred while setting up notifications.</p>
      )}
      {notificationStatus === 'not-supported' && (
        <p className="mb-4 text-yellow-500">Notifiche non sono supportate in questo browser.</p>
      )}
      <OrderList orders={orders} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default Dashboard;