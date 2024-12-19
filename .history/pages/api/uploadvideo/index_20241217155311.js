export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ message: "Welcome to the API. Use /route/uploadVideo for video upload." });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
