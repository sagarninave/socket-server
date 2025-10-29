"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../constant");
const exception_1 = require("../exception");
const uuid_1 = require("uuid");
const services_1 = require("../services");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const extList = ["png", "jpg", "gif", "jpeg", "jfif"];
const storagePath = String(services_1.Env.get("STORAGE_DIRECTORY"));
const destination = (_req, _file, cb) => {
    if (!fs_1.default.existsSync(storagePath)) {
        fs_1.default.mkdirSync(storagePath);
    }
    cb(null, storagePath);
};
const fileName = (_req, file, cb) => {
    cb(null, `${(0, uuid_1.v4)()}-${file === null || file === void 0 ? void 0 : file.originalname}`);
};
const storage = multer_1.default.diskStorage({
    destination: destination,
    filename: fileName,
});
const fileFilter = (req, file, cb) => {
    const fileNameFragments = file.originalname.split(".");
    const ext = fileNameFragments[fileNameFragments.length - 1].toLocaleLowerCase();
    if (!extList.includes(ext)) {
        return cb(new exception_1.HttpException(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.BAD_REQUEST, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.ONLY_IMAGES_ALLOWED.replace("image", extList.join(", "))), false);
    }
    cb(null, true);
};
const fileSize = {
    fieldSize: 1024 * 1024,
};
exports.default = (0, multer_1.default)({
    fileFilter: fileFilter,
    storage: storage,
    limits: fileSize,
});
//# sourceMappingURL=multer.config.js.map