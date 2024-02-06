import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFyEQKxn5m2BHuLa1Dffkd-h5Y1Io-yfA",
  authDomain: "sharehub-245d9.firebaseapp.com",
  projectId: "sharehub-245d9",
  storageBucket: "sharehub-245d9.appspot.com",
  messagingSenderId: "535458723446",
  appId: "1:535458723446:web:54d3a2777d9bef18e69157",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

// Initialize Firestore
const db = getFirestore(app);

export { db, storage };
