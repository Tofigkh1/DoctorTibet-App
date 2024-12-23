import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";
import {listAll, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../configs/firebase"; // Firebase yapılandırmanızın yolu

import { v4 as uuidv4 } from "uuid";

export async function handlerUploadPOST(req, res, folder) {
  try {
    const form = await parseForm(req);
    const { video, coverImage } = form.files;
    const { categoryId } = form.fields;

if (!video || !coverImage || !category) {
  res.status(400).json({ error: "Missing required fields: video, coverImage, or category" });
  return;
}

    const id = uuidv4();
    const uploadedVideo = video[0];
    const uploadedCoverImage = coverImage[0];

    const videoUrl = await uploadFile(`${folder}/videos/${id}`, uploadedVideo);
    const coverImageUrl = await uploadFile(`${folder}/covers/${id}`, uploadedCoverImage);

    const videoData = {
      id,
      videoUrl,
      coverImageUrl,
      categoryId: categoryId[0], // Form field returns an array, take first value
      createdAt: new Date().toISOString(),
    };

    await addData("videos", videoData); // Firestore'da video bilgisini sakla
    res.status(201).json({ message: "Upload successful", data: videoData });
  } catch (error) {
    console.error("Error uploading files:", error);
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
    const { categoryId } = req.query;

    if (!categoryId) {
      res.status(400).json({ error: "Category ID is required" });
      return;
    }

    const videos = await getAllData("videos"); // Firestore'dan tüm videoları al
    const filteredVideos = videos.filter(video => video.categoryId === categoryId);

    res.status(200).json({ categoryId, videos: filteredVideos });
  } catch (error) {
    console.error("Error fetching videos:", error);
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