import { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';

// Firebase konfigürasyonu
const firebaseConfig = {
    apiKey: "AIzaSyAGh9AFmjbVUl-M0uoqr2cqnVcV5T1k5vM",
    authDomain: "tiensapp-92bab.firebaseapp.com",
    projectId: "tiensapp-92bab",
    storageBucket: "tiensapp-92bab.appspot.com",
    messagingSenderId: "736874346462",
    appId: "1:736874346462:web:88c07df6a0e9978e790f4f"
  };

// Firebase uygulamasını başlatma
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Firestore'dan discount koleksiyonunu kontrol et
    const discountCollectionRef = collection(firestore, 'discount');
    const discountSnapshot = await getDocs(discountCollectionRef);

    // Discount varsa geri gönder
    if (!discountSnapshot.empty) {
      return res.status(200).json({ exists: true });
    }

    // Discount yoksa
    return res.status(200).json({ exists: false });
  } catch (error) {
    console.error('Error checking Firestore discount collection:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
