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
exports.uploadProfilePictureController = exports.changePasswordController = exports.updateProfileController = exports.profileController = void 0;
const services_1 = require("../../services");
const utils_1 = require("../../utils");
const constant_1 = require("../../constant");
/**
 * The profileController function in TypeScript handles requests to retrieve user profile details and
 * sends appropriate responses based on the outcome.
 */
const profileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isUser = yield (0, services_1.profileService)((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (isUser) {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.OK)
            .json((0, utils_1.apiResponse)(true, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.GET_PROFILE, isUser));
    }
    else {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.INTERNAL_SERVER_ERROR)
            .json((0, utils_1.apiResponse)(false, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.SOMETHING_WENT_WRONG, null));
    }
});
exports.profileController = profileController;
/**
 * The `updateProfileController` function in TypeScript handles updating a user's profile and sends
 * appropriate responses based on the outcome.
 */
const updateProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const isUser = yield (0, services_1.updateProfileService)((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id, req === null || req === void 0 ? void 0 : req.body);
    if (isUser) {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.OK)
            .json((0, utils_1.apiResponse)(true, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.UPDATE_PROFILE, isUser));
    }
    else {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.INTERNAL_SERVER_ERROR)
            .json((0, utils_1.apiResponse)(false, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.SOMETHING_WENT_WRONG, null));
    }
});
exports.updateProfileController = updateProfileController;
/**
 * The function `changePasswordController` in TypeScript handles changing a user's password and sends
 * appropriate responses based on the outcome.
 */
const changePasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const isUser = yield (0, services_1.changePasswordService)((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.id, req === null || req === void 0 ? void 0 : req.body);
    if (isUser) {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.OK)
            .json((0, utils_1.apiResponse)(true, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.CHANGE_PASSWORD, isUser));
    }
    else {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.INTERNAL_SERVER_ERROR)
            .json((0, utils_1.apiResponse)(false, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.SOMETHING_WENT_WRONG, null));
    }
});
exports.changePasswordController = changePasswordController;
/**
 * The function `uploadProfilePictureController` handles the uploading of a user's profile picture
 * */
const uploadProfilePictureController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const user = yield (0, services_1.uploadProfilePictureService)((_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.id, req["file"].path);
    if (user) {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.OK)
            .json((0, utils_1.apiResponse)(true, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.PROFILE_PICTURE_UPLOADED, user));
    }
    else {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.INTERNAL_SERVER_ERROR)
            .json((0, utils_1.apiResponse)(false, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.SOMETHING_WENT_WRONG, null));
    }
});
exports.uploadProfilePictureController = uploadProfilePictureController;
//# sourceMappingURL=index.js.map