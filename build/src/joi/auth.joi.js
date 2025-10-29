"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNewPasswordJoiSchema = exports.resetPasswordJoiSchema = exports.resendVerificationJoiSchema = exports.verificationJoiSchema = exports.loginJoiSchema = exports.signupJoiSchema = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const constant_1 = require("../constant");
const joi_1 = __importDefault(require("joi"));
const unknown_joi_1 = __importDefault(require("./unknown.joi"));
exports.signupJoiSchema = (0, unknown_joi_1.default)(joi_1.default.object({
    firstName: joi_1.default.string().required().min(3).max(16).messages({
        "string.empty": "First name is required.",
        "string.base": "First name should contain characters.",
        "string.min": "First name should be minimum 3 character long.",
        "string.max": "First name should be maximum 16 character long.",
    }),
    lastName: joi_1.default.string().required().min(3).max(16).messages({
        "string.empty": "Last name is required.",
        "string.base": "Last name should contain characters.",
        "string.min": "Last name should be minimum 3 character long.",
        "string.max": "Last name should be maximum 16 character long.",
    }),
    email: joi_1.default.string()
        .required()
        .min(8)
        .max(30)
        .pattern(constant_1.RegExp === null || constant_1.RegExp === void 0 ? void 0 : constant_1.RegExp.emailRegExp)
        .messages({
        "string.empty": "Email is required.",
        "string.base": "Email should contain characters.",
        "string.min": "Email should be minimum 8 character long.",
        "string.max": "Email should be maximum 30 character long.",
        "string.pattern.base": "Email must be a valid email address",
    }),
    password: joi_1.default.string()
        .required()
        .min(8)
        .max(16)
        .pattern(constant_1.RegExp === null || constant_1.RegExp === void 0 ? void 0 : constant_1.RegExp.passwordRegExp)
        .messages({
        "string.empty": "Password is required.",
        "string.base": "Password should contain characters.",
        "string.min": "Password should be minimum 8 character long.",
        "string.max": "Password should be maximum 16 character long.",
        "string.pattern.base": "Password should include at least one uppercase letter, one lowercase letter, one digit, and one special character",
    }),
}));
exports.loginJoiSchema = (0, unknown_joi_1.default)(joi_1.default.object({
    email: joi_1.default.string().required().messages({
        "string.empty": "Email is required.",
    }),
    password: joi_1.default.string().required().messages({
        "string.empty": "Password is required.",
    }),
}));
exports.verificationJoiSchema = (0, unknown_joi_1.default)(joi_1.default.object({
    userId: joi_1.default.string().required().messages({
        "string.empty": "User ID is required.",
    }),
    verificationToken: joi_1.default.string().required().messages({
        "string.empty": "Verification token is required.",
    }),
}));
exports.resendVerificationJoiSchema = (0, unknown_joi_1.default)(joi_1.default.object({
    email: joi_1.default.string().required().messages({
        "string.empty": "Email is required.",
    }),
}));
exports.resetPasswordJoiSchema = (0, unknown_joi_1.default)(joi_1.default.object({
    email: joi_1.default.string().required().messages({
        "string.empty": "Email is required.",
    }),
}));
exports.setNewPasswordJoiSchema = (0, unknown_joi_1.default)(joi_1.default.object({
    userId: joi_1.default.string().required().messages({
        "string.empty": "User ID is required.",
    }),
    token: joi_1.default.string().required().messages({
        "string.empty": "Token is required.",
    }),
    newPassword: joi_1.default.string().required().messages({
        "string.empty": "Password is required.",
    }),
    confirmPassword: joi_1.default.any()
        .equal(joi_1.default.ref("newPassword"))
        .required()
        .label("Confirm password")
        .messages({
        "any.only": "Confirm password does not match with new password",
    }),
}));
//# sourceMappingURL=auth.joi.js.map