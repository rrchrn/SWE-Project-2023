// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAUACt8A1yqUPlWWvqOLSpZMqcvZvayTs",
  authDomain: "petconnect-d63fb.firebaseapp.com",
  projectId: "petconnect-d63fb",
  storageBucket: "petconnect-d63fb.appspot.com",
  messagingSenderId: "213899897394",
  appId: "1:213899897394:web:7813ca1d059f889b6c2a2b",
  measurementId: "G-SBRQN1L799"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
    app = initializeApp(firebaseConfig);
}
else{
    app = firebase.app()
}

const auth = firebase.auth()

const analytics = getAnalytics(app);

export{ auth };