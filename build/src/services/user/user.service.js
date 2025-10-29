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
exports.uploadProfilePictureService = exports.changePasswordService = exports.updateProfileService = exports.profileService = void 0;
const _1 = require(".");
const joi_1 = require("../../joi");
const constant_1 = require("../../constant");
const email_1 = require("../email");
const exception_1 = require("../../exception");
const schema_1 = require("../../schema");
const utils_1 = require("../../utils");
/**
 * The profileService function retrieves user profile information excluding sensitive data based on the
 * provided userId.
 */
const profileService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return schema_1.UserSchema.findById(userId).select("_id firstName lastName email role avatar");
});
exports.profileService = profileService;
/**
 * The function `updateProfileService` updates a user's profile information in a TypeScript
 * application.
 */
const updateProfileService = (userId, body) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = joi_1.userUpdateSchema.validate(body);
    if (error)
        throw new exception_1.HttpException(constant_1.StatusCode.BAD_REQUEST, error.message);
    const user = yield schema_1.UserSchema.findById(userId);
    if (!user)
        throw new exception_1.HttpException(constant_1.StatusCode.UNAUTHORIZED, constant_1.Message.UNAUTHORIZED);
    if (value.firstName)
        user.firstName = value.firstName;
    if (value.lastName)
        user.lastName = value.lastName;
    return yield user.save();
});
exports.updateProfileService = updateProfileService;
/**
 * The function `changePasswordService` in TypeScript is used to change a user's password after
 * validating the input and updating the user's password in the database.
 */
const changePasswordService = (userId, body) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = joi_1.changePasswordSchema.validate(body);
    if (error)
        throw new exception_1.HttpException(constant_1.StatusCode.BAD_REQUEST, error.message);
    const user = yield schema_1.UserSchema.findById(userId);
    (0, _1.changePasswordValidation)(user, value);
    user.password = value.newPassword;
    const updatedUser = yield user.save();
    const emailSent = yield (0, email_1.changePasswordEmailSend)(updatedUser);
    return updatedUser && emailSent ? updatedUser : null;
});
exports.changePasswordService = changePasswordService;
/**
 * The function `uploadProfilePictureService` uploads a user's profile picture to a cloud service and
 * updates the user's avatar URL in the database.
 */
const uploadProfilePictureService = (userId, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const [user, uploaded] = yield Promise.all([
        schema_1.UserSchema.findById(userId),
        (0, _1.uploadPictureToCloudinaryService)(filePath),
    ]);
    if (!user || !uploaded)
        return null;
    user.avatar = uploaded.url;
    const updatedUser = yield user.save();
    (0, utils_1.removeFile)(filePath);
    return updatedUser;
});
exports.uploadProfilePictureService = uploadProfilePictureService;
//# sourceMappingURL=user.service.js.map