import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";
import {listAll, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../configs/firebase"; // Firebase yapılandırmanızın yolu
import { collection, getDocs } from "firebase/firestore";
import { db } from "../configs/firebase"; // Firestore yapılandırmasının doğru yolu

import { v4 as uuidv4 } from "uuid";
import { addData } from "../helper/addData";

export async function handlerUploadPOST(req, res, folder) {
  try {
    const form = await parseForm(req);
    const { video, coverImage } = form.files;
    const { categoryId } = form.fields;

    if (!video || !coverImage || !categoryId) {
      res.status(400).json({ error: "Video, cover image, and category ID are required" });
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




export async function handlerGetVideosCollection(req, res) {
  try {
    const videosCollectionRef = collection(db, "videos"); // 'videos' koleksiyonuna referans alın

    const snapshot = await getDocs(videosCollectionRef); // Tüm belgeleri alın
    const videoList = snapshot.docs.map((doc) => ({
      id: doc.id, // Belge kimliği
      ...doc.data(), // Belge verileri
    }));

    res.status(200).json({ videoList }); // Video listesini döndür
  } catch (error) {
    console.error("Error fetching videos from Firestore:", error);
    res.status(500).json({ error: "Something went wrong while fetching videos" });
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
    const videoFolderRef = ref(storage, "uploads/videos");
    const coverFolderRef = ref(storage, "uploads/covers");

    const [videoFolders, coverFolders] = await Promise.all([
      listAll(videoFolderRef),
      listAll(coverFolderRef),
    ]);

    const mediaList = await Promise.all(
      videoFolders.prefixes.map(async (videoFolder) => {
        const videoFolderName = videoFolder.name;

        const videoFiles = await listAll(videoFolder);
        const videos = await Promise.all(
          videoFiles.items.map(async (video) => ({
            videoName: video.name,
            videoUrl: await getDownloadURL(video),
          }))
        );

        const correspondingCoverFolder = coverFolders.prefixes.find(
          (coverFolder) => coverFolder.name === videoFolderName
        );

        const covers = correspondingCoverFolder
          ? await Promise.all(
              (await listAll(correspondingCoverFolder)).items.map(async (coverFile) => ({
                coverName: coverFile.name,
                coverImageUrl: await getDownloadURL(coverFile),
              }))
            )
          : [];

        return { id: videoFolderName, videos, covers };
      })
    );

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