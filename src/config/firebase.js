
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe5W4LKc08aOwL81vvpgpuxp1dobhSZ_E",
  authDomain: "crud-book-app-d9771.firebaseapp.com",
  projectId: "crud-book-app-d9771",
  storageBucket: "crud-book-app-d9771.firebasestorage.app",
  messagingSenderId: "33738739568",
  appId: "1:33738739568:web:4cefd3168e17a274d1c9b5"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const  db = getFirestore(app);