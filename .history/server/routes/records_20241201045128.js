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

// Handler to get all records
export async function handlerRecordsGET(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const records = await getAllData(col);

    const formattedRecords = records.map(record => ({
      ...record,
      fullname: record.fullname,
      email: record.email,
      delivery_address: record.delivery_address,
      date: record.date,
    }));

    res.status(200).json(response(formattedRecords));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Handler to get records history
export async function handlerRecordsHistoryGET(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const histories = await getAllData(col);

    const formattedHistories = histories.map(history => ({
      ...history,
      fullname: history.fullname,
      email: history.email,
      delivery_address: history.delivery_address,
      date: history.date,
    }));

    res.status(200).json(response(formattedHistories));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Handler to get user-specific records
export async function handlerUserRecordGET(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);
    const records = await getQueryData(col, "userId", decodedToken.userId);

    const formattedRecords = records.map(record => ({
      ...record,
      fullname: record.fullname,
      email: record.email,
      delivery_address: record.delivery_address,
      date: record.date,
    }));

    res.status(200).json(response(formattedRecords));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Handler to add a new record and generate discount if applicable
// Handler to add a new record and manage discounts
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

    // Fetch user's basket data
    const userBasket = await getDataID("basket", basket_id);
    console.log("userBasket",userBasket);
    

    if (!userBasket || !userBasket.items || userBasket.items.length === 0) {
      return res.status(400).json({ error: "Basket must contain at least 1 item!" });
    }

    // Fetch existing records and discount data for the user
    const existingRecord = await getQueryData(ROUTER.RECORDS, "userId", userId);
    const noDiscountData = await getQueryData("noDiscount", "userId", userId);
    const hasExistingDiscount = noDiscountData.some(item => item.hasDiscount === true);

    // If user already has a "noDiscount" entry, delete related "discount" data
    if (noDiscountData.length > 0) {
      const userDiscounts = await getQueryData("discount", "userId", userId);

      for (const discount of userDiscounts) {
        await deleteData("discount", discount.id);
        console.log(`Deleted discount code with ID ${discount.id} for userId ${userId}`);
      }
    }

    let discountMessage = "No discount code created.";

    // Create discount code if applicable
    if (userBasket.items.length >= 4 && !existingRecord.length && !hasExistingDiscount) {
      const discountCode = uuidv4().replace(/-/g, "").slice(0, 12);

      // Add discount code to "discount" collection
      await addData("discount", {
        userId,
        discountCode,
        createdAt: new Date(),
      });

      // Update or add to "noDiscount" collection
      if (noDiscountData.length === 0) {
        await addData("noDiscount", {
          userId,
          hasDiscount: true,
          createdAt: new Date(),
        });
      } else {
        await uptData("noDiscount", noDiscountData[0].id, { hasDiscount: true });
      }

      discountMessage = `New discount code created: ${discountCode}`;
      console.log(`Discount code generated for userId ${userId}: ${discountCode}`);
    } else {
      console.log(`UserId ${userId} already has a discount. No new discount code generated.`);
    }

    // Set expiry date for 16 days later
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
      expiryDate,
    );

    const data = await addData(col, record);

    // Clear basket and reset total_amount and total_count
    await uptData("basket", basket_id, { 
      items: [], 
      total_amount: 0, // Reset total amount
      total_count: 0  // Reset total count if applicable
    });

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





// Handler to update a record
export async function handlerUpdateRecordPUT(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);

    const { record_id, fullname, email, delivery_address, payment_method, contact, basket_id } = req.body;

    const userBasket = await getDataID("basket", basket_id);

    if (!userBasket.items.length) {
      return res.status(404).json({ error: "Basket is empty!" });
    }

    const updatedRecord = new Record(
      decodedToken.userId,
      fullname,
      email,
      delivery_address,
      userBasket.total_amount,
      userBasket.total_amount,
      contact,
      payment_method,
      userBasket.items,
      new Date()
    );

    await uptData(col, record_id, updatedRecord.toPlainObject());

    res.status(200).json({ message: "Record updated successfully", record_id });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Handler to delete a record
export async function handlerDeleteRecord(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { record_id } = req.body;

    const record = await getDataID(ROUTER.RECORDS, record_id);

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    await addData(ROUTER.RECORDS_HISTORY, record);

    await deleteData(col, record_id);
    res.status(204).json({ message: "Record deleted successfully", record_id });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Her gece yarısı 00:00'da çalışacak cron job
cron.schedule("0 0 * * *", async () => {
  try {
    const currentDate = new Date();
    // Süresi dolmuş kayıtları veritabanından getir
    const expiredRecords = await getQueryData(ROUTER.RECORDS, "expiryDate", { $lt: currentDate });

    // Süresi dolmuş kayıtları sil
    for (const record of expiredRecords) {
      await deleteData(ROUTER.RECORDS, record.id);
      console.log(`Record with ID ${record.id} has been deleted.`);
    }
  } catch (error) {
    console.error("Error deleting expired records:", error);
  }
});
