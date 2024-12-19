import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, getCollections } from 'firebase/firestore';
import { getAnalytics, isSupported } from "firebase/analytics";
import { db } from "./firebase";
// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAGh9AFmjbVUl-M0uoqr2cqnVcV5T1k5vM",
  authDomain: "tiensapp-92bab.firebaseapp.com",
  projectId: "tiensapp-92bab",
  storageBucket: "tiensapp-92bab.appspot.com",
  messagingSenderId: "736874346462",
  appId: "1:736874346462:web:88c07df6a0e9978e790f4f"
};

// Firebase Uygulamasını Başlatma (Tekrarlardan Kaçınma)
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const app2 = getApps().length >0 ? getApps() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const firestore = getFirestore(app);

export let analytics = null;

// Analytics sadece istemci tarafında çalışır
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized");
    } else {
      console.warn("Firebase Analytics is not supported in this environment");
    }
  });
}

// Koleksiyonları ve Dökümanları Getirme
export async function getAllCollectionsData() {
  const COLLECTIONS = ["users", "products", "orders", "messages"]; // Koleksiyon isimleri

  const allData = {};

  try {
    for (const collectionName of COLLECTIONS) {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      allData[collectionName] = docsData; // Veriyi objeye ekle
    }

    return allData; // Tüm koleksiyonlardaki verileri döndür
  } catch (error) {
    console.error("Error fetching collections: ", error);
    return {};
  }
}