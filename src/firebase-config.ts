// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSAZ4z7ZurZ_quSEawVpQgFT3gNvzoOEA",
  authDomain: "riskit-3313a.firebaseapp.com",
  projectId: "riskit-3313a",
  storageBucket: "riskit-3313a.appspot.com",
  messagingSenderId: "667504183605",
  appId: "1:667504183605:web:4ee3823021385104a2647c",
  measurementId: "G-6RHV0KRNLW",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// Export the auth function to use it in your components
const auth = getAuth(app);

export { auth, app, database };
