import { formidable } from "formidable"; // Yeni import
import { bucket, firestore } from "../../server/configs/firebaseAdmin";
import { response } from "../utils/response";

export async function handlerVideoPOST(req, res, col) {
  const form = formidable({ multiples: true }); // Yeni formidable yapısı

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form data:", err);
      return res.status(500).json({ error: "Error parsing form data" });
    }

    const file = files.video?.[0]; // Formidable'ın yeni formatında dosya dizisi

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

      const docRef = await firestore.collection(col).add(videoData);

      res.status(201).json({
        message: "Video uploaded successfully",
        videoId: docRef.id,
        videoUrl: publicUrl,
      });
    } catch (uploadError) {
      console.error("Error uploading video:", uploadError);
      res.status(500).json({ error: "Error uploading video" });
    }
  });
}
