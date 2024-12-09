// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDVoG9YQGAsKwm5cwqLEGfDNbD0uvaDDcw",
    authDomain: "tienda-coder-533fd.firebaseapp.com",
    projectId: "tienda-coder-533fd",
    storageBucket: "tienda-coder-533fd.firebasestorage.app",
    messagingSenderId: "516441227093",
    appId: "1:516441227093:web:3df915b809d341fafcf9dc",
    measurementId: "G-G3ZR7PYWHM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
