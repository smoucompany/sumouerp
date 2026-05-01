import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager,
  getFirestore 
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3TAalsKz1xsx9wGayGouF6rCbsESX8ik",
  authDomain: "erpsumou-75984.firebaseapp.com",
  projectId: "erpsumou-75984",
  storageBucket: "erpsumou-75984.firebasestorage.app",
  messagingSenderId: "400190472582",
  appId: "1:400190472582:web:e21302d58b0d27e47bec07",
  measurementId: "G-952TCT1V45"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with Persistence
const db = getApps().length > 0 
  ? getFirestore(app) 
  : initializeFirestore(app, {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
    });

const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
