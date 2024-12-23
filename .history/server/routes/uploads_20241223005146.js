import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../configs/firebase"; // Firestore ve Storage yapılandırması
import { doc, setDoc } from "firebase/firestore";

export async function handlerUploadPOST(req, res, folder) {
  try {
    // Form verilerini ayrıştır
    const form = await parseForm(req);
    const { video, coverImage } = form.files;
    const { category } = form.fields;

    // Gerekli alanların kontrolü
    if (!video || video.length === 0 || !coverImage || coverImage.length === 0) {
      res.status(400).json({ error: "Video or cover image is missing" });
      return;
    }

    if (!category) {
      res.status(400).json({ error: "Category is missing" });
      return;
    }

    // UUID ile benzersiz bir dosya ID'si oluştur
    const id = uuidv4();

    // Videoyu kategorisine göre yükle
    const videoPath = `${folder}/categories/${category}/videos/${id}`;
    const videoUrl = await uploadFile(videoPath, video[0]);

    // Kapak resmini kategorisine göre yükle
    const coverImagePath = `${folder}/categories/${category}/covers/${id}`;
    const coverImageUrl = await uploadFile(coverImagePath, coverImage[0]);

    // Veriyi Firestore'a kaydet
    const videoDoc = {
      id,
      category,
      videoUrl,
      coverImageUrl,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "videos", id), videoDoc);

    // Başarı mesajı gönder
    res.status(201).json(videoDoc);
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
    const { category } = req.query; // Sorgu parametresinden kategoriyi al

    const videoFolderRef = ref(storage, `${folder}/videos`);
    const coverFolderRef = ref(storage, `${folder}/covers`);

    const videoFolders = await listAll(videoFolderRef);
    const coverFolders = await listAll(coverFolderRef);

    const mediaList = [];

    for (const videoFolder of videoFolders.prefixes) {
      const videoFolderName = videoFolder.name;

      // Eğer kategori belirtilmişse ve bu klasör kategoriye uymuyorsa, atla
      if (category && videoFolderName !== category) {
        continue;
      }

      // Video dosyalarını al
      const videoFiles = await listAll(videoFolder);
      const videos = await Promise.all(
        videoFiles.items.map(async (video) => {
          const videoUrl = await getDownloadURL(video);
          return { videoName: video.name, videoUrl };
        })
      );

      // İlgili kapak klasörünü bul
      const correspondingCoverFolder = coverFolders.prefixes.find(
        (coverFolder) => coverFolder.name === videoFolderName
      );

      const covers = [];
      if (correspondingCoverFolder) {
        const coverFiles = await listAll(correspondingCoverFolder);
        for (const coverFile of coverFiles.items) {
          const coverImageUrl = await getDownloadURL(coverFile);
          covers.push({ coverName: coverFile.name, coverImageUrl });
        }
      }

      mediaList.push({
        id: videoFolderName,
        videos,
        covers,
      });
    }

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