import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";
import { v4 as uuidv4 } from "uuid";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { app } from "../configs/firebase";

const firestore = getFirestore(app);

export async function handlerUploadPOST(req, res, folder) {
  try {
    const form = await parseForm(req);

    const { video, coverImage } = form.files;

    if (!video || video.length === 0 || !coverImage || coverImage.length === 0) {
      res.status(400).json({ error: "Video or cover image is missing" });
      return;
    }

    const id = uuidv4();

    const uploadedVideo = video[0];
    const videoUrl = await uploadFile(`${folder}/videos/${id}`, uploadedVideo);

    const uploadedCoverImage = coverImage[0];
    const coverImageUrl = await uploadFile(`${folder}/covers/${id}`, uploadedCoverImage);

    const videoCollection = collection(firestore, "videos");
    await setDoc(doc(videoCollection, id), {
      id,
      videoUrl,
      coverImageUrl,
      videoName: uploadedVideo.originalFilename,
      coverImageName: uploadedCoverImage.originalFilename,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ id, videoUrl, coverImageUrl });
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
    const folderRef = ref(storage, "uploads/videos");
    const files = await listAll(folderRef);
    
    console.log("Files in folder:", files.items);

    const videoFiles = files.items.filter((item) =>
      item.name.match(/\.(mp4|avi|mkv)$/)
    );

    const videos = await Promise.all(
      videoFiles.map(async (video) => {
        const videoUrl = await getDownloadURL(video);
        return { videoName: video.name, videoUrl };
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