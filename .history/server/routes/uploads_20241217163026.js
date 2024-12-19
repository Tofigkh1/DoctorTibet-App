import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";

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
