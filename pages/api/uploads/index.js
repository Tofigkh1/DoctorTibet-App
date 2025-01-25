import { METHOD } from "../../../server/constant/method";
import { ROUTER } from "../../../server/constant/router";

import {
  handlerUploadPOST,
  handlerGetFileURL,
  handlerGetAllVideos,
  handlerGetVideosCollection, // Yeni eklenen fonksiyon
} from "../../../server/routes/uploads";

export const config = {
  api: {
    bodyParser: false, // multiparty kullanıldığı için bodyParser devre dışı bırakıldı
  },
};

export default async function handler(req, res) {
  try {
    // CORS ayarları
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Preflight istekleri için hızlı bir yanıt döndür
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    // API metotlarına göre yönlendirme
    switch (req.method) {
      case METHOD.POST:
        if (typeof handlerUploadPOST === "function") {
          await handlerUploadPOST(req, res, ROUTER.UPLOADS);
        } else {
          res
              .status(500)
              .json({ error: "handlerUploadPOST function is not defined" });
        }
        break;

      case METHOD.GET: {
        const { folder, fileName, all, fromCollection } = req.query;

        if (fromCollection === "true") {
          // Firestore'dan veri çekmek için yeni rota
          if (typeof handlerGetVideosCollection === "function") {
            await handlerGetVideosCollection(req, res);
          } else {
            res
                .status(500)
                .json({ error: "handlerGetVideosCollection function is not defined" });
          }
        } else if (all === "true") {
          // Tüm dosyaların listesi isteniyor
          if (typeof handlerGetAllVideos === "function") {
            await handlerGetAllVideos(req, res, folder);
          } else {
            res
                .status(500)
                .json({ error: "handlerGetAllVideos function is not defined" });
          }
        } else if (folder && fileName) {
          // Tek bir dosyanın URL'si isteniyor
          if (typeof handlerGetFileURL === "function") {
            await handlerGetFileURL(req, res, folder, fileName);
          } else {
            res
                .status(500)
                .json({ error: "handlerGetFileURL function is not defined" });
          }
        } else {
          res.status(400).json({
            error:
                "Missing required parameters: folder and fileName, or set all=true, or set fromCollection=true",
          });
        }
        break;
      }

      default:
        // Desteklenmeyen HTTP metodu
        res.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}