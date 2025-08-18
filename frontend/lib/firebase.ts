// firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAjCslVaCsf8jVqBamkrthuwwkNoqxSqzk",
  authDomain: "mockmate-f845c.firebaseapp.com",
  projectId: "mockmate-f845c",
  storageBucket: "mockmate-f845c.firebasestorage.app",
  messagingSenderId: "532800142126",
  appId: "1:532800142126:web:4c4375531ad5db96d4d8bf",
  measurementId: "G-NH3JTBR94H"
};

const app = initializeApp(firebaseConfig);
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics };
