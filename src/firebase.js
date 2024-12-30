import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBqO5PzhwZEcU0ZuYCdQGfTxsyLCKXbOTE",
  authDomain: "water-app-92ae1.firebaseapp.com",
  projectId: "water-app-92ae1",
  storageBucket: "water-app-92ae1.firebasestorage.app",
  messagingSenderId: "183642682265",
  appId: "1:183642682265:web:4914fcd8f7cdede0ddd908",
  measurementId: "G-5DXDD700MX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
