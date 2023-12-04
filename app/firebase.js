// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFVE-ntFPobLLZj1NuznnJlGmOBO3sK3Q",
  authDomain: "mycurrent-ebeef.firebaseapp.com",
  projectId: "mycurrent-ebeef",
  storageBucket: "mycurrent-ebeef.appspot.com",
  messagingSenderId: "963426102091",
  appId: "1:963426102091:web:072bd441872692d1f056ce",
  measurementId: "G-N3ET7Y290H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
