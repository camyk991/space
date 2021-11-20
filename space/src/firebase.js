// Import the functions you need from the SDKs you need
import {useState, useEffect} from "react"
import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHmVv6WzggHpsqCH8yLOh9LG9JbI1IIDI",
  authDomain: "space-250ad.firebaseapp.com",
  projectId: "space-250ad",
  storageBucket: "space-250ad.appspot.com",
  messagingSenderId: "635984299427",
  appId: "1:635984299427:web:5ab7f7fd232d5dddd60616"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function logout() {
    return signOut(auth)
}

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function useAuth(){
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
        return unsub;
    }, [])

    return currentUser;
}