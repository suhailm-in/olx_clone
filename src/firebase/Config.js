import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCW7CyydaGmozYA_tXWZCIXX41YIaaWJTg",
  authDomain: "olx-app-87e41.firebaseapp.com",
  projectId: "olx-app-87e41",
  storageBucket: "olx-app-87e41.firebasestorage.app",
  messagingSenderId: "872656521943",
  appId: "1:872656521943:web:342b811b0fd4770d89fe92",
  measurementId: "G-PEPQMJ87NS"
};

export const Firebase = firebase.initializeApp(firebaseConfig);