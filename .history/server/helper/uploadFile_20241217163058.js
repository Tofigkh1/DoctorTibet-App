import { fileStorage } from "../configs/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import fs from "fs";

export const uploadFile = async (folder = "uploads", file) => {
  const fileContent = fs.readFileSync(file.path);

  // Dosya adını belirle
  const fileName = file.originalFilename || file.path.split("/").pop();

  // Firebase Storage'a referans oluştur
  const storageRef = ref(fileStorage, `${folder}/${fileName}`);

  // Yükleme işlemi
  const uploadTask = uploadBytesResumable(storageRef, fileContent, {
    contentType: file.headers["content-type"] || "application/octet-stream",
  });

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null, // Progress takibi opsiyonel
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};
