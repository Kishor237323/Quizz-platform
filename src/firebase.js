// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbGvqGFjUK3y9Uf-Dwj_GIEnQl8YY_-Ek",
  authDomain: "quizz-platform.firebaseapp.com",
  projectId: "quizz-platform",
  storageBucket: "quizz-platform.firebasestorage.app",
  messagingSenderId: "994649546139",
  appId: "1:994649546139:web:390dcc05d9fae5c071153e",
  measurementId: "G-P6DZNZLWDS"
 
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

