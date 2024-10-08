// src/components/dashboard/Dashboard.js

"use client";
import React, { useState, useEffect, useRef } from "react";
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc, getDocs, startAfter, limit, setDoc } from "firebase/firestore";
// import { getToken, onMessage } from "firebase/messaging";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth, messaging } from "../../firebase/firebaseConfig";
import OrderList from "./OrderList";
import OlderOrderList from "./OlderOrderList";
import LoadingCircle from "../LoadingCircle";
import { useRouter } from 'next/navigation';
import { RefreshCw, Volume2, VolumeX } from "lucide-react";

const Snackbar = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
      {message}
      <button onClick={onClose} className="ml-2 font-bold">×</button>
    </div>
  );
};

const Dashboard = ({ barId }) => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [olderOrders, setOlderOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState('not-requested');
  const [activeTab, setActiveTab] = useState('active');
  const [lastVisible, setLastVisible] = useState(null);
  const router = useRouter();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(new Audio('/sounds/notification.mp3'));
  const initialFetchRef = useRef(true);
  const lastOrdersRef = useRef([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchOrders(currentUser.uid);
      } else {
        router.push('/login');
      }
    });

    // const unsubscribeMessage = onMessage(messaging, (payload) => {
    //   console.log('Received foreground message:', payload);
    // });

    return () => {
      unsubscribeAuth();
      // unsubscribeMessage();
    };
  }, [barId, router]);

  const fetchOrders = (userId) => {
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

        if (!initialFetchRef.current) {
          const newOrders = ordersData.filter(order => 
            !lastOrdersRef.current.find(lastOrder => lastOrder.id === order.id)
          );

          if (newOrders.length > 0) {
            if (!isMuted) {
              audioRef.current.play();
            }
            setSnackbarMessage('Nuovo ordine ricevuto!');
            setShowSnackbar(true);
            setTimeout(() => setShowSnackbar(false), 3000);
          }
        } else {
          initialFetchRef.current = false;
        }

        lastOrdersRef.current = ordersData;
        setActiveOrders(ordersData);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching active orders: ", err);
        setError("Non riesco a caricare gli ordini attivi. Per favore riprova.");
        setLoading(false);
      }
    );

    return unsubscribe;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };


  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service Worker registered with scope:', registration.scope);

        // if (messaging) {
        //   const currentToken = await getToken(messaging, { 
        //     vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        //     serviceWorkerRegistration: registration
        //   });
          
        //   if (currentToken && user) {
        //     console.log('FCM token:', currentToken);
        //     await saveUserToken(user.email, currentToken);
        //     setNotificationStatus('enabled');
        //   } else {
        //     console.log('No registration token available.');
        //     setNotificationStatus('error');
        //   }
        // } else {
        //   console.log('Firebase messaging is not supported in this browser');
        //   setNotificationStatus('not-supported');
        // }
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
    fetchOlderOrders();
  };

  if (loading) return <LoadingCircle />;
  if (error) return <div>Errore: {error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded ${activeTab === 'active' ? 'bg-blue-500 text-white font-bold' : 'bg-gray-300 text-gray-600'}`}
            onClick={() => setActiveTab('active')}
          >
            Ordini Aperti
          </button>
          <button
            className={`px-3 py-1 text-sm rounded ${activeTab === 'older' ? 'bg-blue-500 text-white font-bold' : 'bg-gray-300 text-gray-600'}`}
            onClick={() => {
              setActiveTab('older');
              if (olderOrders.length === 0) fetchOlderOrders();
            }}
          >
            Ordini Consegnati
          </button>
          {activeTab === 'older' && (
            <button
              className="bg-green-500 text-white py-1 px-3 rounded flex items-center"
              onClick={refreshOlderOrders}
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          )}
        </div>
        <button
          onClick={toggleMute}
          className="p-2 text-blue-500 bg-transparent rounded-full hover:bg-blue-100 transition-colors"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>
      {/* {notificationStatus === 'not-requested' && (
        <button 
          onClick={requestNotificationPermission}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Attiva notifiche
        </button>
      )} */}
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
      {activeTab === 'active' ? (
        <OrderList orders={activeOrders} onStatusChange={handleStatusChange} />
      ) : (
        <>
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
      <Snackbar 
        message={snackbarMessage} 
        isVisible={showSnackbar} 
        onClose={() => setShowSnackbar(false)} 
      />
    </div>
  );
};

export default Dashboard;
