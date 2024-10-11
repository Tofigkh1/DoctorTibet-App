import { METHOD } from "../../../server/constant/method";
import { ROUTER } from "../../../server/constant/router";
import {
  handlerAddOrderPOST,
  handlerDeleteOrder,
  handlerOrderGET,
} from "../../../server/routes/order";

export default async function handler(req, res) {
  console.log(req.body);

  // Set CORS headers to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Handle pre-flight CORS request
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case METHOD.GET:
        await handlerOrderGET(req, res, ROUTER.ORDER);
        break;
      case METHOD.POST:
        await handlerAddOrderPOST(req, res, ROUTER.ORDER); // POST işleminde order ekle
        break;
      case METHOD.DELETE:
        await handlerDeleteOrder(req, res, ROUTER.ORDER); // DELETE işleminde order sil
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
