import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";
import {listAll, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../configs/firebase"; // Firebase yapılandırmanızın yolu



export async function handlerUploadPOST(req, res, folder) {
  try {
    const form = await parseForm(req);

    const { video, coverImage } = form.files;

    if (!video || video.length === 0 || !coverImage || coverImage.length === 0) {
      res.status(400).json({ error: "Video or cover image is missing" });
      return;
    }

    // Video dosyasını yükle
    const uploadedVideo = video[0];
    const videoUrl = await uploadFile(`${folder}/videos`, uploadedVideo);

    // Kapak resmini yükle
    const uploadedCoverImage = coverImage[0];
    const coverImageUrl = await uploadFile(`${folder}/covers`, uploadedCoverImage);

    res.status(201).json({ videoUrl, coverImageUrl });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}




export async function handlerGetAllVideos(req, res, folder) {
  try {
    // Gelen klasör yolunu kontrol et
    if (!folder) {
      res.status(400).json({ error: "Folder name is missing" });
      return;
    }

    // Video ve kapak resim klasörlerine referans oluştur
    const videoFolderRef = ref(storage, `${folder}/videos`);
    const coverFolderRef = ref(storage, `${folder}/covers`);

    // Video dosyalarını listele
    const videoFiles = await listAll(videoFolderRef);

    // Videoları getirme işlemi
    const videos = await Promise.all(
      videoFiles.items.map(async (video) => {
        const videoUrl = await getDownloadURL(video);
        const videoName = video.name;

        // Kapak resmini bul
        const coverImageName = videoName.replace(/\.(mp4|avi|mkv)$/, ".jpg"); // Örneğin, video.mp4 -> video.jpg
        const coverImageRef = ref(coverFolderRef, coverImageName);
        let coverImageUrl = null;

        try {
          coverImageUrl = await getDownloadURL(coverImageRef);
        } catch (error) {
          console.warn(`Cover image not found for video: ${videoName}`);
        }

        return { videoName, videoUrl, coverImageUrl };
      })
    );

    res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching video and cover list:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}




// GET fonksiyonu: Firebase Storage'dan bir dosya URL'sini döndürür
export async function handlerGetFileURL(req, res, folder, fileName) {
  try {
    if (!folder || !fileName) {
      res.status(400).json({ error: "Folder or fileName is missing" });
      return;
    }

    const videoRef = ref(storage, `${folder}/${fileName}`);
    const videoUrl = await getDownloadURL(videoRef);

    const coverName = fileName.replace(/\.(mp4|avi|mkv)$/, ".jpg"); // Kapak adı tahmini
    const coverRef = ref(storage, `${folder}/${coverName}`);
    let coverUrl = null;

    try {
      coverUrl = await getDownloadURL(coverRef);
    } catch {
      // Kapak resmi yoksa null olarak bırak
    }

    res.status(200).json({ videoUrl, coverUrl });
  } catch (error) {
    console.error("Error fetching file URL:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}