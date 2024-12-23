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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Preflight istekleri için 200 dön
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case METHOD.POST:
        if (typeof handlerUploadPOST === "function") {
          // Video ve kapak resmini yüklemek için POST handler çağırılıyor
          await handlerUploadPOST(req, res, ROUTER.UPLOADS);
        } else {
          res
            .status(500)
            .json({ error: "handlerUploadPOST function is not defined" });
        }
        break;

      case METHOD.GET: {
        const { folder, fileName, all } = req.query;

        if (all === "true") {
          if (typeof handlerGetAllVideos === "function") {
            // Tüm videoları ve kapak resimlerini getir
            await handlerGetAllVideos(req, res, folder);
          } else {
            res
              .status(500)
              .json({ error: "handlerGetAllVideos function is not defined" });
          }
        } else if (folder && fileName) {
          if (typeof handlerGetFileURL === "function") {
            // Tek bir dosyanın URL'sini getir
            await handlerGetFileURL(req, res, folder, fileName);
          } else {
            res
              .status(500)
              .json({ error: "handlerGetFileURL function is not defined" });
          }
        } else {
          res
            .status(400)
            .json({ error: "Missing required parameters: folder and fileName, or set all=true" });
        }
        break;
      }

      default:
        res.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
