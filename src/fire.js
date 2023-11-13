import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const  firebaseConfig = {
  apiKey: "AIzaSyBjLpbheoa7mBG36bQPVZ9VlbYhRINRBL8",
  authDomain: "registro-en-react.firebaseapp.com",
  projectId: "registro-en-react",
  storageBucket: "registro-en-react.appspot.com",
  messagingSenderId: "634716756682",
  appId: "1:634716756682:web:cb64f8618ec68a5c82f233"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
