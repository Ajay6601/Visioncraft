// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage';



const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "visioncraft-b335b.firebaseapp.com",
    projectId: "visioncraft-b335b",
    storageBucket: "visioncraft-b335b.firebasestorage.app",
    messagingSenderId: "19715132018",
    appId: "1:19715132018:web:20e751ccb65e00207bd0eb",
    measurementId: "G-64RQ8RQ6X9"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

  export const storage=getStorage(app);