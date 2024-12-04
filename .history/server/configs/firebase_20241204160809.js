import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, getCollections } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);


// Koleksiyonları ve Dökümanları Getirme
export async function getAllCollections() {
  const collectionList = [];
  try {
    const collectionsSnapshot = await getCollections(db); // Koleksiyonları alın
    for (const collectionRef of collectionsSnapshot) {
      const querySnapshot = await getDocs(collection(db, collectionRef.id)); // Her koleksiyonun dokümanlarını alın
      const docsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Dokümanları düzenleyin
      collectionList.push({ collectionName: collectionRef.id, docsData }); // Koleksiyon listesine ekleyin
    }
    return collectionList; // Sonuçları döndürün
  } catch (error) {
    console.error("Error getting collections: ", error);
    return [];
  }
}









