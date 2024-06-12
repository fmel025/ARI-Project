import CryptoJS from 'crypto-js';

export const decryptCard = (encryptedData, cipherKey) => {
    // Split the encrypted data and IV
    const [encrypted, ivHex] = encryptedData.split(':');
    const iv = CryptoJS.enc.Hex.parse(ivHex);

    // Derive the key using SHA-256 hash
    const key = CryptoJS.SHA256(cipherKey);

    // Create the decipher
    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Hex.parse(encrypted) },
        key,
        { iv: iv, mode: CryptoJS.mode.CTR, padding: CryptoJS.pad.NoPadding }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
}