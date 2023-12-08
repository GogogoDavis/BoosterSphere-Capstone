
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIUci4n3RvA4pYb6_GRdZVUIP7574PEYo",
  authDomain: "capstone-b1b79.firebaseapp.com",
  projectId: "capstone-b1b79",
  storageBucket: "capstone-b1b79.appspot.com",
  messagingSenderId: "553101882886",
  appId: "1:553101882886:web:8fb3eb19a5b500ca333587",
  measurementId: "G-Q5EGTKL07D"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()