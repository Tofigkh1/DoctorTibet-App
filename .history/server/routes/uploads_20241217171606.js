import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../configs/firebase"; // Firebase yapılandırmanızın yolu
import {ref, getDownloadURL } from "firebase/storage";
import { app } from "../../../firebase/firebase"; // Firebase uygulamanızı içe aktarın

const storage = getStorage(app);

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