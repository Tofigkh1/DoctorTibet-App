import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";
import {listAll, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../configs/firebase"; // Firebase yapılandırmanızın yolu
import { v4 as uuidv4 } from "uuid"; // UUID modülünü kullanarak benzersiz bir ID oluşturun

export async function handlerUploadPOST(req, res, folder) {
  try {
    const form = await parseForm(req);

    const { video, coverImage } = form.files;

    if (!video || video.length === 0 || !coverImage || coverImage.length === 0) {
      res.status(400).json({ error: "Video or cover image is missing" });
      return;
    }

    // Benzersiz bir ID oluştur
    const id = uuidv4();

    // Video dosyasını yükle
    const uploadedVideo = video[0];
    const videoUrl = await uploadFile(`${folder}/videos/${id}-${uploadedVideo.originalFilename}`, uploadedVideo);

    // Kapak resmini yükle
    const uploadedCoverImage = coverImage[0];
    const coverImageUrl = await uploadFile(`${folder}/covers/${id}-${uploadedCoverImage.originalFilename}`, uploadedCoverImage);

    // ID ve URL'leri döndür
    res.status(201).json({ id, videoUrl, coverImageUrl });
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
    const { folder, all } = req.query; // Query parametrelerini al

    if (!folder) {
      res.status(400).json({ error: "Folder parameter is missing" });
      return;
    }

    const basePath = `uploads/${folder}`;
    const folderRef = ref(storage, basePath);
    const files = await listAll(folderRef);

    // Dosyaları filtreleme (örneğin sadece video formatlarını seçmek için)
    const items = files.items.map(async (item) => {
      const fileUrl = await getDownloadURL(item);
      return {
        name: item.name,
        url: fileUrl,
      };
    });

    const results = await Promise.all(items);

    // Eğer "all" parametresi "true" değilse, sadece video formatlarını döndür
    if (all !== "true") {
      const filteredResults = results.filter((file) =>
        file.name.match(/\.(mp4|avi|mkv)$/)
      );
      res.status(200).json({ files: filteredResults });
      return;
    }

    // Tüm dosyaları döndür
    res.status(200).json({ files: results });
  } catch (error) {
    console.error("Error fetching files:", error);
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