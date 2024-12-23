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

  // OPTIONS (Preflight) isteği için erken dönüş yap
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // HTTP Method kontrolü
    switch (req.method) {
      case METHOD.POST:
        if (typeof handlerUploadPOST === "function") {
          await handlerUploadPOST(req, res, ROUTER.UPLOADS);
        } else {
          throw new Error("handlerUploadPOST function is not defined");
        }
        break;

      case METHOD.GET:
        const { folder, fileName, all } = req.query;

        if (all === "true") {
          // Tüm videoları getir
          if (typeof handlerGetAllVideos === "function") {
            await handlerGetAllVideos(req, res, folder);
          } else {
            throw new Error("handlerGetAllVideos function is not defined");
          }
        } else if (folder && fileName) {
          // Tek bir dosyanın (video veya kapak resmi) URL'sini getir
          if (typeof handlerGetFileURL === "function") {
            await handlerGetFileURL(req, res, folder, fileName);
          } else {
            throw new Error("handlerGetFileURL function is not defined");
          }
        } else {
          res.status(400).json({
            error: "Missing required parameters: folder and fileName, or set all=true",
          });
        }
        break;

      default:
        res.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error("API handler error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}
