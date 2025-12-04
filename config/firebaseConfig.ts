import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWHXwCGVFLQuZTQYiQKdPbrSRXC7rhlec",
  authDomain: "invoice-app-f0e3c.firebaseapp.com",
  projectId: "invoice-app-f0e3c",
  storageBucket: "invoice-app-f0e3c.firebasestorage.app",
  messagingSenderId: "577300868338",
  appId: "1:577300868338:web:bc4197334681c23461f46b",
  measurementId: "G-B6MESQ4J38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);