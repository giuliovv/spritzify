import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyClOPIlYEhluvw1Dov4TU8DZbe5D6RQ1y4",
  authDomain: "spritzify-6f52c.firebaseapp.com",
  projectId: "spritzify-6f52c",
  storageBucket: "spritzify-6f52c.appspot.com",
  messagingSenderId: "511607028837",
  appId: "1:511607028837:web:5596164fdf67daee061a8c"
};

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

let messaging = null;

if (typeof window !== 'undefined') {
  isSupported().then((isSupported) => {
    if (isSupported) {
      messaging = getMessaging(firebaseApp);
    }
  }).catch((err) => {
    console.error("Firebase messaging not supported", err);
  });
}

export { auth, db, messaging, firebaseConfig };