import { EAppVersion } from "../enum";
import Route from "./route.constant";
import StatusCode from "./statusCode.constant";
import Message from "./message.constant";
import RegExp from "./regex.constant";
import Collections from "./collections.constant";

export const VERSION = `/${EAppVersion?.APP_TYPE}/${EAppVersion?.VERSION_1}`;

export const ALGORITHM = "aes-256-cbc"; // AES with 256-bit key in CBC mode
export const IV_LENGTH = 16; // 16 bytes for AES block size

export { Route, StatusCode, Message, RegExp, Collections };
