import { getAuth } from "firebase/auth";
import firebase  from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxYVO2EYy51OltVdeDTbmCgJEchIJgCU8",
  authDomain: "clone-22cc8.firebaseapp.com",
  projectId: "clone-22cc8",
  storageBucket: "clone-22cc8.firebasestorage.app",
  messagingSenderId: "68714090573",
  appId: "1:68714090573:web:24a45f0717599a1d068c04"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();