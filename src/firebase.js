import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDtdNlm2E4tIcbEOfP2ZkdN9Tijgo9Tqvw",
  authDomain: "learnn-656c4.firebaseapp.com",
  projectId: "learnn-656c4",
  storageBucket: "learnn-656c4.appspot.com",
  messagingSenderId: "162351723699",
  appId: "1:162351723699:web:a5eaf14772d25598192cc6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);