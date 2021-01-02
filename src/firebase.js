import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCFZIX4sq8i21twq6x8lxTJ_ebloSW0Qtw",
    authDomain: "texx-4928e.firebaseapp.com",
    projectId: "texx-4928e",
    storageBucket: "texx-4928e.appspot.com",
    messagingSenderId: "97702030938",
    appId: "1:97702030938:web:7ea5886912187d58147263",
    measurementId: "G-F1VDTNLH80"
  });

const DataBase = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export  {DataBase,auth,storage};