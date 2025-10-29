"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPictureToCloudinaryService = exports.changePasswordValidation = void 0;
const cloudinary_1 = require("cloudinary");
const env_1 = require("../env");
const bcrypt_1 = require("bcrypt");
const constant_1 = require("../../constant");
const exception_1 = require("../../exception");
const changePasswordValidation = (user, value) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        throw new exception_1.HttpException(constant_1.StatusCode.UNAUTHORIZED, constant_1.Message.UNAUTHORIZED);
    if (!(yield (0, bcrypt_1.compare)(value.currentPassword, user.password)))
        throw new exception_1.HttpException(constant_1.StatusCode.BAD_REQUEST, constant_1.Message.NOT_MATCH_CURRENT_PASSWORD);
    if (yield (0, bcrypt_1.compare)(value.newPassword, user.password))
        throw new exception_1.HttpException(constant_1.StatusCode.BAD_REQUEST, constant_1.Message.SAME_NEW_CURRENT_PASSWORD);
});
exports.changePasswordValidation = changePasswordValidation;
/**
 * The function `uploadPictureToCloudinaryService` uploads a picture to Cloudinary using the provided file path.
 */
const uploadPictureToCloudinaryService = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cloudinary_1.v2.uploader.upload(filePath, {
        folder: String(env_1.Env.get("CLOUDINARY_STORAGE_FOLDER")),
        use_filename: true,
        unique_filename: false,
        resource_type: "image",
    });
});
exports.uploadPictureToCloudinaryService = uploadPictureToCloudinaryService;
//# sourceMappingURL=user.supportive.service.js.map