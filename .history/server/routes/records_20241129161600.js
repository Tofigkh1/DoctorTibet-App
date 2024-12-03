import { emptyBasket } from "../constant/basket";
import { ROUTER } from "../constant/router";
import { addData } from "../helper/addData";
import { deleteData } from "../helper/deleteData";
import { getAllData } from "../helper/getAllData";
import { getDataID } from "../helper/getDataID";
import { getQueryData } from "../helper/getQueryData";
import { uptData } from "../helper/uptData";
import { Record } from "../models/Recrods";
import { verifyJWT } from "../utils/jwt";
import { response } from "../utils/response";
import cron from "node-cron";
import { v4 as uuidv4 } from "uuid";

// Handler to add a new record and generate discount if applicable
export async function handlerAddRecordPOST(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);
    const userId = decodedToken.userId;

    const { fullname, email, delivery_address, payment_method, contact, basket_id } = req.body;

    const userBasket = await getDataID("basket", basket_id);

    if (!userBasket || !userBasket.items || userBasket.items.length < 4) {
      return res.status(400).json({ error: "Basket must contain at least 4 items!" });
    }

    // Check if the user already has a discount code
    const existingDiscount = await getQueryData("discount", "userId", userId);

    let discountMessage = "Discount already exists for this user.";
    if (!existingDiscount.length) {
      // Generate a 12-character unique discount code
      const discountCode = uuidv4().replace(/-/g, "").slice(0, 12);

      // Add the discount code to the Firestore database
      await addData("discount", {
        userId,
        discountCode,
        createdAt: new Date(),
      });

      discountMessage = `New discount code created: ${discountCode}`;
      console.log(`Discount code generated for userId ${userId}: ${discountCode}`);
    }

    // 16 gün sonrası için zaman damgası hesapla
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 16);

    const record = new Record(
      userId,
      fullname,
      email,
      delivery_address,
      userBasket.total_amount,
      contact,
      payment_method,
      userBasket.items,
      new Date(),
      expiryDate
    );

    const data = await addData(col, record);

    // Empty the user’s basket after the record is added
    await uptData("basket", basket_id, { items: [] });

    res.status(201).json({
      message: "Record added successfully",
      record: data,
      discount: discountMessage,
    });
  } catch (error) {
    console.log("Error in handlerAddRecordPOST:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
