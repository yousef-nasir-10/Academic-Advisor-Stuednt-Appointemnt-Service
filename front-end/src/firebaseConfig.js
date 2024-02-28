// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhUOoulHW2WIZcvtq9eqlptVLiOwF9P3A",
  authDomain: "booking-appointments-ac7b7.firebaseapp.com",
  projectId: "booking-appointments-ac7b7",
  storageBucket: "booking-appointments-ac7b7.appspot.com",
  messagingSenderId: "175908653635",
  appId: "1:175908653635:web:0249313f6c50c4322d22f6",
  measurementId: "G-512Q9JV0LZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestoreDatabase = getFirestore(app)

export default firestoreDatabase
