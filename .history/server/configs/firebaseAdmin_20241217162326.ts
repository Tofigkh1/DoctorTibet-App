// import admin from "firebase-admin";

// if (!admin.apps.length) {
//     const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string);

//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//     });
// }

// export const storage = admin.storage();
// export const firestore = admin.firestore();

// export default admin;
  



//-----------------------------------------

//-----------------------------------------




import admin from "firebase-admin";

// Firebase Admin SDK'yı başlatın
if (!admin.apps.length) {
  const serviceAccount = require("./path/to/serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const firestore = admin.firestore();

export async function getAllCollections() {
  const collectionsData = {};

  try {
    const collections = await firestore.listCollections(); // Tüm koleksiyonları listele
    for (const collectionRef of collections) {
      const snapshot = await collectionRef.get(); // Her koleksiyonun verilerini çek
      const docsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      collectionsData[collectionRef.id] = docsData; // Koleksiyon verilerini ekle
    }

    return collectionsData;
  } catch (error) {
    console.error("Error getting collections: ", error);
    return {};
  }
}


