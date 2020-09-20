import firebase from 'firebase';



const firebaseApp = firebase.initializeApp({
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: 'facebook-messenger-clone-sagar.firebaseapp.com',
  databaseURL: 'https://facebook-messenger-clone-sagar.firebaseio.com',
  projectId: 'facebook-messenger-clone-sagar',
  storageBucket: 'facebook-messenger-clone-sagar.appspot.com',
  messagingSenderId: '956092930897',
  appId: '1:956092930897:web:89c9186c7f78c9ed76d170',
  measurementId: 'G-PB2D5PNV7E',
});

const db = firebaseApp.firestore();

export default db;
