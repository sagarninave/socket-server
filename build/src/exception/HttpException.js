"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../constant");
class HttpException extends Error {
    constructor(statusCode, message) {
        super(message.replace(/['"]+/g, ""));
        this.statusCode = statusCode !== null && statusCode !== void 0 ? statusCode : constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.INTERNAL_SERVER_ERROR;
        Object.setPrototypeOf(this, HttpException.prototype);
    }
}
exports.default = HttpException;
//# sourceMappingURL=HttpException.js.map