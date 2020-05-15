import * as firebase from "firebase/app";
import "firebase";
import { presentToast } from "./components/Toast";

require("dotenv").config();

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const fbase = firebase.initializeApp(config);

export default fbase;

export async function loginUser(userEmail: string, userPassword: string) {
  // Auth with firebase
  try {
    await fbase.auth().signInWithEmailAndPassword(userEmail, userPassword);
    return true;
  } catch (error) {
    presentToast(
      "Email atau Kata Sandi yang kamu masukkan salah. Silakan coba lagi.",
      4000,
      "warning"
    );
    return false;
  }

  // If present, use can access app
  // If not, error
}

export async function logoutUser() {
  try {
    await fbase.auth().signOut();
    presentToast("Anda telah keluar", 2500, "warning");
    return true;
  } catch (error) {
    return false;
  }
}

export async function registerUser(
  name: string,
  userEmail: string,
  userPassword: string
) {
  try {
    await fbase.auth().createUserWithEmailAndPassword(userEmail, userPassword);
    const user = fbase.auth().currentUser;
    user?.updateProfile({
      displayName: name,
    });
    if (user !== null) {
      fbase.database().ref("users").child(user.uid).set({
        id: user.uid,
        email: userEmail,
        name: name,
        level: 0,
      });
    }
    return true;
  } catch (error) {
    // TODO : try to handle error message in localized language
    presentToast(error.message, 4000, "warning");
    return false;
  }
}

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = fbase.auth().onAuthStateChanged(function (user) {
      if (user) {
        resolve(user);
        return true;
      }
      resolve(null);
      unsubscribe();
      return false;
    });
  });
}

export function getCurrentUserProfileName() {
  const user = fbase.auth().currentUser;
  if (user) {
    return user.displayName;
  } else {
    return "Belum Login";
  }
}

export function updateUserLearnProgress(
  subModuleId: string,
  chapterId: string,
  score: number,
  streak: number
) {
  const user = fbase.auth().currentUser;
  if (user !== null) {
    fbase.database().ref("users").child(user.uid).child("progress").push({
      subModuleId: subModuleId,
      chapterId: chapterId,
      score: score,
    });
    fbase.database().ref("users").child(user.uid).child("streaks").set({
      lastStreak: streak,
      newBestStreak: streak,
      prevStreak: streak,
    });
  }
}
