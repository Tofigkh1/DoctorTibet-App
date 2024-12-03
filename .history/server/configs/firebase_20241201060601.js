// Firebase Client SDK importları
import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { getFirestore as getClientFirestore, collection, getDocs } from 'firebase/firestore';  // Firebase Client SDK'dan getFirestore
import { firestore as adminFirestore } from "firebase-admin";  // Firebase Admin SDK'dan firestore
import { getFirestore as getAdminFirestore, collection as adminCollection, getDocs as adminGetDocs } from "firebase-admin/firestore"; // Firebase Admin SDK için firestore

// Firebase Admin SDK'yı başlatma
import { initializeApp as initializeAdminApp, applicationDefault } from "firebase-admin/app";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAGh9AFmjbVUl-M0uoqr2cqnVcV5T1k5vM",
  authDomain: "tiensapp-92bab.firebaseapp.com",
  projectId: "tiensapp-92bab",
  storageBucket: "tiensapp-92bab.appspot.com",
  messagingSenderId: "736874346462",
  appId: "1:736874346462:web:88c07df6a0e9978e790f4f"
};

// Firebase Client SDK Başlatma (Tekrarlardan Kaçınma)
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const app2 = getApps().length > 0 ? getApps() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getClientFirestore(app); // Firebase Client SDK'nın getFirestore fonksiyonu kullanıldı

// Firebase Admin SDK Başlatma
if (!adminFirestore.apps.length) {
  initializeAdminApp({
    credential: applicationDefault(),
  });
}
const adminDb = getAdminFirestore();  // Firebase Admin SDK'dan firestore alındı

// Koleksiyonları ve Dökümanları Getirme (Client tarafında)
export async function getAllCollections() {
  const collectionList = [];
  try {
    const collectionsSnapshot = await getDocs(collection(db, "discount")); // Client tarafında Firestore verisi alınır
    collectionsSnapshot.forEach((doc) => {
      collectionList.push({ id: doc.id, ...doc.data() });
    });
    return collectionList;
  } catch (error) {
    console.error("Error getting collections: ", error);
    return [];
  }
}

// API Route için Firebase Admin SDK kullanımı
export default async function handler(req, res) {
  try {
    const discountCollectionRef = adminCollection(adminDb, 'discount');
    const discountSnapshot = await adminGetDocs(discountCollectionRef);

    res.status(200).json({
      discountSnapshot: discountSnapshot.empty
        ? []
        : discountSnapshot.docs.map(doc => doc.data())
    });
  } catch (error) {
    console.error("Error accessing Firestore:", error);
    res.status(500).json({ error: 'Failed to access Firestore' });
  }
}
