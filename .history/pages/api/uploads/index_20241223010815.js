import { METHOD } from "../../../server/constant/method";
import { ROUTER } from "../../../server/constant/router";

import {
  handlerUploadPOST,
  handlerGetFileURL,
  handlerGetAllVideos,
} from "../../../server/routes/uploads";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  switch (req.method) {
    case METHOD.POST:
      await handlerUploadPOST(req, res, ROUTER.UPLOADS);
      break;

    case METHOD.GET:
      const { folder, all } = req.query;

      if (all && all === "true") {
        await handlerGetAllVideos(req, res, folder);
      } else {
        res.status(400).json({ error: "Invalid query parameters" });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}



export async function handlerGetAllVideos(req, res, folder) {
  try {
    const videoFolderRef = ref(storage, "uploads/videos");
    const coverFolderRef = ref(storage, "uploads/covers");

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