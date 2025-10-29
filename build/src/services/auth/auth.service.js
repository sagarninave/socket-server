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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutService = exports.setNewPasswordService = exports.resetPasswordService = exports.resendVerificationService = exports.verificationService = exports.loginService = exports.signupService = void 0;
const constant_1 = require("../../constant");
const joi_1 = require("../../joi");
const schema_1 = require("../../schema");
const _1 = require(".");
const email_1 = require("../email");
const exception_1 = require("../../exception");
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * The `signupService` function in TypeScript handles user signup by validating input, creating a new
 * user, sending a signup email, and verifying the email address.
 */
const signupService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = joi_1.signupJoiSchema.validate(body);
    if (error)
        throw new exception_1.HttpException(constant_1.StatusCode.BAD_REQUEST, error.message);
    const { firstName, lastName, email: rawEmail, password } = value;
    const email = rawEmail.toLowerCase().trim();
    const existingUser = yield schema_1.UserSchema.findOne({ email });
    if (existingUser) {
        throw new exception_1.HttpException(constant_1.StatusCode.CONFLICT, constant_1.Message.USER_ALREADY_EXISTS);
    }
    const userCreated = yield new schema_1.UserSchema({
        firstName,
        lastName,
        email,
        password,
    }).save();
    if (!userCreated)
        return null;
    const verificationToken = yield new schema_1.VerificationSchema({
        userId: userCreated._id,
        token: new mongoose_1.default.Types.ObjectId(),
    }).save();
    if (!verificationToken)
        return null;
    const [signupEmailSent, verificationEmailSent] = yield Promise.allSettled([
        (0, email_1.signupEmailSend)(userCreated),
        (0, email_1.verificationEmailSend)(userCreated, verificationToken.token.toString()),
    ]);
    return signupEmailSent && verificationEmailSent ? userCreated : null;
});
exports.signupService = signupService;
/**
 * The loginService function validates user login credentials, checks authorization, updates last login
 * time, sends a login email, and returns a login token.
 */
const loginService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = joi_1.loginJoiSchema.validate(body);
    if (error)
        throw new exception_1.HttpException(constant_1.StatusCode.BAD_REQUEST, error.message);
    const email = value.email.toLowerCase().trim();
    const user = yield schema_1.UserSchema.findOne({ email });
    yield (0, _1.validateLoginUser)(user, value); // Throws if invalid
    const token = (0, _1.getLoginToken)(user);
    if (!(token === null || token === void 0 ? void 0 : token.accessToken) || !(token === null || token === void 0 ? void 0 : token.refreshToken))
        return null;
    user.lastLogin = new Date();
    const updatedUser = yield user.save();
    const session = yield schema_1.SessionSchema.create({
        userId: user._id,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
    });
    const emailSent = yield (0, email_1.loginEmailSend)(user);
    return updatedUser && session && emailSent ? token : null;
});
exports.loginService = loginService;
/**
 * The function `verificationService` validates a user's verification token and updates their
 * verification status in a TypeScript application.
 */
const verificationService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = joi_1.verificationJoiSchema.validate(body);
    if (error) {
        throw new exception_1.HttpException(constant_1.StatusCode.BAD_REQUEST, error.message);
    }
    const { userId, verificationToken } = value;
    const user = yield schema_1.UserSchema.findById(userId);
    if (!user) {
        throw new exception_1.HttpException(constant_1.StatusCode.NOT_FOUND, constant_1.Message.USER_NOT_EXISTS);
    }
    (0, _1.validateUserVerification)(user);
    const tokenRecord = yield schema_1.VerificationSchema.findOne({ userId });
    (0, _1.validateVerification)(tokenRecord, verificationToken);
    user.isVerified = true;
    const updatedUser = yield user.save();
    if (!updatedUser)
        return null;
    const { acknowledged, deletedCount } = yield schema_1.VerificationSchema.deleteOne({
        _id: tokenRecord === null || tokenRecord === void 0 ? void 0 : tokenRecord._id,
    });
    return acknowledged && deletedCount ? updatedUser : null;
});
exports.verificationService = verificationService;
/**
 * The function `resendVerificationService` validates a query, retrieves a user by email, checks if a
 * verification token exists for the user, and resends an email verification token if one is found.
 */
const resendVerificationService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = joi_1.resendVerificationJoiSchema.validate(body);
    if (error) {
        throw new exception_1.HttpException(constant_1.StatusCode.BAD_REQUEST, error.message);
    }
    const email = value.email.toLowerCase().trim();
    const user = yield schema_1.UserSchema.findOne({ email });
    if (!user) {
        throw new exception_1.HttpException(constant_1.StatusCode.NOT_FOUND, constant_1.Message.USER_NOT_EXISTS);
    }
    const verificationToken = yield new schema_1.VerificationSchema({
        userId: user._id,
        token: new mongoose_1.default.Types.ObjectId(),
    }).save();
    const emailSent = yield (0, email_1.verificationEmailSend)(user, String(verificationToken.token));
    return emailSent ? verificationToken : null;
});
exports.resendVerificationService = resendVerificationService;
/**
 * The function `resetPasswordService` in TypeScript handles resetting a user's password by validating
 * input, retrieving user information, and creating a reset password token.
 */
const resetPasswordService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = joi_1.resetPasswordJoiSchema.validate(body);
    if (error)
        throw new exception_1.HttpException(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.BAD_REQUEST, error === null || error === void 0 ? void 0 : error.message);
    const email = value === null || value === void 0 ? void 0 : value.email.toLocaleLowerCase().trim();
    const user = yield schema_1.UserSchema.findOne({ email });
    if (!user)
        throw new exception_1.HttpException(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.BAD_REQUEST, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.USER_NOT_EXISTS);
    return yield (0, _1.createResetPasswordToken)(user);
});
exports.resetPasswordService = resetPasswordService;
/**
 * The setNewPasswordService function in TypeScript sets a new password for a user after validating
 * input and deleting the reset password token.
 */
const setNewPasswordService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = joi_1.setNewPasswordJoiSchema.validate(body);
    if (error)
        throw new exception_1.HttpException(constant_1.StatusCode.BAD_REQUEST, error.message);
    const user = yield schema_1.UserSchema.findById(value.userId);
    yield (0, _1.setNewPasswordValidation)(user, value);
    const passwordToken = yield schema_1.ResetPasswordSchema.findOne({
        userId: value.userId,
    });
    (0, _1.setNewPasswordTokenValidation)(passwordToken, value);
    user.password = value.newPassword;
    const isUserUpdated = yield user.save();
    if (!isUserUpdated)
        return null;
    const { acknowledged, deletedCount } = yield schema_1.ResetPasswordSchema.deleteOne({
        _id: passwordToken === null || passwordToken === void 0 ? void 0 : passwordToken._id,
    });
    if (acknowledged && deletedCount)
        return isUserUpdated;
    return null;
});
exports.setNewPasswordService = setNewPasswordService;
/**
 * This TypeScript function logs out a user by deleting their session based on the provided access
 * token.
 */
const logoutService = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const isSession = yield schema_1.SessionSchema.deleteOne({
        accessToken: accessToken.split(" ")[1],
    });
    if ((isSession === null || isSession === void 0 ? void 0 : isSession.acknowledged) && (isSession === null || isSession === void 0 ? void 0 : isSession.deletedCount))
        return true;
    return null;
});
exports.logoutService = logoutService;
//# sourceMappingURL=auth.service.js.map