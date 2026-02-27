// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOue-t4MBJLsIl_kv4ktAFnZhSeT-53jI",
  authDomain: "hirebase-36159.firebaseapp.com",
  projectId: "hirebase-36159",
  storageBucket: "hirebase-36159.firebasestorage.app",
  messagingSenderId: "929037926277",
  appId: "1:929037926277:web:ea792d5a22f74eb2364eec",
  measurementId: "G-ZCJTJPP346"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
