import admin from "firebase-admin";

if (!admin.apps.length) {
    // const serviceAccount = require("./foody-3-firebase-adminsdk-8atpy-6897ff2d7c.json");
    const serviceAccount = require("./tiensapp-92bab-firebase-adminsdk-gmgsg-172b3c51bb.json");
    
    // const serviceAccount = require("./foody-5-firebase-adminsdk-pvv01-e301ba401b.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export const storage = admin.storage();
export const firestore = admin.firestore();

export default admin;