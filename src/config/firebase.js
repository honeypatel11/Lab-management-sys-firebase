
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9RNghLEDA5MPwUifVTFgtj2_peuVUEb8",
  authDomain: "lab-management-react.firebaseapp.com",
  projectId: "lab-management-react",
  storageBucket: "lab-management-react.firebasestorage.app",
  messagingSenderId: "1040215742180",
  appId: "1:1040215742180:web:d23da356c9efcd9c21fef1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const  db = getFirestore(app);