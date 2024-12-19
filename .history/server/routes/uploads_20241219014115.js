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




export async function handlerGetAllVideos(req, res) {
  try {
    const { folder } = req.query;

    if (!folder) {
      res.status(400).json({ error: "Folder name is missing" });
      return;
    }

    const storage = getStorage(); // Firebase Storage örneği
    const videosRootRef = ref(storage, `${folder}/videos`);
    console.log("Root ref:", videosRootRef);

    const videosFolders = await listAll(videosRootRef);
    console.log("Listed folders:", videosFolders);

    const videos = await Promise.all(
      videosFolders.prefixes.map(async (videoFolder) => {
        const videoFolderRef = ref(storage, videoFolder.fullPath);
        const videoFiles = await listAll(videoFolderRef);
        console.log(`Files in ${videoFolder.fullPath}:`, videoFiles);

        const videoFile = videoFiles.items.find((item) =>
          /\.(mp4|avi|mkv)$/i.test(item.name)
        );

        if (!videoFile) {
          console.log(`No video found in ${videoFolder.name}`);
          return null;
        }

        const videoUrl = await getDownloadURL(videoFile);
        console.log("Video URL:", videoUrl);

        const coverImageRef = ref(storage, `${folder}/covers/${videoFolder.name}.jpg`);
        let coverImageUrl = null;

        try {
          coverImageUrl = await getDownloadURL(coverImageRef);
          console.log("Cover image URL:", coverImageUrl);
        } catch (err) {
          console.warn("Cover image not found:", coverImageRef.fullPath);
        }

        return { videoName: videoFile.name, videoUrl, coverImageUrl };
      })
    );

    res.status(200).json({ videos: videos.filter((v) => v !== null) });
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