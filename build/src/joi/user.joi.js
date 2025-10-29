"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.userUpdateSchema = void 0;
const constant_1 = require("../constant");
const unknown_joi_1 = __importDefault(require("./unknown.joi"));
const joi_1 = __importDefault(require("joi"));
exports.userUpdateSchema = (0, unknown_joi_1.default)(joi_1.default.object({
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
}));
exports.changePasswordSchema = (0, unknown_joi_1.default)(joi_1.default.object({
    currentPassword: joi_1.default.string().required().messages({
        "string.empty": "Password is required.",
    }),
    newPassword: joi_1.default.string()
        .required()
        .min(8)
        .max(16)
        .pattern(constant_1.RegExp === null || constant_1.RegExp === void 0 ? void 0 : constant_1.RegExp.passwordRegExp)
        .messages({
        "string.empty": "New password is required.",
        "string.base": "New password should contain characters.",
        "string.min": "New password should be minimum 8 character long.",
        "string.max": "New password should be maximum 16 character long.",
        "string.pattern.base": "New password should include at least one uppercase letter, one lowercase letter, one digit, and one special character",
    }),
    confirmPassword: joi_1.default.any()
        .equal(joi_1.default.ref("newPassword"))
        .required()
        .label("Confirm password")
        .messages({
        "any.only": "Confirm password does not match with new password",
    }),
}));
//# sourceMappingURL=user.joi.js.map