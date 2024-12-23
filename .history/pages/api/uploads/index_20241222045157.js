import { METHOD } from "../../../server/constant/method";
import { ROUTER } from "../../../server/constant/router";

import {
  handlerUploadPOST,
  handlerGetFileURL,
  handlerGetAllVideos,
} from "../../../server/routes/uploads";

export const config = {
  api: {
    bodyParser: false, // Body parse işlemi devre dışı bırakıldı, çünkü multiparty kullanılıyor.
  },
};

export default async function handler(req, res) {
  // CORS ayarları
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Preflight istekleri için 200 dön
    res.status(200).end();
    return;
  }

  switch (req.method) {
    case METHOD.POST:
     
      if (handlerUploadPOST && typeof handlerUploadPOST === "function") {
        await handlerUploadPOST(req, res, ROUTER.UPLOADS);
      } else {
        res
          .status(500)
          .json({ error: "handlerUploadPOST function is not defined" });
      }
      break;

    case METHOD.GET:
      const { folder, fileName, all } = req.query;

      if (all && all === "true") {
        if (handlerGetAllVideos && typeof handlerGetAllVideos === "function") {
          await handlerGetAllVideos(req, res, folder);
        } else {
          res
            .status(500)
            .json({ error: "handlerGetAllVideos function is not defined" });
        }
      } 
      // Tek bir dosyanın (video veya kapak resmi) URL'sini getir
      else if (folder && fileName) {
        if (handlerGetFileURL && typeof handlerGetFileURL === "function") {
          await handlerGetFileURL(req, res, folder, fileName);
        } else {
          res
            .status(500)
            .json({ error: "handlerGetFileURL function is not defined" });
        }
      } 
   
      else {
        res
          .status(400)
          .json({ error: "Missing required parameters: folder and fileName, or set all=true" });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
