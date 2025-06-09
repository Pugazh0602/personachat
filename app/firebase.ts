// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "personachatlove.firebaseapp.com",
  projectId: "personachatlove",
  storageBucket: "personachatlove.appspot.com",
  messagingSenderId: "581474935638",
  appId: "1:581474935638:web:d21285efb9f205053becf7",
  measurementId: "G-T9LLDNVT88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }; 
