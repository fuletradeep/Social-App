import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyB9tKuY9J1ymRqoM9yJANF510cN9qoIXUY",
    authDomain: "socialapp-ca08a.firebaseapp.com",
    projectId: "socialapp-ca08a",
    storageBucket: "socialapp-ca08a.appspot.com",
    messagingSenderId: "872052438514",
    appId: "1:872052438514:web:5512eceba49dd090f1e76b",
    measurementId: "G-4YWHKY5CPQ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.firestore();
  firebase.firestore().settings({ experimentalForceLongPolling: true });

  export default firebase;