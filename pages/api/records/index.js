import { METHOD } from "../../../server/constant/method";
import { ROUTER } from "../../../server/constant/router";
import {
  handlerAddRecordPOST,
  handlerDeleteRecord,
  handlerRecordsGET,
  handlerUpdateRecordPUT,
  handlerUserOrderGET,
} from "../../../server/routes/records";

export default async function handler(req, res) {
  console.log(req.body);
  // Set CORS headers to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Set other CORS headers as needed (e.g., methods, headers, etc.)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  switch (req.method) {
    case METHOD.GET:
      await handlerRecordsGET(req, res, ROUTER.RECORDS); // GET request for all records
      return;
    case METHOD.POST:
      await handlerAddRecordPOST(req, res, ROUTER.RECORDS); // POST request to add a record
      return;
    case METHOD.PUT:
      await handlerUpdateRecordPUT(req, res, ROUTER.RECORDS); // PUT request to update a record
      return;
    case METHOD.DELETE:
      await handlerDeleteRecord(req, res, ROUTER.RECORDS); // DELETE request to delete a record
      return;
    default:
      res.status(405).end(); // Method Not Allowed
  }
}
