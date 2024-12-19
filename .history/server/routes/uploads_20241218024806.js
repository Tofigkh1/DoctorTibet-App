import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";
import {listAll, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../configs/firebase"; // Firebase yapılandırmanızın yolu



export async function handlerUploadPOST(req, res, folder) {
  try {
    const form = await parseForm(req);

    const { file } = form.files;

    if (!file || file.length === 0) {
      res.status(400).json({ error: "No file provided" });
      return;
    }

    // Yükleme işlemi için ilk dosyayı seçiyoruz.
    const uploadedFile = file[0];
    const fileUrl = await uploadFile(folder, uploadedFile);

    res.status(201).json({ fileUrl });
  } catch (error) {
    console.error("File upload error:", error);
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

    // Dosya referansını alıyoruz
    const fileRef = ref(storage, `${folder}/${fileName}`);
    const fileUrl = await getDownloadURL(fileRef); // Dosya URL'sini alıyoruz

    res.status(200).json({ fileUrl });
  } catch (error) {
    console.error("Error fetching file URL:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}



export async function handlerGetAllVideos(req, res, folder) {
  try {
    if (!folder) {
      res.status(400).json({ error: "Folder name is missing" });
      return;
    }

    // Video klasörünü listele
    const videoFolderRef = ref(storage, `${folder}/videos`);
    const videoFiles = await listAll(videoFolderRef);

    // Kapak resmi klasörünü listele
    const coverFolderRef = ref(storage, `${folder}/covers`);
    const coverFiles = await listAll(coverFolderRef);

    // Videoların URL'lerini al
    const videoUrls = await Promise.all(
      videoFiles.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { name: item.name, url };
      })
    );

    // Kapak resimlerinin URL'lerini al
    const coverUrls = await Promise.all(
      coverFiles.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { name: item.name, url };
      })
    );

    res.status(200).json({
      videos: videoUrls,
      covers: coverUrls,
    });
  } catch (error) {
    console.error("Error fetching videos and covers:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
