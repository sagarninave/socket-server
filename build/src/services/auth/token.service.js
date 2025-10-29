"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoginToken = void 0;
const utils_1 = require("../../utils");
const __1 = require("../");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * The function `getLoginToken` generates access and refresh tokens for a user based on provided user
 * information and environment configuration.
 */
const getLoginToken = (user) => {
    const jwtSecretKey = __1.Env.get("JWT_ACCESS_TOKEN_SECRET_KEY");
    const jwtSecretKeyExpiry = __1.Env.get("JWT_ACCESS_TOKEN_SECRET_KEY_EXPIRY");
    const jwtRefreshKey = __1.Env.get("JWT_REFRESH_TOKEN_SECRET_KEY");
    const jwtRefreshKeyExpiry = __1.Env.get("JWT_REFRESH_TOKEN_SECRET_KEY_EXPIRY");
    const encryptionKey = __1.Env.get("ENCRYPTION_KEY");
    const issuer = __1.Env.get("ISSUER");
    const audience = __1.Env.get("AUDIENCE");
    const tokenUser = {
        _id: user === null || user === void 0 ? void 0 : user._id,
        firstName: user === null || user === void 0 ? void 0 : user.firstName,
        lastName: user === null || user === void 0 ? void 0 : user.lastName,
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(tokenUser, jwtSecretKey, {
        expiresIn: jwtSecretKeyExpiry,
        issuer: (0, utils_1.encrypt)(issuer, encryptionKey),
        audience: (0, utils_1.encrypt)(audience, encryptionKey),
    });
    const refreshToken = jsonwebtoken_1.default.sign(tokenUser, jwtRefreshKey, {
        expiresIn: jwtRefreshKeyExpiry,
        issuer: (0, utils_1.encrypt)(issuer, encryptionKey),
        audience: (0, utils_1.encrypt)(audience, encryptionKey),
    });
    return {
        accessToken,
        refreshToken,
    };
};
exports.getLoginToken = getLoginToken;
//# sourceMappingURL=token.service.js.map