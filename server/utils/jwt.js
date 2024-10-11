import jwt from "jsonwebtoken";

// Access token için kullanılacak gizli anahtar
const secretKey = "foody_app_user_token";

// Refresh token için kullanılacak gizli anahtar
const refreshSecretKey = "foody_app_user_refresh_token";

// JWT (access token) oluşturma fonksiyonu
export function generateJWT(userId) {
  const payload = { userId };
  const options = { expiresIn: "1h" }; // Access token 1 saat geçerli olacak

  const token = jwt.sign(payload, secretKey, options); // 1 saat geçerli olacak access token oluştur
  return token;
}

// JWT doğrulama fonksiyonu
export function verifyJWT(token, refreshKey) {
  try {
    const decoded = jwt.verify(
      token,
      refreshKey ? refreshSecretKey : secretKey
    );
    return decoded;
  } catch (error) {
    console.error("JWT verification error:", error);
    throw new Error("Invalid token"); // Hata varsa fırlat
  }
}

// Refresh token oluşturma fonksiyonu
export const generateRefreshToken = (userId) => {
  const payload = { userId };
  const options = { expiresIn: "7d" }; // Refresh token 7 gün geçerli olacak
  return jwt.sign(payload, refreshSecretKey, options);
};
