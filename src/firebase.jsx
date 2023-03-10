import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_APIKEY,
  authDomain: process.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECTID,
  storageBucket: process.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.VITE_FIREBASE_APPID,
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;
