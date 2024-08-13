import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyClOPIlYEhluvw1Dov4TU8DZbe5D6RQ1y4",
  authDomain: "spritzify-6f52c.firebaseapp.com",
  projectId: "spritzify-6f52c",
  storageBucket: "spritzify-6f52c.appspot.com",
  messagingSenderId: "511607028837",
  appId: "1:511607028837:web:5596164fdf67daee061a8c"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);