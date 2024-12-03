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
import { collection, getDocs } from "firebase/firestore";

if (!admin.apps.length) {

    const serviceAccount = require("./tiensapp-92bab-firebase-adminsdk-lupd3-e002f4f767.json");
    


    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export const storage = admin.storage();
export const firestore = admin.firestore();

export default admin;   


export const checkDiscountCollection = async () => {
    try {
      const discountCollectionRef = collection(firestor, "discount");
      const discountSnapshot = await getDocs(discountCollectionRef);
      return !discountSnapshot.empty; // Koleksiyon varsa true döner
    } catch (error) {
      console.error("Error checking discount collection:", error);
      throw error; // Hata fırlat
    }
  };