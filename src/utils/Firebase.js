// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuUhO5Huzs_DBayeGXMT-Hr1o8n3-MUgY",
  authDomain: "netflixgpt-89b04.firebaseapp.com",
  projectId: "netflixgpt-89b04",
  storageBucket: "netflixgpt-89b04.appspot.com",
  messagingSenderId: "660158560059",
  appId: "1:660158560059:web:c53ec18fa97e063050a91e",
  measurementId: "G-XX8Z3TS7GE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();