import admin from 'firebase-admin'
import {
  applicationDefault,
  initializeApp as initializeAdminApp,
} from "firebase-admin/app";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCeUsBwp1gzKDwQqorrri7nRlqr_QXtg1g",
  authDomain: "no-tengo-ganas-de-trabajar.firebaseapp.com",
  databaseURL: "https://no-tengo-ganas-de-trabajar.firebaseio.com",
  projectId: "no-tengo-ganas-de-trabajar",
  storageBucket: "no-tengo-ganas-de-trabajar.appspot.com",
  messagingSenderId: "1069878588859",
  appId: "1:1069878588859:web:cf2c3c6b73d88a32"
};

if (!admin.apps.length) {
  initializeAdminApp({
    credential: applicationDefault(),
    databaseURL: "https://no-tengo-ganas-de-trabajar.firebaseio.com",
  });
}

let Firebase;

if (!Firebase?.apps?.length) {
  Firebase = initializeApp(firebaseConfig);
}

const db = admin.database();
const adminAuth = admin.auth();

async function signIn(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
}

async function signUp(email, password) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
}

async function getSessionToken(idToken) {
  const decodedToken = await adminAuth.verifyIdToken(idToken);
  if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
    throw new Error("Recent sign in required");
  }
  const twoWeeks = 60 * 60 * 24 * 14 * 1000;
  return adminAuth.createSessionCookie(idToken, { expiresIn: twoWeeks });
}

async function signOutFirebase() {
  await signOut(getAuth());
}

export { db, signUp, getSessionToken, signOutFirebase, signIn, adminAuth };
