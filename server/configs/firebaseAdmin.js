import admin from "firebase-admin";

if (!admin.apps.length) {

    const serviceAccount = require("./tiensapp-92bab-firebase-adminsdk-gmgsg-561f9f954a");
    


    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export const storage = admin.storage();
export const firestore = admin.firestore();

export default admin;