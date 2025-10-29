"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../constant");
const utils_1 = require("../utils");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const RateLimiter = (0, express_rate_limit_1.default)({
    max: 100,
    windowMs: 15 * 60 * 1000,
    handler: (_req, res) => {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.TOO_MANY_REQUESTS)
            .json((0, utils_1.apiResponse)(false, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.RATE_LIMIT, null));
    },
});
exports.default = RateLimiter;
//# sourceMappingURL=rateLimit.config.js.map