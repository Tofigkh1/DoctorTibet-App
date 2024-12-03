import { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';

// Firebase konfigürasyonu
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
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
