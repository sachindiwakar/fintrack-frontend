import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1R9K8dpX0d3l6WVwgFTjnTVuw3VH742o",
  authDomain: "fintrack-webapp.firebaseapp.com",
  projectId: "fintrack-webapp",
  storageBucket: "fintrack-webapp.firebasestorage.app",
  messagingSenderId: "789118773421",
  appId: "1:789118773421:web:9aefab56c03a43737cbe24",
  measurementId: "G-TRD7LQCM76",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
