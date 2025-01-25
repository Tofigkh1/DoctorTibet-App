import admin from "../../../server/configs/firebaseAdmin";
import { ROUTER } from "../../../server/constant/router";
import { addData } from "../../../server/helper/addData";
import { getQueryData } from "../../../server/helper/getQueryData";
import { enableCors } from "../../../server/utils/enableCors";
import { generateJWT, generateRefreshToken } from "../../../server/utils/jwt";
import { comparePasswords } from "../../../server/utils/passwordHash";

async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ hello: "hey" });
  }

  if (req.method === "POST") {
    const { email, phoneNumber, password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    if (!email && !phoneNumber) {
      return res.status(400).json({ error: "Either email or phoneNumber is required" });
    }

    try {
      let userCredentials;

      if (email) {
        // Kullanıcı email ile giriş yapıyorsa
        userCredentials = await admin.auth().getUserByEmail(email);
      } else if (phoneNumber) {
        // Kullanıcı phoneNumber ile giriş yapıyorsa
        userCredentials = await admin.auth().getUserByPhoneNumber(phoneNumber);
      }

      if (!userCredentials) {
        return res.status(404).json({ error: "User not found" });
      }

      // Kullanıcının email adresi ile veritabanında bilgilerini al
      const queryField = email ? "email" : "phoneNumber";
      const queryValue = email || phoneNumber;

      const userInfo = await getQueryData(
        ROUTER.USERS_HASH_PASSWORD,
        queryField,
        queryValue
      );

      if (!userInfo || userInfo.length === 0) {
        return res.status(404).json({ error: "User password not found" });
      }

      const isPasswordCorrect = await comparePasswords(
        password,
        userInfo[0].password
      );

      if (!isPasswordCorrect) {
        return res
          .status(404)
          .json({ error: "Password or email/phone is not correct" });
      }

      const access_token = generateJWT(userCredentials.uid);
      const refresh_token = generateRefreshToken(userCredentials.uid);

      const card = await getQueryData(
        ROUTER.CARD,
        "user_id",
        userCredentials.uid
      );

      const userCard = card?.[0];

      if (!userCard) {
        await addData(ROUTER.CARD, {
          items: [],
          user_id: userCredentials.uid,
          total_amount: 0,
          total_item: 0,
        });
      }

      const user = {
        id: userCredentials.uid,
        email: userCredentials.email || null,
        phoneNumber: userCredentials.phoneNumber || null,
        ...userCredentials.customClaims,
        access_token,
        refresh_token,
      };

      res.status(200).json({
        message: "User signed in successfully",
        user,
      });
    } catch (error) {
      console.error("Error signing in:", error);
      res.status(401).json({ error: `Could not sign in: ${error.message}` });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

export default enableCors(handler);
