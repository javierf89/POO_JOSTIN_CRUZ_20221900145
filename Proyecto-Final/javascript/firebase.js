 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
 
 import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 import {getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js"
 const firebaseConfig = {
   apiKey: "AIzaSyDgkrMr_HZ1q2XuMN8mpO5QGzwkSG5VBeU",
   authDomain: "cirtech-d3bdd.firebaseapp.com",
   projectId: "cirtech-d3bdd",
   storageBucket: "cirtech-d3bdd.appspot.com",
   messagingSenderId: "975173974866",
   appId: "1:975173974866:web:17f6ae1d1689253acf588b"
 };

 // Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
 export const firestore = getFirestore(app);

