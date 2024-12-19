import formidable from "formidable";
import { bucket, firestore } from "../../server/configs/a"; // Firebase Admin'i import edin

export const config = {
  api: {
    bodyParser: false, // formidable kullanacağımız için bodyParser kapatılıyor.
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form data:", err);
      return res.status(500).json({ error: "Error parsing form data" });
    }

    const file = files.video;

    if (!file) {
      return res.status(400).json({ error: "No video file uploaded" });
    }

    try {
      const filePath = file.filepath; // Geçici dosya yolu
      const fileName = `videos/${Date.now()}_${file.originalFilename}`; // Benzersiz dosya adı

      // Firebase Storage'a video yükle
      await bucket.upload(filePath, {
        destination: fileName,
        metadata: {
          contentType: file.mimetype,
        },
      });

      // Videonun URL'sini oluştur
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      // Firestore'a video kaydı ekle
      const videoData = {
        title: fields.title || "Untitled",
        url: publicUrl,
        createdAt: new Date(),
      };

      const docRef = await firestore.collection("videos").add(videoData);

      return res.status(200).json({
        message: "Video uploaded successfully",
        videoId: docRef.id,
        videoUrl: publicUrl,
      });
    } catch (uploadError) {
      console.error("Error uploading video:", uploadError);
      return res.status(500).json({ error: "Error uploading video" });
    }
  });
}
