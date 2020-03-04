import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyB93qgcC0--AFXfknEJ_vgQwsGNHvLjoEE",
  authDomain: "engage-booking.firebaseapp.com",
  databaseURL: "https://engage-booking.firebaseio.com",
  projectId: "engage-booking",
  storageBucket: "engage-booking.appspot.com",
  messagingSenderId: "998929368232",
  appId: "1:998929368232:web:ff20a2d676bd3f9876ee9d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var firestore = firebase.firestore();
export { firebase, firestore };