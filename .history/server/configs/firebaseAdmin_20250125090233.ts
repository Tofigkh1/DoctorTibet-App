import admin from "firebase-admin";

if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export const storage = admin.storage();
export const firestore = admin.firestore();

export default admin;





  



//-----------------------------------------

//-----------------------------------------




import admin from "firebase-admin";

if (!admin.apps.length) {

    const serviceAccount = require("./tiensapp-92bab-firebase-adminsdk-lupd3-b4351bfca1.json");



    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "tiensapp-92bab.appspot.com"
    });
}

export const storage = admin.storage();
export const firestore = admin.firestore();

export const bucket = admin.storage().bucket(); // Storage işlemleri için Bucket referansı


export default admin;


