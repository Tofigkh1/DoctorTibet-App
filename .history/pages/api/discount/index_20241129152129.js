import { METHOD } from "../../../server/constant/method";
import { ROUTER } from "../../../server/constant/router";
import {
  handlerAddDiscountPOST,
  handlerDeleteDiscount,
  handlerDiscountsGET,
  handlerUpdateDiscountPUT,
} from "../../../server/r";

export default async function handler(req, res) {
  console.log(req.body);

  // Set CORS headers to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Set other CORS headers as needed (e.g., methods, headers, etc.)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  switch (req.method) {
    case METHOD.GET:
      await handlerDiscountsGET(req, res, ROUTER.DISCOUNTS); // GET request for all discounts
      return;
    case METHOD.POST:
      await handlerAddDiscountPOST(req, res, ROUTER.DISCOUNTS); // POST request to add a discount
      return;
    case METHOD.PUT:
      await handlerUpdateDiscountPUT(req, res, ROUTER.DISCOUNTS); // PUT request to update a discount
      return;
    case METHOD.DELETE:
      await handlerDeleteDiscount(req, res, ROUTER.DISCOUNTS); // DELETE request to delete a discount
      return;
    default:
      res.status(405).end(); // Method Not Allowed
  }
}
