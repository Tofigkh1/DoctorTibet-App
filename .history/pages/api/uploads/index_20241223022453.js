import { METHOD } from "../../../server/constant/method";
import { ROUTER } from "../../../server/constant/router";

import {
  handlerUploadPOST,
  handlerGetFileURL,
  handlerGetAllVideos,
} from "../../../server/routes/uploads";

export const config = {
  api: {
    bodyParser: false, // Multiparty kullanılacağı için bodyParser kapalı.
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

        // Tüm medya dosyalarını getir
        if (all && all === "true") {
          if (handlerGetAllVideos && typeof handlerGetAllVideos === "function") {
            await handlerGetAllVideos(req, res, folder);
          } else {
            res
              .status(500)
              .json({ error: "handlerGetAllVideos function is not defined" });
          }
        } 
        // Belirli bir dosyanın URL'sini getir
        else if (folder && fileName) {
          if (handlerGetFileURL && typeof handlerGetFileURL === "function") {
            await handlerGetFileURL(req, res, folder, fileName);
          } else {
            res
              .status(500)
              .json({ error: "handlerGetFileURL function is not defined" });
          }
        } 
        // Geçersiz parametre kombinasyonu
        else {
          res
            .status(400)
            .json({
              error:
                "Invalid query parameters. Use folder and fileName to fetch a file, or set all=true to fetch all media.",
            });
        }
        break;

      default:
        res.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error("API Handler Error:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
}
