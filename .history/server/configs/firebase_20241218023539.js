import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAGh9AFmjbVUl-M0uoqr2cqnVcV5T1k5vM",
  authDomain: "tiensapp-92bab.firebaseapp.com",
  projectId: "tiensapp-92bab",
  storageBucket: "tiensapp-92bab.appspot.com",
  messagingSenderId: "736874346462",
  appId: "1:736874346462:web:88c07df6a0e9978e790f4f",
};

// Firebase App Initialization
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const storage = getStorage(app);
export const fileStorage = storage; // Eklenen kısım
export const db = getFirestore(app);

export let analytics = null;

// Analytics Initialization
if (typeof window !== "undefined") {
  (async () => {
    const supported = await isSupported();
    if (supported) {
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized");
    } else {
      console.warn("Firebase Analytics is not supported in this environment");
    }
  })();
}

// Get All Collections and Documents
export async function getAllCollections() {
  const collectionNames = ["collection1", "collection2", "collection3"]; // Koleksiyon adlarını manuel olarak listeleyin
  const collectionList = [];

  try {
    for (const collectionName of collectionNames) {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      collectionList.push({ collectionName, docsData });
    }
    return collectionList;
  } catch (error) {
    console.error("Error getting collections: ", error);
    return [];
  }
}
