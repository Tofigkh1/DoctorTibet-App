import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";
import {listAll, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../configs/firebase"; // Firebase yapılandırmanızın yolu
import { getFirestoreDoc } from "./firestore";
import { v4 as uuidv4 } from "uuid";
import { addData } from "../helper/addData";

export async function handlerUploadPOST(req, res) {
  try {
    const form = await parseForm(req);
    const { video, coverImage } = form.files;
    const { categoryId } = form.fields;

    if (!categoryId || !video || video.length === 0 || !coverImage || coverImage.length === 0) {
      res.status(400).json({ error: "Category ID, video, or cover image is missing." });
      return;
    }

    const id = uuidv4();

    // Video yükleme
    const uploadedVideo = video[0];
    const videoUrl = await uploadFile(`uploads/videos/${categoryId}/${id}`, uploadedVideo);

    // Cover image yükleme
    const uploadedCoverImage = coverImage[0];
    const coverImageUrl = await uploadFile(`uploads/covers/${categoryId}/${id}`, uploadedCoverImage);

    // Firestore'a ekleme
    const mediaData = {
      id,
      categoryId,
      videoUrl,
      coverImageUrl,
      createdAt: new Date().toISOString(),
    };

    await addData("media", mediaData); // "media" Firestore koleksiyonu
    res.status(201).json(mediaData);
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ error: "Something went wrong." });
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


//     const uploadedVideo = video[0];
//     const videoUrl = await uploadFile(folder, uploadedVideo);


//     const uploadedCoverImage = coverImage[0];
//     const coverImageUrl = await uploadFile(folder, uploadedCoverImage);

//     res.status(201).json({ videoUrl, coverImageUrl });
//   } catch (error) {
//     console.error("File upload error:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// }



// API Route: /api/uploads
export async function handlerGetAllVideos(req, res) {
  try {
    const { folder } = req.query; // "videos" veya "covers"

    if (!folder) {
      res.status(400).json({ error: "Folder query parameter is required." });
      return;
    }

    const mediaData = await getAllData("media"); // Tüm medya verilerini al
    const categories = await getAllData("categories"); // Tüm kategorileri al

    // Kategorilere göre gruplama
    const groupedMedia = categories.map((category) => ({
      categoryId: category.id,
      categoryName: category.name,
      media: mediaData.filter((media) => media.categoryId === category.id),
    }));

    res.status(200).json(groupedMedia);
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({ error: "Something went wrong." });
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

    const coverName = fileName.replace(/\.(mp4|avi|mkv)$/, ".jpg");
    const coverRef = ref(storage, `${folder}/${coverName}`);
    let coverUrl = null;

    try {
      coverUrl = await getDownloadURL(coverRef);
    } catch {
   
    }

    res.status(200).json({ videoUrl, coverUrl });
  } catch (error) {
    console.error("Error fetching file URL:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}