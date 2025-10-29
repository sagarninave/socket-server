"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envJoiSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.envJoiSchema = joi_1.default.object({
    PORT: joi_1.default.number().default(8000),
    NODE_ENVIRONMENT: joi_1.default.string().default("development"),
    MONGO_DB_URL: joi_1.default.string().default("mongodb://localhost:27017/boilerplate"),
    MONGO_DB_USERNAME: joi_1.default.string().default(""),
    MONGO_DB_PASSWORD: joi_1.default.string().default(""),
    MONGO_DB_SERVER: joi_1.default.string().default(""),
    MONGO_DB_DATABASE: joi_1.default.string().default(""),
    MONGO_DB_ENVIRONMENT: joi_1.default.string().default(""),
    PASSWORD_SALT: joi_1.default.number().default(10),
    JWT_ACCESS_TOKEN_SECRET_KEY: joi_1.default.string().default("sfsd#4vg%5"),
    JWT_ACCESS_TOKEN_SECRET_KEY_EXPIRY: joi_1.default.string().default("1"),
    JWT_REFRESH_TOKEN_SECRET_KEY: joi_1.default.string().default("3"),
    JWT_REFRESH_TOKEN_SECRET_KEY_EXPIRY: joi_1.default.string().default("gsf34%66"),
    EMAIL_SERVICE: joi_1.default.string().default(""),
    EMAIL_FROM: joi_1.default.string().default(""),
    EMAIL_USERNAME: joi_1.default.string().default(""),
    EMAIL_PASSWORD: joi_1.default.string().default(""),
    ENCRYPTION_KEY: joi_1.default.string().default("a72de974337ed"),
    ISSUER: joi_1.default.string().default("http://localhost:8000"),
    AUDIENCE: joi_1.default.string().default("http://localhost:83000"),
    CLOUDINARY_NAME: joi_1.default.string().default(""),
    CLOUDINARY_API_KEY: joi_1.default.string().default(""),
    CLOUDINARY_API_SECRET: joi_1.default.string().default(""),
    CLOUDINARY_STORAGE_FOLDER: joi_1.default.string().default(""),
    STORAGE_DIRECTORY: joi_1.default.string().default(""),
});
//# sourceMappingURL=config.joi.js.map