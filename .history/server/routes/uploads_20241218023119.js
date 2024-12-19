import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../configs/firebase"; // Firebase yapılandırmanızın yolu

// POST: Video ve Kapak Resmini Yükleme
export async function handlerUploadPOST(req, res, folder) {
  try {
    const form = await parseForm(req);

    const { video, thumbnail } = form.files;

    if (!video || video.length === 0) {
      res.status(400).json({ error: "No video provided" });
      return;
    }

    if (!thumbnail || thumbnail.length === 0) {
      res.status(400).json({ error: "No thumbnail provided" });
      return;
    }

    // Yükleme işlemi için video ve kapak resmini ayrı ayrı seçiyoruz.
    const uploadedVideo = video[0];
    const uploadedThumbnail = thumbnail[0];

    const videoUrl = await uploadFile(`${folder}/videos`, uploadedVideo);
    const thumbnailUrl = await uploadFile(`${folder}/thumbnails`, uploadedThumbnail);

    res.status(201).json({ videoUrl, thumbnailUrl });
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

    // Firebase Storage'tan klasör referansını alıyoruz
    const folderRef = ref(storage, folder);
    const files = await listAll(folderRef); // Burada listAll kullanılıyor

    // Tüm dosyaların URL'lerini almak için map kullanıyoruz
    const urls = await Promise.all(
      files.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { name: item.name, url };
      })
    );

    res.status(200).json({ videos: urls });
  } catch (error) {
    console.error("Error fetching video list:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}