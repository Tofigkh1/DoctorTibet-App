import { METHOD } from "../../../server/constant/method";
import { ROUTER } from "../../../server/constant/router";
import {
  handlerVideoGET,
  handlerVideoPOST,
} from "../../../server/routes/";

export default async function handler(req, res) {
  // Set CORS headers to allow requests from any origin
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  switch (req.method) {
    case METHOD.GET:
      await handlerVideoGET(req, res, ROUTER.VIDEOS);
      return;
    case METHOD.POST:
      await handlerVideoPOST(req, res, ROUTER.VIDEOS);
      return;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
