// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'

// Optionally import the services that you want to use
//import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBsDiB1ztjtwhLtkZZC10Mqfutg4OlJx5c",
    authDomain: "todoapp-3cae5.firebaseapp.com",
    databaseURL: "https://todoapp-3cae5-default-rtdb.firebaseio.com",
    projectId: "todoapp-3cae5",
    storageBucket: "todoapp-3cae5.appspot.com",
    messagingSenderId: "235579446120",
    appId: "1:235579446120:web:6da42d85afc6e69c293cdd"
};
const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// } else {
//     firebase.app(); // if already initialized, use that one
// }