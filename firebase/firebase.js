import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBONvX5084MQ89ww9hOzGmNty2cK4641ZQ",
  authDomain: "recipe-hub-front.firebaseapp.com",
  projectId: "recipe-hub-front",
  storageBucket: "recipe-hub-front.appspot.com",
  messagingSenderId: "356478040766",
  appId: "1:356478040766:web:40b75f8bf9304627e87cef",
  measurementId: "G-HXDTKZD5CE"
};

if( !firebase.apps.length )
  firebase.initializeApp(firebaseConfig);

export default firebase;
// export const db = firebase.firestore();