import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";
import {listAll, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../configs/firebase"; // Firebase yapılandırmanızın yolu



export async function handlerUploadPOST(req, res, folder) {
  try {
    const form = await parseForm(req);
    const { file: files } = form.files;

    if (!files || files.length < 2) {
      res.status(400).json({ error: "Both video and cover image are required" });
      return;
    }

    // İlk dosya video, ikinci dosya kapak resmi olarak kabul edilir
    const [videoFile, coverFile] = files;

    // Video ve kapak resmini ayrı ayrı yükle
    const videoUrl = await uploadFile(folder, videoFile);
    const coverUrl = await uploadFile(folder, coverFile);

    res.status(201).json({ videoUrl, coverUrl });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}








export async function handlerGetAllVideos(req, res, folder) {
  try {
    if (!folder) {
      res.status(400).json({ error: "Folder name is missing" });
      return;
    }

    const folderRef = ref(storage, folder);
    const files = await listAll(folderRef);

    // Videolar ve kapak resimlerini eşleştirmek için
    const videoFiles = files.items.filter((item) =>
      item.name.match(/\.(mp4|avi|mkv)$/)
    );
    const coverFiles = files.items.filter((item) =>
      item.name.match(/\.(jpg|jpeg|png)$/)
    );

    const videos = await Promise.all(
      videoFiles.map(async (video) => {
        const videoUrl = await getDownloadURL(video);
        const coverName = video.name.replace(/\.(mp4|avi|mkv)$/, ".jpg"); // Kapak adı tahmini
        const cover = coverFiles.find((file) => file.name === coverName);
        const coverUrl = cover ? await getDownloadURL(cover) : null;

        return { videoName: video.name, videoUrl, coverUrl };
      })
    );

    res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching video list:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
