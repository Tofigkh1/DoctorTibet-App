import { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../server/configs/firebaseAdmin'; // Firestore config dosyanızın yolu

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const discountCollectionRef = collection(firestore, 'discount');
    const discountSnapshot = await getDocs(discountCollectionRef);

    const discounts = discountSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({ success: true, discounts });
  } catch (error) {
    console.error("Error fetching discount collection:", error);
    return res.status(500).json({ success: false, error: 'Failed to fetch discount collection' });
  }
}
