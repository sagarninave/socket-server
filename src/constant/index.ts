import { EAppVersion } from "../enum";
import Route from "./route.constant";
import StatusCode from "./statusCode.constant";
import Message from "./message.constant";
import RegExp from "./regex.constant";
import Collections from "./collections.constant";

export const VERSION = `/${EAppVersion?.APP_TYPE}/${EAppVersion?.VERSION_1}`;

export { Route, StatusCode, Message, RegExp, Collections };
