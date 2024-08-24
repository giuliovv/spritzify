importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyClOPIlYEhluvw1Dov4TU8DZbe5D6RQ1y4",
  authDomain: "spritzify-6f52c.firebaseapp.com",
  projectId: "spritzify-6f52c",
  storageBucket: "spritzify-6f52c.appspot.com",
  messagingSenderId: "511607028837",
  appId: "1:511607028837:web:5596164fdf67daee061a8c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/spritz_image.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});