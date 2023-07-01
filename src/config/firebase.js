import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBpNzuo3jEt_kA4mTTAe1gf36SJ27gk0aI',
  authDomain: 'fir-training-c8035.firebaseapp.com',
  projectId: 'fir-training-c8035',
  storageBucket: 'fir-training-c8035.appspot.com',
  messagingSenderId: '9181164096',
  appId: '1:9181164096:web:7835c26c1a6b2986a625a5',
  measurementId: 'G-RZDF2KECRL'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
