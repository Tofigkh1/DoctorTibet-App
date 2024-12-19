import { fileStorage } from "../configs/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { promises as fs } from "fs";

export const uploadFile = async (folder = "uploads", file) => {
  const fileContent = await fs.readFile(file.path);

  const fileName = file.originalFilename || file.path.split("/").pop();

  const storageRef = ref(fileStorage, `${folder}/${fileName}`);

  const uploadTask = uploadBytesResumable(storageRef, fileContent, {
    contentType: "application/octet-stream",
  });

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null,
      (error) => reject(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};