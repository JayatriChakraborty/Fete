
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEBVl3f5TQTYt8VQlepTAao7vPLBx4Gn4",
  authDomain: "fete-event-planner.firebaseapp.com",
  projectId: "fete-event-planner",
  storageBucket: "fete-event-planner.appspot.com",
  messagingSenderId: "503696111891",
  appId: "1:503696111891:web:90155e2cb620a3baa642e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
