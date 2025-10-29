"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSchema = exports.ResetPasswordSchema = exports.VerificationSchema = exports.UserSchema = void 0;
const user_schema_1 = __importDefault(require("./user.schema"));
exports.UserSchema = user_schema_1.default;
const verification_schema_1 = __importDefault(require("./verification.schema"));
exports.VerificationSchema = verification_schema_1.default;
const resetPassword_schema_1 = __importDefault(require("./resetPassword.schema"));
exports.ResetPasswordSchema = resetPassword_schema_1.default;
const session_schema_1 = __importDefault(require("./session.schema"));
exports.SessionSchema = session_schema_1.default;
//# sourceMappingURL=index.js.map