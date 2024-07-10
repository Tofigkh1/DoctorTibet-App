import { initializeApp } from "firebase/app";
import { getStorage,ref } from "firebase/storage";
import { getAuth } from 'firebase/auth';




const firebaseConfig = {
  apiKey: "AIzaSyAGh9AFmjbVUl-M0uoqr2cqnVcV5T1k5vM",
  authDomain: "tiensapp-92bab.firebaseapp.com",
  projectId: "tiensapp-92bab",
  storageBucket: "tiensapp-92bab.appspot.com",
  messagingSenderId: "736874346462",
  appId: "1:736874346462:web:88c07df6a0e9978e790f4f"
};

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  
  export const storage = getStorage(app);
  export  const storageRef = ref