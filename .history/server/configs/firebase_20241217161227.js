import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, listCollections } from "firebase/firestore"; // 'listCollections' kullanılacak
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

// Firebase Uygulamasını Başlatma (Tekrarlardan Kaçınma)
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

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
export async function getAllCollections() {
  const collectionList = [];
  try {
    // Firestore'daki koleksiyonları listeleme
    const collections = await listCollections(db);
    for (const collectionRef of collections) {
      // Her koleksiyonun dökümanlarını al
      const querySnapshot = await getDocs(collection(db, collectionRef.id));
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Koleksiyon adı ve dökümanları listeye ekle
      collectionList.push({ collectionName: collectionRef.id, docsData });
    }
    return collectionList;
  } catch (error) {
    console.error("Error getting collections: ", error);
    return [];
  }
}
