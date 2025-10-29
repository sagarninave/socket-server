import { IResponse } from "../interface";
import crypto from "crypto";
import file from "fs";
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
  const cipher = crypto.createCipher("aes-256-cbc", key);
  let cipherText = cipher.update(plainText, "utf8", "hex");
  cipherText += cipher.final("hex");
  return cipherText;
};

/**
 * The `decrypt` function takes an encrypted text and a key, decrypts the text using AES-256-CBC
 * algorithm, and returns the decrypted data.
 */
export const decrypt = (cipherText: string, key: string): string => {
  const decipher = crypto.createDecipher("aes-256-cbc", key);
  let plainText = decipher.update(cipherText, "hex", "utf8");
  plainText += decipher.final("utf8");
  return plainText;
};

/**
 * The function `removeFile` takes a file path as input and deletes the file at that path.
 */
export const removeFile = (filePath: string): void =>
  file.unlink(filePath, (error: Error): void => {
    if (error) throw Error(error.message);
  });
