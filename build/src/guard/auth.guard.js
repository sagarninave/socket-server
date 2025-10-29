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
const exception_1 = require("../exception");
const constant_1 = require("../constant");
const utils_1 = require("../utils");
const services_1 = require("../services");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * The AuthGuard function is used to verify and decode a JWT token from the request headers for
 * authentication purposes.
 */
const AuthGuard = (0, exception_1.TryCatch)((req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["authorization"];
    if (!token)
        throwHttpTokenException();
    const tokenKeys = token.split(" ");
    if (tokenKeys.length < 2)
        throwHttpTokenException();
    const isDecoded = yield getVerifiedToken(tokenKeys[1]);
    checkTokenAndExpiry(isDecoded);
    checkIssuerAndAudience(isDecoded);
    req.user = getRequestUser(isDecoded);
    next();
}));
/**
 * The function `throwHttpTokenException` throws an `HttpException` with an unauthorized token message
 * and status code.
 */
const throwHttpTokenException = (message = "") => {
    throw new exception_1.HttpException(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.UNAUTHORIZED, message || (constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.UNAUTHORIZED_TOKEN));
};
/**
 * The function `getVerifiedToken` asynchronously verifies a token using a JWT secret key retrieved
 * from the environment configuration.
 */
const getVerifiedToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield jsonwebtoken_1.default.verify(token, services_1.Env.get("JWT_ACCESS_TOKEN_SECRET_KEY"));
    }
    catch (error) {
        throwHttpTokenException(constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.INVALID_JWT);
    }
});
/**
 * The function `checkTokenAndExpiry` validates a decoded token and checks its expiry date.
 */
const checkTokenAndExpiry = (isDecoded) => {
    if (!isDecoded)
        throwHttpTokenException();
    const expiryDate = new Date((isDecoded === null || isDecoded === void 0 ? void 0 : isDecoded.exp) * 1000);
    if (isDecoded && new Date() > expiryDate)
        throwHttpTokenException();
};
/**
 * The function `checkIssuerAndAudience` validates the issuer and audience of a decoded token using
 * encryption keys and environment configuration.
 */
const checkIssuerAndAudience = (isDecoded) => {
    const encryptionKey = String(services_1.Env.get("ENCRYPTION_KEY"));
    const issuer = String(services_1.Env.get("ISSUER"));
    const audience = String(services_1.Env.get("AUDIENCE"));
    const audienceDecoded = (0, utils_1.decrypt)(isDecoded === null || isDecoded === void 0 ? void 0 : isDecoded.aud, encryptionKey);
    const issuerDecoded = (0, utils_1.decrypt)(isDecoded === null || isDecoded === void 0 ? void 0 : isDecoded.iss, encryptionKey);
    if (issuerDecoded !== issuer)
        throwHttpTokenException();
    if (audienceDecoded !== audience)
        throwHttpTokenException();
};
/**
 * The function getRequestUser returns user information based on a decoded object.
 */
const getRequestUser = (isDecoded) => ({
    id: isDecoded === null || isDecoded === void 0 ? void 0 : isDecoded._id,
    firstName: isDecoded === null || isDecoded === void 0 ? void 0 : isDecoded.firstName,
    lastName: isDecoded === null || isDecoded === void 0 ? void 0 : isDecoded.lastName,
    email: isDecoded === null || isDecoded === void 0 ? void 0 : isDecoded.email,
    role: isDecoded === null || isDecoded === void 0 ? void 0 : isDecoded.role,
});
exports.default = AuthGuard;
//# sourceMappingURL=auth.guard.js.map