import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBwxnDmA_IK3626zvalPRRQgkFRVPJVX2c",
  authDomain: "cs1660-spring2025-mdn29.firebaseapp.com",
  projectId: "cs1660-spring2025-mdn29",
  storageBucket: "cs1660-spring2025-mdn29.appspot.com",
  messagingSenderId: "111147801991",
  appId: "1:111147801991:web:833999f593c0076925c722"
};

// prevent duplicate init
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
