"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = exports.decrypt = exports.encrypt = exports.getNextSeventhDayDateTime = exports.apiResponse = void 0;
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const constant_1 = require("../constant");
__exportStar(require("./postman"), exports);
/**
 * `apiResponse` returns an object with success status, message, and data.
 */
const apiResponse = (success, message, data) => ({
    success,
    message,
    data,
});
exports.apiResponse = apiResponse;
/**
 * The function `getNextSeventhDayDateTime` returns the date and time that is seven days ahead from the
 * current date and time.
 */
const getNextSeventhDayDateTime = () => {
    const afterSevenDays = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
    return new Date(afterSevenDays);
};
exports.getNextSeventhDayDateTime = getNextSeventhDayDateTime;
/**
 * The function `encrypt` takes a plain text and a key, encrypts the plain text using AES-256-CBC
 * algorithm, and returns the encrypted data in hexadecimal format.
 */
const encrypt = (plainText, key) => {
    // Create a secure random IV (Initialization Vector)
    const iv = crypto_1.default.randomBytes(constant_1.IV_LENGTH);
    // Derive a fixed-length 32-byte key (SHA-256 hash of the provided key)
    const keyBuffer = crypto_1.default.createHash("sha256").update(key).digest();
    const cipher = crypto_1.default.createCipheriv(constant_1.ALGORITHM, keyBuffer, iv);
    const encrypted = Buffer.concat([
        cipher.update(plainText, "utf8"),
        cipher.final(),
    ]);
    // Return IV + ciphertext (as base64)
    return iv.toString("hex") + ":" + encrypted.toString("hex");
};
exports.encrypt = encrypt;
/**
 * The `decrypt` function takes an encrypted text and a key, decrypts the text using AES-256-CBC
 * algorithm, and returns the decrypted data.
 */
const decrypt = (encryptedData, key) => {
    // Split IV and ciphertext
    const [ivHex, encryptedHex] = encryptedData.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encryptedText = Buffer.from(encryptedHex, "hex");
    // Derive the same 32-byte key
    const keyBuffer = crypto_1.default.createHash("sha256").update(key).digest();
    const decipher = crypto_1.default.createDecipheriv(constant_1.ALGORITHM, keyBuffer, iv);
    const decrypted = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
    ]);
    return decrypted.toString("utf8");
};
exports.decrypt = decrypt;
/**
 * The function `removeFile` takes a file path as input and deletes the file at that path.
 */
const removeFile = (filePath) => fs_1.default.unlink(filePath, (error) => {
    if (error)
        throw Error(error.message);
});
exports.removeFile = removeFile;
//# sourceMappingURL=index.js.map