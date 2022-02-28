import app from './app';
import {
    getFirestore, 
    collection, doc, getDoc, setDoc, updateDoc,
    arrayUnion, arrayRemove
} from 'firebase/firestore/lite';

// init services
const db = getFirestore(app);

//refs
const groceryStoreKey = 'grocery-stores';
const groceryItemsKey = 'grocery-items';

//get collection data
export const getGroceryStores = async (user) => {
    const defaultGroceryStore = [];
    if (!user.uid) {
        return defaultGroceryStore;
    }

    const groceryStoreRef = doc(db, groceryStoreKey, user.uid);
    const docSnap = await getDoc(groceryStoreRef);
    const data = docSnap.data();
    return data ? data.stores : defaultGroceryStore
};

export const getGroceryItems = async (user) => {
    const defaultGroceryItems = [];
    if (!user.uid) {
        return defaultGroceryItems;
    }

    const groceryItemsRef = doc(db, groceryItemsKey, user.uid);
    const docSnap = await getDoc(groceryItemsRef);
    const data = docSnap.data();
    return data ? data.items : defaultGroceryItems;
};

//set collection data
export const withTimestamp = data => {
    if (Array.isArray(data)) {
        return data.map(d => withTimestamp(d));
    }
    else if (typeof data == 'object') {
        return { ...data, timestamp: Date.now() };
    }
};

export const addGroceryStore = async (user, store) => {
    if (!store || !store.name) return;
    if (!user.uid) return;

    const ref = collection(db, groceryStoreKey);
    await setDoc(doc(ref, user.uid), withTimestamp({
        stores: arrayUnion({
            name: store.name,
            sections: store.sections || []
        })
    }),
    { merge: true }
    );
};

export const addGroceryItem = async (user, item) => {
    if (!item || !item.name || !user.uid) return;

    const ref = collection(db, groceryItemsKey);
    await setDoc(doc(ref, user.uid), withTimestamp({
        items: arrayUnion({
            name: item.name,
            gotIt: false
        })
    }),
    { merge: true }
    );
};

export const setGroceryItems = async (user, items) => {
    if (!items || !user.uid) return;

    const ref = collection(db, groceryItemsKey);
    await setDoc(doc(ref, user.uid), withTimestamp({ items }));
};
