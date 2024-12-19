import formidable from 'formidable';
import { bucket, firestore }
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Formidable ile çalışmak için bodyParser'ı kapatıyoruz.
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    const file = files.video;

    if (!file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    try {
      const filePath = file.filepath;
      const destination = `videos/${file.originalFilename}`;
      const uploadResponse = await bucket.upload(filePath, {
        destination,
        public: true, // Videoyu herkese açık yapmak için
        metadata: {
          contentType: file.mimetype,
        },
      });

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;

      // Firestore'a video bilgisi kaydetme
      const videoData = {
        title: fields.title || 'Untitled',
        url: publicUrl,
        createdAt: new Date(),
      };

      const docRef = await firestore.collection('videos').add(videoData);

      return res.status(200).json({
        message: 'Video uploaded successfully',
        videoId: docRef.id,
        videoUrl: publicUrl,
      });
    } catch (uploadError) {
      console.error('Error uploading video:', uploadError);
      return res.status(500).json({ error: 'Error uploading video' });
    }
  });
}
