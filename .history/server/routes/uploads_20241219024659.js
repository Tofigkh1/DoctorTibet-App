import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import { storage, firestore } from "../configs/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function handlerUploadPOST(req, res, folder) {
  try {
    const form = await parseForm(req);

    const { video, coverImage } = form.files;

    if (!video || video.length === 0 || !coverImage || coverImage.length === 0) {
      res.status(400).json({ error: "Video or cover image is missing" });
      return;
    }

    // Generate unique IDs
    const id = uuidv4();

    // Upload video
    const uploadedVideo = video[0];
    const videoPath = `${folder}/videos/${id}`;
    const videoUrl = await uploadFile(videoPath, uploadedVideo);

    // Upload cover image
    const uploadedCoverImage = coverImage[0];
    const coverImagePath = `${folder}/covers/${id}`;
    const coverImageUrl = await uploadFile(coverImagePath, uploadedCoverImage);

    // Save data to Firestore
    const docRef = await addDoc(collection(firestore, "uploads"), {
      id,
      videoUrl,
      coverImageUrl,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ id: docRef.id, videoUrl, coverImageUrl });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
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