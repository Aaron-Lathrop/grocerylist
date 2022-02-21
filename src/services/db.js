import app from './app';
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore/lite';


// init services
const db = getFirestore(app);

// collection ref
const groceryStoreRef = collection(db, 'grocery-stores');

//get collection data
export const groceryStoreData = getDocs(groceryStoreRef);
