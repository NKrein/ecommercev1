import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDgYpHUr3eq71y_3HKD0yazCQ4BQqVoUiQ",
  authDomain: "dharmatienda-8009b.firebaseapp.com",
  projectId: "dharmatienda-8009b",
  storageBucket: "dharmatienda-8009b.appspot.com",
  messagingSenderId: "333571628022",
  appId: "1:333571628022:web:acf4d6729c92fd4094c5d7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const getFirebase = () => {
  return app;
}

export const getFirestore = () => {
  return firebase.firestore(app);
}

export const getStorage = () => {
  return firebase.storage();
}

//Auth Config

export const auth = () => {
  return app.auth();
}
