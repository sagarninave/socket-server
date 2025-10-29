import { IResponse } from "../interface";
import crypto from "crypto";
import file from "fs";
import { ALGORITHM, IV_LENGTH } from "../constant";
export * from "./postman";
/**
 * `apiResponse` returns an object with success status, message, and data.
 */
export const apiResponse = (
  success: boolean,
  message: string,
  data: unknown
): IResponse => ({
  success,
  message,
  data,
});

/**
 * The function `getNextSeventhDayDateTime` returns the date and time that is seven days ahead from the
 * current date and time.
 */
export const getNextSeventhDayDateTime = (): Date => {
  const afterSevenDays: number = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
  return new Date(afterSevenDays);
};

/**
 * The function `encrypt` takes a plain text and a key, encrypts the plain text using AES-256-CBC
 * algorithm, and returns the encrypted data in hexadecimal format.
 */
export const encrypt = (plainText: string, key: string): string => {
  // Create a secure random IV (Initialization Vector)
  const iv = crypto.randomBytes(IV_LENGTH);

  // Derive a fixed-length 32-byte key (SHA-256 hash of the provided key)
  const keyBuffer = crypto.createHash("sha256").update(key).digest();

  const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv);
  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);

  // Return IV + ciphertext (as base64)
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

/**
 * The `decrypt` function takes an encrypted text and a key, decrypts the text using AES-256-CBC
 * algorithm, and returns the decrypted data.
 */
export const decrypt = (encryptedData: string, key: string): string => {
  // Split IV and ciphertext
  const [ivHex, encryptedHex] = encryptedData.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encryptedText = Buffer.from(encryptedHex, "hex");

  // Derive the same 32-byte key
  const keyBuffer = crypto.createHash("sha256").update(key).digest();

  const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
};
/**
 * The function `removeFile` takes a file path as input and deletes the file at that path.
 */
export const removeFile = (filePath: string): void =>
  file.unlink(filePath, (error: Error): void => {
    if (error) throw Error(error.message);
  });
