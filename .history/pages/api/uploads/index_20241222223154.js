import { handlerUploadPOST } from "../../../server/routes/uploads";
import { METHOD } from "../../../server/constant/method";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  switch (req.method) {
    case METHOD.POST:
      await handlerUploadPOST(req, res, "uploads");
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
