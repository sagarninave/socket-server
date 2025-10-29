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
    const cipher = crypto_1.default.createCipher("aes-256-cbc", key);
    let cipherText = cipher.update(plainText, "utf8", "hex");
    cipherText += cipher.final("hex");
    return cipherText;
};
exports.encrypt = encrypt;
/**
 * The `decrypt` function takes an encrypted text and a key, decrypts the text using AES-256-CBC
 * algorithm, and returns the decrypted data.
 */
const decrypt = (cipherText, key) => {
    const decipher = crypto_1.default.createDecipher("aes-256-cbc", key);
    let plainText = decipher.update(cipherText, "hex", "utf8");
    plainText += decipher.final("utf8");
    return plainText;
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