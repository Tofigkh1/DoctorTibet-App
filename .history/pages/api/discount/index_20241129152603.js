import { handlerAddDiscountPOST } from "../../../server/routes/discount";
import { handlerGetDiscountGET } from "../../../server/routes/discount";
import { handlerUpdateDiscountPUT } from "../../../server/routes/discount";
import { handlerDeleteDiscountDELETE } from "../../../server/routes/discount";

const COLLECTION = "discount";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await handlerAddDiscountPOST(req, res, COLLECTION);
      break;
    case "GET":
      await handlerGetDiscountGET(req, res, COLLECTION);
      break;
    case "PUT":
      await handlerUpdateDiscountPUT(req, res, COLLECTION);
      break;
    case "DELETE":
      await handlerDeleteDiscountDELETE(req, res, COLLECTION);
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
