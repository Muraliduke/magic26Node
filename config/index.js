const firebase = require('firebase')
const firebaseConfig = {
  apiKey: "AIzaSyA2iX1b15xwVQDwSYA2Za6-0w5uJmG7bt0",
  authDomain: "magic26ph2-1b3a1.firebaseapp.com",
  projectId: "magic26ph2-1b3a1",
  storageBucket: "magic26ph2-1b3a1.appspot.com",
  messagingSenderId: "39998403323",
  appId: "1:39998403323:web:565cfa4c801839ad8b765e"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db= firebase.firestore();
const User = db.collection('users')

module.exports= User