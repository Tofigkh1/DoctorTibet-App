import admin from "firebase-admin";

if (!admin.apps.length) {

    const serviceAccount = require("./tiensapp-92bab-firebase-adminsdk-lupd3-073fcd1ebe.json");
    


    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export const storage = admin.storage();
export const firestore = admin.firestore();

export default admin;   











// import admin from "firebase-admin";

// if (!admin.apps.length) {

//     const serviceAccount = require("./tiensapp-92bab-firebase-adminsdk-lupd3-073fcd1ebe.json");
    


//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//     });
// }

// export const storage = admin.storage();
// export const firestore = admin.firestore();

// export default admin;   