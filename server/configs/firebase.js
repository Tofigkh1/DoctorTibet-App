import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { getFirestore, listCollections, collection, getDocs } from 'firebase/firestore';


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
export const db = getFirestore(app); 

  // export  const storageRef = ref
  export async function getAllCollections() {
    const collectionList = [];
    try {
      const collectionsSnapshot = await listCollections(db);
      for (const collectionRef of collectionsSnapshot) {
        const querySnapshot = await getDocs(collection(db, collectionRef.id));
        const docsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        collectionList.push({ collectionName: collectionRef.id, docsData });
      }
      return collectionList;
    } catch (error) {
      console.error("Error getting collections: ", error);
      return [];
    }
  }