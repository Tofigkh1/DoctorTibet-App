import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";
import {listAll, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../configs/firebase"; // Firebase yapılandırmanızın yolu
import path from "path";


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
    const videoExtension = path.extname(uploadedVideo.originalFilename); // .mp4, .avi, vb.
    const uniqueName = Date.now().toString(); // Benzersiz dosya ismi
    const videoPath = `${folder}/videos/${uniqueName}${videoExtension}`;
    const videoUrl = await uploadFile(videoPath, uploadedVideo);

    // Kapak resmini yükle
    const uploadedCoverImage = coverImage[0];
    const coverImageExtension = path.extname(uploadedCoverImage.originalFilename); // .jpg, .png, vb.
    const coverImagePath = `${folder}/covers/${uniqueName}${coverImageExtension}`;
    const coverImageUrl = await uploadFile(coverImagePath, uploadedCoverImage);

    // Sonuçları döndür
    res.status(201).json({ videoUrl, coverImageUrl });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}




export async function handlerGetAllVideos(req, res, folder) {
  try {
    // Gelen klasör yolunu kontrol et ve videos klasörünü kontrol et
    if (!folder) {
      res.status(400).json({ error: "Folder name is missing" });
      return;
    }

    // Video klasörüne referans oluştur
    const folderRef = ref(storage, `${folder}/videos`);
    const files = await listAll(folderRef);

    const videoFiles = files.items.filter((item) =>
      item.name.match(/\.(mp4|avi|mkv)$/)
    );

    const videos = await Promise.all(
      videoFiles.map(async (video) => {
        const videoUrl = await getDownloadURL(video);

        // Kapak resmini kontrol et
        const coverName = video.name.replace(/\.(mp4|avi|mkv)$/, ".jpg");
        const coverRef = ref(storage, `${folder}/covers/${coverName}`);
        let coverImageUrl = null;

        try {
          coverImageUrl = await getDownloadURL(coverRef);
        } catch {
          // Kapak resmi bulunamazsa null olarak bırak
        }

        return { videoName: video.name, videoUrl, coverImageUrl };
      })
    );

    res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching video list:", error);
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