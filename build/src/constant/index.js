"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collections = exports.RegExp = exports.Message = exports.StatusCode = exports.Route = exports.IV_LENGTH = exports.ALGORITHM = exports.VERSION = void 0;
const enum_1 = require("../enum");
const route_constant_1 = __importDefault(require("./route.constant"));
exports.Route = route_constant_1.default;
const statusCode_constant_1 = __importDefault(require("./statusCode.constant"));
exports.StatusCode = statusCode_constant_1.default;
const message_constant_1 = __importDefault(require("./message.constant"));
exports.Message = message_constant_1.default;
const regex_constant_1 = __importDefault(require("./regex.constant"));
exports.RegExp = regex_constant_1.default;
const collections_constant_1 = __importDefault(require("./collections.constant"));
exports.Collections = collections_constant_1.default;
exports.VERSION = `/${enum_1.EAppVersion === null || enum_1.EAppVersion === void 0 ? void 0 : enum_1.EAppVersion.APP_TYPE}/${enum_1.EAppVersion === null || enum_1.EAppVersion === void 0 ? void 0 : enum_1.EAppVersion.VERSION_1}`;
exports.ALGORITHM = "aes-256-cbc"; // AES with 256-bit key in CBC mode
exports.IV_LENGTH = 16; // 16 bytes for AES block size
//# sourceMappingURL=index.js.map