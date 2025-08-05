import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCblX3TfPAN13BC2P9wnXW5OOaxn5VdDLg",
  authDomain: "netflix-ask-gpt.firebaseapp.com",
  projectId: "netflix-ask-gpt",
  storageBucket: "netflix-ask-gpt.firebasestorage.app",
  messagingSenderId: "197898634441",
  appId: "1:197898634441:web:47adb17265f9f7534b7918",
  measurementId: "G-J00PLT4H6N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();

export const  signUpWithPassoword = async (email: any,password: any) => {
    createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
    return user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return error;
  });
}

