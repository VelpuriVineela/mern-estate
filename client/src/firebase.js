// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-86765.firebaseapp.com",
  projectId: "mern-estate-86765",
  storageBucket: "mern-estate-86765.appspot.com",
  messagingSenderId: "123006147221",
  appId: "1:123006147221:web:b9ed5093f26d655031999c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
