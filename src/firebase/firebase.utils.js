import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCNkBDv_ICu_FxFqU-5iFltLtpP450y6wY",
  authDomain: "react-firebase-18820.firebaseapp.com",
  databaseURL: "https://react-firebase-18820.firebaseio.com",
  projectId: "react-firebase-18820",
  storageBucket: "react-firebase-18820.appspot.com",
  messagingSenderId: "569947342817",
  appId: "1:569947342817:web:7a36d95b69935f73a0b4a0",
  measurementId: "G-VM9KXY9B2F"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
