// import admin from "firebase-admin";
//
// if (!admin.apps.length) {
//     const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string);
//
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//     });
// }
//
// export const storage = admin.storage();
// export const firestore = admin.firestore();
//
// export default admin;




const handleCheckboxChange = async (item) => {
    // Alanları kontrol ediyoruz
    const updatedFormData = {
      ...item,
      order_start: item.order_start ? item.order_start.slice(0, 5) : "",
      order_stop: item.order_stop ? item.order_stop.slice(0, 5) : "",
      show_on_qr: !item.show_on_qr,
    };
  
    try {
      await axios.put(
        `${base_url}/stocks/${item.id}`,
        updatedFormData,
        getAuthHeaders()
      );
      setItems(
        items.map((i) =>
          i.id === item.id ? { ...i, show_on_qr: !i.show_on_qr } : i
        )
      );
    } catch (error) {
      console.error("Error updating item", error);
    }
  };
  



//-----------------------------------------

//-----------------------------------------




import admin from "firebase-admin";

if (!admin.apps.length) {

    const serviceAccount = require("./tiensapp-92bab-firebase-adminsdk-lupd3-e002f4f767.json");



    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "tiensapp-92bab.appspot.com"
    });
}

export const storage = admin.storage();
export const firestore = admin.firestore();

export const bucket = admin.storage().bucket(); // Storage işlemleri için Bucket referansı


export default admin;


