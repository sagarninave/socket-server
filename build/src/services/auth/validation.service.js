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
exports.setNewPasswordTokenValidation = exports.setNewPasswordValidation = exports.validateVerification = exports.validateUserVerification = exports.validateLoginUser = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const bcrypt_1 = require("bcrypt");
const constant_1 = require("../../constant");
const exception_1 = require("../../exception");
/**
 * The function `validateLoginUser` checks if a user is authorized to login based on their verification
 * status and password.
 */
const validateLoginUser = (user, value) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        throw new exception_1.HttpException(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.UNAUTHORIZED, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.UNAUTHORIZED);
    if (user && !(user === null || user === void 0 ? void 0 : user.isVerified))
        throw new exception_1.HttpException(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.UNAUTHORIZED, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.UNAUTHORIZED);
    const isAuthorized = yield (0, bcrypt_1.compare)(value === null || value === void 0 ? void 0 : value.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isAuthorized)
        throw new exception_1.HttpException(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.UNAUTHORIZED, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.UNAUTHORIZED);
});
exports.validateLoginUser = validateLoginUser;
/**
 * The function `validateUserVerification` checks if a user exists and if their email is already
 * verified.
 */
const validateUserVerification = (user) => {
    if (!user)
        throw new exception_1.HttpException(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.NOT_FOUND, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.USER_NOT_EXISTS);
    if (user === null || user === void 0 ? void 0 : user.isVerified)
        throw new exception_1.HttpException(constant_1.StatusCode.OK, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.EMAIL_ALREADY_VERIFIED);
};
exports.validateUserVerification = validateUserVerification;
/**
 * The function `validateVerification` checks if a verification token is valid based on its expiration
 * date and token value.
 */
const validateVerification = (isVerificationToken, verificationToken) => {
    if (!isVerificationToken)
        throw new exception_1.HttpException(constant_1.StatusCode.BAD_REQUEST, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.VERIFICATION_TOKEN_EXPIRED);
    if ((isVerificationToken === null || isVerificationToken === void 0 ? void 0 : isVerificationToken.token.toString()) !== verificationToken)
        throw new exception_1.HttpException(constant_1.StatusCode.BAD_REQUEST, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.VERIFICATION_TOKEN_EXPIRED);
    if (new Date(isVerificationToken === null || isVerificationToken === void 0 ? void 0 : isVerificationToken.expiredAt) <= new Date())
        throw new exception_1.HttpException(constant_1.StatusCode.BAD_REQUEST, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.VERIFICATION_TOKEN_EXPIRED);
};
exports.validateVerification = validateVerification;
const setNewPasswordValidation = (user, body) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        throw new exception_1.HttpException(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.BAD_REQUEST, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.USER_NOT_EXISTS);
    if (yield (0, bcrypt_1.compare)(body.newPassword, user.password))
        throw new exception_1.HttpException(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.BAD_REQUEST, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.SAME_NEW_CURRENT_PASSWORD);
});
exports.setNewPasswordValidation = setNewPasswordValidation;
/**
 * The function `setNewPasswordTokenValidation` validates a password token against a provided token.
 */
const setNewPasswordTokenValidation = (passwordToken, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
body) => {
    if (!passwordToken)
        throw new exception_1.HttpException(constant_1.StatusCode.BAD_REQUEST, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.RESEND_RESET_PASSWORD_REQUEST);
    if ((passwordToken === null || passwordToken === void 0 ? void 0 : passwordToken.token.toString()) !== (body === null || body === void 0 ? void 0 : body.token))
        throw new exception_1.HttpException(constant_1.StatusCode.BAD_REQUEST, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.INCORRECT_SET_NEW_PASSWORD_TOKEN);
    if (new Date(passwordToken === null || passwordToken === void 0 ? void 0 : passwordToken.expiredAt) <= new Date())
        throw new exception_1.HttpException(constant_1.StatusCode.BAD_REQUEST, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.SET_NEW_PASSWORD_TOKEN_EXPIRED);
};
exports.setNewPasswordTokenValidation = setNewPasswordTokenValidation;
//# sourceMappingURL=validation.service.js.map