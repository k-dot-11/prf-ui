// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcfJryYWxrCLA4F4jVXHCNAn65WtsZ3bY",
  authDomain: "prf-db-f28e2.firebaseapp.com",
  projectId: "prf-db-f28e2",
  storageBucket: "prf-db-f28e2.appspot.com",
  messagingSenderId: "393549980813",
  appId: "1:393549980813:web:3edcb73a032708d9232ec4",
  measurementId: "G-2GYHQY7ZJ8"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);