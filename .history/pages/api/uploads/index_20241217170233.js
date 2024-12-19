import { METHOD } from "../../../server/constant/method";
import { ROUTER } from "../../../server/constant/router";
import { handlerUploadPOST } from "../../../server/routes/uploads";
import { handlerGetFileURL } from "../../../server/routes/uploads"; // GET fonksiyonunu içeren dosyayı ekle

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
      await handlerUploadPOST(req, res, ROUTER.UPLOADS);
      break;

    case METHOD.GET:
      const { folder, fileName } = req.query; // GET isteklerindeki parametreleri al
      await handlerGetFileURL(req, res, folder, fileName);
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
