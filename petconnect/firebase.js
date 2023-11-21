// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

//import * as firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmBeS2EPMSBwQho2PC4JFDkIZm1LCu-Uk",
  authDomain: "petconnect-400e8.firebaseapp.com",
  projectId: "petconnect-400e8",
  storageBucket: "petconnect-400e8.appspot.com",
  messagingSenderId: "585634354524",
  appId: "1:585634354524:web:5aace81be2b2beea619d99",
  measurementId: "G-2Z6BC8WBDP"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();

export {auth};