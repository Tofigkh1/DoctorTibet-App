import { v4 as uuidv4 } from "uuid";
import { addData } from "../helper/addData";
import { getDataID } from "../helper/getDataID";
import { getAllData } from "../helper/getAllData";
import { deleteData } from "../helper/deleteData";
import { uptData } from "../helper/uptData";
import { verifyJWT } from "../utils/jwt";
import { response } from "../utils/response";

// Authorization Middleware
async function verifyUser(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];
  try {
    const decodedToken = verifyJWT(idToken);
    return decodedToken.userId; // Return userId
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
    return null; // Return null if verification fails
  }
}

// POST: Add Discount Record
export async function handlerAddDiscountPOST(req, res, col) {
  const userId = await verifyUser(req, res);
  if (!userId) return;

  try {
    const { fullname, email, delivery_address, payment_method, contact, basket_id } = req.body;

    const userBasket = await getDataID("basket", basket_id);

    if (!userBasket || userBasket.items.length === 0) {
      return res.status(400).json({ error: "Basket is empty or invalid" });
    }

    if (userBasket.items.length >= 4) {
      const userDiscount = await getDataID("discount", userId);

      if (!userDiscount) {
        const discountCode = uuidv4().replace(/-/g, "").slice(0, 12);

        await addData("discount", {
          userId,
          discountCode,
          createdAt: new Date(),
        });
      }
    }

    const record = {
      userId,
      fullname,
      email,
      delivery_address,
      total_amount: userBasket.total_amount,
      contact,
      payment_method,
      items: userBasket.items,
      date: new Date(),
    };

    const newRecord = await addData(col, record);
    res.status(201).json({ message: "Record created successfully", newRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// GET: Retrieve Discount Records
export async function handlerGetDiscountGET(req, res, col) {
  const userId = await verifyUser(req, res);
  if (!userId) return;

  try {
    const records = await getAllData(col);
    const userRecords = records.filter(record => record.userId === userId);
    res.status(200).json(response(userRecords));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// PUT: Update Discount Record
export async function handlerUpdateDiscountPUT(req, res, col) {
  const userId = await verifyUser(req, res);
  if (!userId) return;

  try {
    const { record_id, fullname, email, delivery_address, payment_method, contact } = req.body;

    const updatedRecord = {
      fullname,
      email,
      delivery_address,
      payment_method,
      contact,
      updatedAt: new Date(),
    };

    await uptData(col, record_id, updatedRecord);

    res.status(200).json({ message: "Record updated successfully", record_id });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// DELETE: Remove Discount Record
export async function handlerDeleteDiscountDELETE(req, res, col) {
  const userId = await verifyUser(req, res);
  if (!userId) return;

  try {
    const { record_id } = req.body;

    await deleteData(col, record_id);

    res.status(204).json({ message: "Record deleted successfully", record_id });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
