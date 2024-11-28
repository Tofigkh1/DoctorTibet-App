import admin from "../../../server/configs/firebaseAdmin";
import { ROUTER } from "../../../server/constant/router";
import { addData } from "../../../server/helper/addData";
import { enableCors } from "../../../server/utils/enableCors";
import { passwordHash } from "../../../server/utils/passwordHash";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, username, fullname, phoneNumber } = req.body ?? {};
    try {
      const hashPassword = await passwordHash(password);

      // Kullanıcı bilgilerini oluştur
      const userInfo = {
        ...(email && { email }), // E-posta varsa ekle
        password: hashPassword,
        phoneNumber,
      };

      const customClaims = {
        username,
        fullname,
      };

      // Firebase Authentication kullanıcısını oluştur
      const userRecord = await admin.auth().createUser(userInfo);
      await admin.auth().setCustomUserClaims(userRecord.uid, customClaims);

      // Kullanıcı bilgilerini veritabanına ekle
      const addPassword = await addData(ROUTER.USERS_HASH_PASSWORD, {
        ...userInfo,
        email: email || null, // Eğer e-posta yoksa null olarak kaydet
      });

      const user = {
        id: userRecord.uid,
        ...customClaims,
        ...addPassword,
      };

      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({
        error:
          "Could not create user! The password must be a string with at least 6 characters.",
      });
    }
  }
}

export default enableCors(handler);
