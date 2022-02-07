// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAK-G5ONpA14_6iKEIYlhRXecdqWAsLZzE",
  authDomain: "grocerylist-3e477.firebaseapp.com",
  projectId: "grocerylist-3e477",
  storageBucket: "grocerylist-3e477.appspot.com",
  messagingSenderId: "790681995873",
  appId: "1:790681995873:web:60b77f3e8ed13c1524f820"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const groceryStoreRef = collection(db, 'grocery-stores');

//get collection data
export const groceryStoreData = getDocs(groceryStoreRef);
