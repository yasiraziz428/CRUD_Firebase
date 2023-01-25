// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp8Q8VxtEI61AKSf9Go9HA4CvSF0k2JsE",
  authDomain: "web-app-in-firebase.firebaseapp.com",
  projectId: "web-app-in-firebase",
  storageBucket: "web-app-in-firebase.appspot.com",
  messagingSenderId: "324430451036",
  appId: "1:324430451036:web:8fc4467199303f86f17199",
  measurementId: "G-4F4QKXMT9L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

//get collection data (will run once)
// getDocs(colRef)
//   .then((result) => {
//     const books = [];
//     result.docs.forEach((doc) => {
//       let data = doc.data();
//       books.push({ id: doc.id, ...data });
//     });
//     console.log(books);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// get real time collection data whenever a doc changes in a coll
onSnapshot(colRef, (result) => {
  const books = [];
  result.docs.forEach((doc) => {
    let data = doc.data();
    books.push({ id: doc.id, ...data });
  });
  console.log(books);
});

//adding docs
const addForm = document.getElementById("add-form");
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    title: addForm.title.value,
    author: addForm.author.value,
  }).then(() => {
    addForm.reset();
  });
});

//deleting docs
const deleteForm = document.getElementById("delete-form");
deleteForm.addEventListener("submit", (e) => {
  const docRef = doc(db, "books", deleteForm.book_id.value);
  e.preventDefault();
  deleteDoc(docRef)
    .then(() => {
      deleteForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});
