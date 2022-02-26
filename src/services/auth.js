//https://firebase.google.com/docs/auth/web/password-auth
import app from './app';
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { checkedForLogin, user } from '../store/stores';

const auth = getAuth(app);

export const checkLoggedIn = () => new Promise((resolve, reject) => {
    try {
        auth.onAuthStateChanged((loggedInUser) => {
            if (loggedInUser) {
                user.set(loggedInUser);
            }
            checkedForLogin.set(true);
        });
        resolve(true);
    } catch (error) {
        reject(error);
    }
});

export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        user.set(userCredential.user)
        return user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });

export const logInUser = (email, password) => signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        user.set(userCredential.user)
        return user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage)
    });

export const logOutUser = () => signOut(auth)
    .then(() => {
        // Sign-out successful.
        user.set({});
    }).catch((error) => {
        // An error happened.
        console.error(error);
    });