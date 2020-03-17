const admin = require("firebase-admin");
var key = process.env.FIREBASE_KEY;

var app = admin.initializeApp({
  credential: admin.credential.cert({
    "projectId": process.env.FIREBASE_PROJECT_ID,
    "privateKey": key.replace(/\\n/g, '\n'),
    "clientEmail": process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});


const db = app.firestore();

module.exports = { app, db };
