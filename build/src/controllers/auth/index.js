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
exports.logoutController = exports.setNewPasswordController = exports.resetPasswordController = exports.resendVerificationController = exports.verificationController = exports.loginController = exports.signupController = void 0;
const services_1 = require("../../services");
const constant_1 = require("../../constant");
const utils_1 = require("../../utils");
/**
 * Handles user signupController requests, calling a service to create a new user and returning responses accordingly.
 */
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserCreated = yield (0, services_1.signupService)(req.body);
    if (isUserCreated) {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.CREATED)
            .json((0, utils_1.apiResponse)(true, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.USER_REGISTER, null));
    }
    else {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.INTERNAL_SERVER_ERROR)
            .json((0, utils_1.apiResponse)(false, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.SOMETHING_WENT_WRONG, null));
    }
});
exports.signupController = signupController;
/**
 * The `loginController` function in TypeScript handles user loginController by calling a service, checking if the user
 * exists, and returning an appropriate response.
 */
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield (0, services_1.loginService)(req.body);
    if (token) {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.OK)
            .json((0, utils_1.apiResponse)(true, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.USER_LOGGED_IN, token));
    }
    else {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.INTERNAL_SERVER_ERROR)
            .json((0, utils_1.apiResponse)(false, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.SOMETHING_WENT_WRONG, null));
    }
});
exports.loginController = loginController;
/**
 * The verificationController function in TypeScript handles email verification and sends appropriate
 * responses based on the verification status.
 */
const verificationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isVerified = yield (0, services_1.verificationService)(req.body);
    if (isVerified) {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.OK)
            .json((0, utils_1.apiResponse)(true, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.EMAIL_VERIFICATION, null));
    }
    else {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.INTERNAL_SERVER_ERROR)
            .json((0, utils_1.apiResponse)(false, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.SOMETHING_WENT_WRONG, null));
    }
});
exports.verificationController = verificationController;
/**
 * The function `resendVerificationController` handles resending email verification based on the
 * verification status.
 */
const resendVerificationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isVerified = yield (0, services_1.resendVerificationService)(req.params);
    if (isVerified) {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.OK)
            .json((0, utils_1.apiResponse)(true, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.EMAIL_VERIFICATION_RESEND, null));
    }
    else {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.INTERNAL_SERVER_ERROR)
            .json((0, utils_1.apiResponse)(false, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.SOMETHING_WENT_WRONG, null));
    }
});
exports.resendVerificationController = resendVerificationController;
/**
 * The resetPasswordController function handles the logic for resending email verification for
 * forgotten passwords.
 */
const resetPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isResetEmail = yield (0, services_1.resetPasswordService)(req.params);
    if (isResetEmail) {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.OK)
            .json((0, utils_1.apiResponse)(true, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.RESET_PASSWORD_EMAIL, null));
    }
    else {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.INTERNAL_SERVER_ERROR)
            .json((0, utils_1.apiResponse)(false, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.SOMETHING_WENT_WRONG, null));
    }
});
exports.resetPasswordController = resetPasswordController;
/**
 * The function setNewPasswordController handles setting a new password and sends appropriate responses
 * based on the outcome.
 */
const setNewPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield (0, services_1.setNewPasswordService)(req.body);
    if (updatedUser) {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.OK)
            .json((0, utils_1.apiResponse)(true, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.SET_NEW_PASSWORD, null));
    }
    else {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.INTERNAL_SERVER_ERROR)
            .json((0, utils_1.apiResponse)(false, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.SOMETHING_WENT_WRONG, null));
    }
});
exports.setNewPasswordController = setNewPasswordController;
/**
 * The `logoutController` function handles logging out a user and returns appropriate responses based
 * on the outcome.
 */
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isLoggedOut = yield (0, services_1.logoutService)((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization);
    if (isLoggedOut) {
        res.status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.OK).json((0, utils_1.apiResponse)(true, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.LOG_OUT, null));
    }
    else {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.INTERNAL_SERVER_ERROR)
            .json((0, utils_1.apiResponse)(false, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.SOMETHING_WENT_WRONG, null));
    }
});
exports.logoutController = logoutController;
//# sourceMappingURL=index.js.map