import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";
import {listAll, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../configs/firebase"; // Firebase yapılandırmanızın yolu

import { v4 as uuidv4 } from "uuid";

export async function handlerUploadPOST(req, res, folder) {
  try {
    const form = await parseForm(req);

    const { video, coverImage } = form.files;
    const { categoryId } = form.fields; // Kategori ID'sini al

    if (
      !video ||
      video.length === 0 ||
      !coverImage ||
      coverImage.length === 0 ||
      !categoryId
    ) {
      res.status(400).json({ error: "Video, cover image, or category is missing" });
      return;
    }

    const id = uuidv4();

    const uploadedVideo = video[0];
    const videoUrl = await uploadFile(`${folder}/videos/${id}`, uploadedVideo);

    const uploadedCoverImage = coverImage[0];
    const coverImageUrl = await uploadFile(`${folder}/covers/${id}`, uploadedCoverImage);

    // Firebase veritabanına kategori ile ilgili bilgiyi kaydetmek için güncelleme yapılabilir
    // Örneğin:
    // await saveToDatabase({ id, videoUrl, coverImageUrl, categoryId });

    res.status(201).json({ id, videoUrl, coverImageUrl, categoryId });
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
    const videoFolderRef = ref(storage, `${folder}/videos`);
    const coverFolderRef = ref(storage, `${folder}/covers`);

    console.log("Fetching video folders from:", videoFolderRef.fullPath);
    console.log("Fetching cover folders from:", coverFolderRef.fullPath);

    const videoFolders = await listAll(videoFolderRef);
    const coverFolders = await listAll(coverFolderRef);

    console.log("Video folders found:", videoFolders.prefixes.length);
    console.log("Cover folders found:", coverFolders.prefixes.length);

    const mediaList = [];

    for (const videoFolder of videoFolders.prefixes) {
      const videoFolderName = videoFolder.name;

      console.log("Processing video folder:", videoFolderName);

      const videoFiles = await listAll(videoFolder);
      const videos = await Promise.all(
        videoFiles.items.map(async (video) => {
          const videoUrl = await getDownloadURL(video);
          console.log("Video file found:", video.name, "URL:", videoUrl);
          return { videoName: video.name, videoUrl };
        })
      );

      const correspondingCoverFolder = coverFolders.prefixes.find(
        (coverFolder) => coverFolder.name === videoFolderName
      );

      const covers = [];
      if (correspondingCoverFolder) {
        const coverFiles = await listAll(correspondingCoverFolder);
        for (const coverFile of coverFiles.items) {
          const coverImageUrl = await getDownloadURL(coverFile);
          console.log("Cover file found:", coverFile.name, "URL:", coverImageUrl);
          covers.push({ coverName: coverFile.name, coverImageUrl });
        }
      } else {
        console.log("No corresponding cover folder found for:", videoFolderName);
      }

      mediaList.push({
        id: videoFolderName,
        videos,
        covers,
      });
    }

    console.log("Final media list:", mediaList);
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