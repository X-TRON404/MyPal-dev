//we are not including entire firebase bundle 
//just including the firebase/app to reduce loading time
import firebase from 'firebase/app';

//==============================================Firebase messaging background listener====================
// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// This import loads the firebase namespace

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCH-EjSPlON22U5C0a-Eg2dmTeqGzzyeLQ",
  authDomain: "mypal-7c455.firebaseapp.com",
  projectId: "mypal-7c455",
  storageBucket: "mypal-7c455.appspot.com",
  messagingSenderId: "86014872255",
  appId: "1:86014872255:web:b1bf79a4720a89f9f5540a",
  measurementId: "G-V6FWK4HP83"
});
// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});