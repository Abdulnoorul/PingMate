// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAblgEt9DjpOtC0Fl2k7rYx_bfwLx8VVUY",
  authDomain: "pingmate-d9ebd.firebaseapp.com",
  projectId: "pingmate-d9ebd",
  storageBucket: "pingmate-d9ebd.firebasestorage.app",
  messagingSenderId: "921729063272",
  appId: "1:921729063272:web:63ed2988acd3742d569edd",
  measurementId: "G-VN8XHYSSMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app;