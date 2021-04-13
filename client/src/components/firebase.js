//not including entire firebase bundle 
//just including the firebase/app to reduce loading time


// This import loads the firebase namespace
import firebase from 'firebase/app';
// These imports load individual services into the firebase namespace.
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCH-EjSPlON22U5C0a-Eg2dmTeqGzzyeLQ",
    authDomain: "mypal-7c455.firebaseapp.com",
    projectId: "mypal-7c455",
    storageBucket: "mypal-7c455.appspot.com",
    messagingSenderId: "86014872255",
    appId: "1:86014872255:web:b1bf79a4720a89f9f5540a",
    measurementId: "G-V6FWK4HP83"
});

const DataBase = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
// const pref = firebaseApp.performance();
// const analytics = firebaseApp.analytics();

export  {DataBase,auth,storage}; 