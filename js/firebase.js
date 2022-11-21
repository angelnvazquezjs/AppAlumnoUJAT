// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA45cZYBlxqrJKuEXBBdwAFOkqsjOE2rmc",
  authDomain: "alumnosproyecto-4572a.firebaseapp.com",
  projectId: "alumnosproyecto-4572a",
  storageBucket: "alumnosproyecto-4572a.appspot.com",
  messagingSenderId: "652685595820",
  appId: "1:652685595820:web:681a9e452d872027b2fb09",
  measurementId: "G-FR5MMWT0DR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore()

export const saveDate = (nombre, apellidoPaterno, apellidoMaterno, carrera, matricula) => {
    addDoc(collection(db, 'alumnos'), {nombre, apellidoPaterno, apellidoMaterno, carrera, matricula});
}

export const listarDatos = () => getDocs(collection(db, 'alumnos'));

export const onGetAlumnos = (callback) => onSnapshot(collection(db, 'alumnos'), callback);

export const deleteAlumnos = id => deleteDoc(doc(db, 'alumnos', id));

export const getALumno = id => getDoc(doc(db, 'alumnos', id));

export const updateAlumno = (id, newFields) => updateDoc(doc(db, 'alumnos', id), newFields); 