import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import { storage, db } from "../configs/firebase";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Dosya Yükleme ve Firestore'a Ekleme
export async function handlerUploadPOST(req, res) {
  try {
    const form = await parseForm(req);
    const { video, coverImage } = form.files;

    if (!video || !coverImage) {
      res.status(400).json({ error: "Video or cover image is missing" });
      return;
    }

    // Benzersiz ID oluştur
    const videoId = uuidv4();
    const coverId = uuidv4();

    // Video Yükleme
    const uploadedVideo = video[0];
    const videoFileName = `${videoId}${getFileExtension(uploadedVideo.originalFilename)}`;
    const videoUrl = await uploadFile(`uploads/videos/${videoFileName}`, uploadedVideo);

    // Kapak Resmi Yükleme
    const uploadedCoverImage = coverImage[0];
    const coverFileName = `${coverId}${getFileExtension(uploadedCoverImage.originalFilename)}`;
    const coverImageUrl = await uploadFile(`uploads/covers/${coverFileName}`, uploadedCoverImage);

    // Firestore'a Kaydet
    const docRef = await addDoc(collection(db, "uploads"), {
      videoId,
      videoUrl,
      coverId,
      coverImageUrl,
      originalVideoName: uploadedVideo.originalFilename,
      originalCoverName: uploadedCoverImage.originalFilename,
      uploadedAt: serverTimestamp(),
    });

    res.status(201).json({ message: "Files uploaded successfully", id: docRef.id });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Yardımcı Fonksiyon: Dosya Uzantısını Al
function getFileExtension(filename) {
  return filename.slice(filename.lastIndexOf("."));
}

// export async function handlerUploadPOST(req, res, folder) {
//   try {
//     const form = await parseForm(req);

//     const { file } = form.files;

//     if (!file || file.length === 0) {
//       res.status(400).json({ error: "No file provided" });
//       return;
//     }

//     // Yükleme işlemi için ilk dosyayı seçiyoruz.
//     const uploadedFile = file[0];
//     const fileUrl = await uploadFile(folder, uploadedFile);

//     res.status(201).json({ fileUrl });
//   } catch (error) {
//     console.error("File upload error:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// }

// export async function handlerUploadPOST(req, res, folder) {
//   try {
//     const form = await parseForm(req);

//     const { video, coverImage } = form.files;

//     if (!video || video.length === 0 || !coverImage || coverImage.length === 0) {
//       res.status(400).json({ error: "Video or cover image is missing" });
//       return;
//     }

//     // Video dosyasını yükle
//     const uploadedVideo = video[0];
//     const videoUrl = await uploadFile(folder, uploadedVideo);

//     // Kapak resmini yükle
//     const uploadedCoverImage = coverImage[0];
//     const coverImageUrl = await uploadFile(folder, uploadedCoverImage);

//     res.status(201).json({ videoUrl, coverImageUrl });
//   } catch (error) {
//     console.error("File upload error:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// }



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