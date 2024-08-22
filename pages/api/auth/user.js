import admin from "../../../server/configs/firebaseAdmin";
import { verifyJWT } from "../../../server/utils/jwt";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Set other CORS headers as needed (e.g., methods, headers, etc.)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];
  const decodedToken = verifyJWT(idToken);

  if (req.method === "GET") {
    try {
      const userCredentials = await admin.auth().getUser(decodedToken.userId);

      const user = {
        id: userCredentials.uid,
        email: userCredentials.email,
        username: userCredentials.customClaims.username,
        fullname: userCredentials.displayName,
        phone: userCredentials.phoneNumber,
        address: userCredentials.customClaims.address,
        creationTime: userCredentials.metadata.creationTime,
      };

      return res.status(200).json({ message: "Authenticated!", user });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: "Could not sign in" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { email, username, fullname, phone, address } = req.body ?? {};

      if (!email || !username || !fullname || !phone || !address) {
        return res.status(400).json({ error: "Please fill all fields" });
      }

      const updateUser = {
        email,
        displayName: fullname,
      };

      const customClaims = {
        username,
        fullname,
        phone,
        address,
      };

      await admin.auth().updateUser(decodedToken.userId, updateUser);

      // Update custom claims for the user
      await admin.auth().setCustomUserClaims(decodedToken.userId, customClaims);

      return res.status(200).json({
        message: "Updated user!",
        user: { ...updateUser, id: decodedToken.userId, ...customClaims },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Could not update user" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
