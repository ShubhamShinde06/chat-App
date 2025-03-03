import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "ownchat-app.firebaseapp.com",
  projectId: "ownchat-app",
  storageBucket: "ownchat-app.firebasestorage.app",
  messagingSenderId: "34638379410",
  appId: "1:34638379410:web:20f9f5777494fccc16294b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore()