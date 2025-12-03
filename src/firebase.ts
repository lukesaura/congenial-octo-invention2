// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

// Hardcoded firebase config (you gave this earlier)
const firebaseConfig = {
  apiKey: "AIzaSyCRQFgXhpo_hsRBucf0_5lEZw1u_lNWd4Q",
  authDomain: "campusentry-c76db.firebaseapp.com",
  projectId: "campusentry-c76db",
  storageBucket: "campusentry-c76db.firebasestorage.app",
  messagingSenderId: "270814320065",
  appId: "1:270814320065:web:b8dde8274ffee3238e0b40",
  measurementId: "G-1DD75D7GT5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const serverTime = serverTimestamp;
