// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVIvU7YAYBdoEpayqstqM7ktO_0Xq_dZM",
  authDomain: "learn-2954c.firebaseapp.com",
  projectId: "learn-2954c",
  storageBucket: "learn-2954c.appspot.com",
  messagingSenderId: "710512080939",
  appId: "1:710512080939:web:0873910b8c892fb1a0926e",
  measurementId: "G-NPW04N6JCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);