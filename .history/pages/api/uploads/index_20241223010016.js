import { METHOD } from "../../../server/constant/method";
import { ROUTER } from "../../../server/constant/router";

import {
  handlerUploadPOST,
  handlerGetFileURL,
  handlerGetAllVideos,
} from "../../../server/routes/uploads";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  switch (req.method) {
    case METHOD.POST:
      await handlerUploadPOST(req, res, ROUTER.UPLOADS);
      break;

    case METHOD.GET:
      const { folder, all } = req.query;

      if (all && all === "true") {
        await handlerGetAllVideos(req, res, folder);
      } else {
        res.status(400).json({ error: "Invalid query parameters" });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
