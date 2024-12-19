import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../configs/firebase"; // Firebase yapılandırmanızın yolu
import { firestore } from "../configs/firebase"; // Firestore yapılandırmanızın yolu
import { v4 as uuidv4 } from "uuid"; // Benzersiz ID oluşturmak için

export async function handlerUploadPOST(req, res, folder) {
  try {
    const form = await parseForm(req);

    const { video, coverImage } = form.files;

    if (!video || video.length === 0 || !coverImage || coverImage.length === 0) {
      res.status(400).json({ error: "Video or cover image is missing" });
      return;
    }

    // Benzersiz bir ID oluştur
    const uniqueId = uuidv4();

    // Video dosyasını yükle
    const uploadedVideo = video[0];
    const videoUrl = await uploadFile(`${folder}/videos/${uniqueId}`, uploadedVideo);

    // Kapak resmini yükle
    const uploadedCoverImage = coverImage[0];
    const coverImageUrl = await uploadFile(`${folder}/covers/${uniqueId}`, uploadedCoverImage);

    // Firestore'da bir koleksiyon oluştur ve veriyi ekle
    const videoData = {
      id: uniqueId,
      videoUrl,
      coverImageUrl,
      createdAt: new Date().toISOString(),
    };

    await firestore.collection("uploads").doc(uniqueId).set(videoData);

    res.status(201).json({ success: true, videoData });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerGetAllVideos(req, res) {
  try {
    const uploadsSnapshot = await firestore.collection("uploads").get();
    const videos = uploadsSnapshot.docs.map((doc) => doc.data());

    res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching video list:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

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
