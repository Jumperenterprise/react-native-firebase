import firebase from 'firebase';

import 'firebase/firebase-firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBeqCob4fEUWB5kUhHvapoSsPriwjbZ6Ik",
    authDomain: "basededatos-aquafuncr.firebaseapp.com",
    databaseURL: "https://basededatos-aquafuncr.firebaseio.com",
    projectId: "basededatos-aquafuncr",
    storageBucket: "basededatos-aquafuncr.appspot.com",
    messagingSenderId: "823856248032",
    appId: "1:823856248032:web:8be497857296870a6c8c85"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
    firebase,
    db
};