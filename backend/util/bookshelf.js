
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: copy-paste the config variables found in your Firebase Project Settings!
const firebaseConfig = {
    apiKey: "AIzaSyB-1YH2Yx4YemYHRB1J74XTqkq9I7OR_j4",
    authDomain: "book-exchange-56d0e.firebaseapp.com",
    projectId: "book-exchange-56d0e",
    storageBucket: "book-exchange-56d0e.appspot.com",
    messagingSenderId: "669460211105",
    appId: "1:669460211105:web:2110cd197685ff5cdf57e0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

