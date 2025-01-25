import CryptoJS from "crypto-js";

export const generateSecretKey = () => {
    return CryptoJS.lib.WordArray.random(256 / 8).toString();
};

export const encryptMessage = (message, secretKey) => {
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify({ message }), secretKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return iv.toString() + encrypted.toString();
};

export const decryptMessage = (encryptedText, secretKey) => {
    const iv = CryptoJS.enc.Hex.parse(encryptedText.slice(0, 32));
    const ciphertext = encryptedText.slice(32);
    const decrypted = CryptoJS.AES.decrypt(ciphertext, secretKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)).message;
};