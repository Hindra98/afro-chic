// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCc7pd3KEjEB8sUFbrWbtr-hZN5AgvxFc",
  authDomain: "afrochic-ddd96.firebaseapp.com",
  projectId: "afrochic-ddd96",
  storageBucket: "afrochic-ddd96.appspot.com",
  messagingSenderId: "596546578881",
  appId: "1:596546578881:web:08804f0ffdfeb6420d6740",
  measurementId: "G-4NPBDTNB31"
};

// Initialize Firebase
export const app_firebase = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app_firebase);
export const auth_firebase = getAuth(app_firebase);
export const db_firebase = getFirestore(app_firebase);