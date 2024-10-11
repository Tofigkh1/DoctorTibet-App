import {
  generateJWT,
  generateRefreshToken,
  verifyJWT,
} from "../../../server/utils/jwt";

export default async function handler(req, res) {
  // CORS için gerekli başlıkları ayarlıyoruz
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Sadece POST isteklerini kabul ediyoruz
  if (req.method !== "POST") {
    return res.status(405).end(); // Sadece POST izin ver
  }

  // İstekten refresh token'ı alıyoruz
  const { refresh_token } = req.body;

  // Eğer refresh token gönderilmediyse hata döndür
  if (!refresh_token) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  try {
    // Refresh token'ı doğruluyoruz
    const decodedRefreshToken = verifyJWT(refresh_token, true);

    // Eğer refresh token geçersizse 401 hatası döndür
    if (!decodedRefreshToken) {
      return res.status(401).json({ error: "Invalid or expired refresh token" });
    }

    // Yeni access token ve refresh token oluşturuyoruz
    const newAccessToken = generateJWT(decodedRefreshToken.userId);
    const newRefreshToken = generateRefreshToken(decodedRefreshToken.userId);

    // Yeni token'ları yanıt olarak döndürüyoruz
    return res.status(200).json({
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    });
  } catch (error) {
    console.log("Error refreshing token:", error);
    // Hata varsa 401 Unauthorized hatası döndür
    return res.status(401).json({ error: "Invalid refresh token" });
  }
}
