// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDql29y5T7az4q0ZgZ9-4fvckpxz16goRU",

  authDomain: "infinite-rope-685.firebaseapp.com",

  databaseURL: "https://infinite-rope-685.firebaseio.com",

  projectId: "infinite-rope-685",

  storageBucket: "infinite-rope-685.appspot.com",

  messagingSenderId: "418674668266",

  appId: "1:418674668266:web:b6c23e4ffff14493fa1d93",

  measurementId: "G-HT7J7MDV34"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'sensor1/');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}


// Get a list of cities from your database
getCities(db).then(cityList => {
  console.log(cityList);
});