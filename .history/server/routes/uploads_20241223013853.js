import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";
import {listAll, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../configs/firebase"; // Firebase yapılandırmanızın yolu

import { v4 as uuidv4 } from "uuid";

import { db } from "../configs/firebase";
import { doc, setDoc } from "firebase/firestore";

import { firestore } from "../../../server/firebase"; // Firestore bağlantısını buradan al
import { v4 as uuidv4 } from "uuid";

export const handlerUploadPOST = async (req, res, routerPath) => {
  try {
    const { categoryId } = req.body; // Body'den categoryId alın
    const categoryIds = Array.isArray(categoryId) ? categoryId : [categoryId];

    // Video ve Kapak URL'leri oluştur
    const videoId = uuidv4();
    const folderPath = `${routerPath}/${videoId}`;
    const videoUrl = await uploadFile(req.files.video, `${folderPath}/video`);
    const coverImageUrl = await uploadFile(
      req.files.coverImage,
      `${folderPath}/coverImage`
    );

    // Kategorileri Firestore'dan çek
    const categories = await Promise.all(
      categoryIds.map(async (id) => {
        const categoryRef = firestore.collection("categories").doc(id);
        const categoryDoc = await categoryRef.get();
        if (!categoryDoc.exists) {
          throw new Error(`Category not found for ID: ${id}`);
        }
        return {
          id,
          name: categoryDoc.data().name,
        };
      })
    );

    // `categoryVideo` koleksiyonuna ekle
    const categoryVideoRef = firestore.collection("categoryVideo");
    await Promise.all(
      categories.map(async (category) => {
        await categoryVideoRef.add({
          categoryId: category.id,
          categoryName: category.name,
          videoUrl,
          coverImageUrl,
          createdAt: new Date().toISOString(),
        });
      })
    );

    // Yanıt döndür
    res.status(200).json({
      id: videoId,
      videoUrl,
      coverImageUrl,
      categoryId: categories.map((cat) => cat.id),
    });
  } catch (error) {
    console.error("Error in handlerUploadPOST:", error);
    res.status(500).json({ error: error.message });
  }
};


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



export async function handlerGetAllVideos(req, res, folder) {
  try {
    const mediaRef = collection(db, "media");
    const categoryRef = collection(db, "categories");

    const mediaSnapshot = await getDocs(mediaRef);
    const categorySnapshot = await getDocs(categoryRef);

    const categories = {};
    categorySnapshot.forEach((doc) => {
      categories[doc.id] = doc.data().name;
    });

    const mediaList = [];
    mediaSnapshot.forEach((doc) => {
      const data = doc.data();
      mediaList.push({
        id: doc.id,
        videoUrl: data.videoUrl,
        coverImageUrl: data.coverImageUrl,
        category: categories[data.categoryId],
      });
    });

    res.status(200).json({ mediaList });
  } catch (error) {
    console.error("Error fetching media list:", error);
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