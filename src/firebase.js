// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCdlwUgSUx0l52ypRfi6fQbXe-G0PrEOXM",
    authDomain: "filippruskih-portfolio.firebaseapp.com",
    databaseURL: "https://filippruskih-portfolio-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "filippruskih-portfolio",
    storageBucket: "filippruskih-portfolio.firebasestorage.app",
    messagingSenderId: "664452967629",
    appId: "1:664452967629:web:6bb5b75b33a524c3144d84",
    measurementId: "G-TQKF5R161E"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
//const analytics = getAnalytics(app);

export { storage };
