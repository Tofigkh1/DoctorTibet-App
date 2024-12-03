import { v4 as uuidv4 } from "uuid";
import { addData } from "../helper/addData";
import { getDataID } from "../helper/getDataID";
import { getAllData } from "../helper/getAllData";
import { deleteData } from "../helper/deleteData";
import { uptData } from "../helper/uptData";
import { verifyJWT } from "../utils/jwt";
import { response } from "../utils/response";

export async function handlerDiscountRecords(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = verifyJWT(idToken);
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const userId = decodedToken.userId;

  switch (req.method) {
    case "POST":
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
      break;

    case "GET":
      try {
        const records = await getAllData(col);
        const userRecords = records.filter(record => record.userId === userId);
        res.status(200).json(response(userRecords));
      } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
      }
      break;

    case "PUT":
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
      break;

    case "DELETE":
      try {
        const { record_id } = req.body;

        await deleteData(col, record_id);

        res.status(204).json({ message: "Record deleted successfully", record_id });
      } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
