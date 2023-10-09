// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcbIwZIfHfhZMrbKEI_-SbgqNg3_J4OhU",
  authDomain: "fir-todo-a69ac.firebaseapp.com",
  projectId: "fir-todo-a69ac",
  storageBucket: "fir-todo-a69ac.appspot.com",
  messagingSenderId: "582838073690",
  appId: "1:582838073690:web:1c75e97ae0a05e9b041b63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;