"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorController = exports.invalidEndpointController = exports.indexController = void 0;
const constant_1 = require("../../constant");
const utils_1 = require("../../utils");
/**
 * The `indexController` function in TypeScript sends a "Hello World" response using the Express
 * `Response` object.
 */
const indexController = (_req, res) => {
    res
        .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.OK)
        .json((0, utils_1.apiResponse)(false, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.HELLO_WORLD, null));
};
exports.indexController = indexController;
/**
 * The function `invalidEndpointController` handles requests to invalid endpoints by returning a 404
 * status code and a corresponding error message.
 */
const invalidEndpointController = (req, res) => {
    res
        .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.NOT_FOUND)
        .json((0, utils_1.apiResponse)(false, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.INVALID_ENDPOINT.replace("<URL>", req.originalUrl), null));
};
exports.invalidEndpointController = invalidEndpointController;
/**
 * The errorController function handles errors by sending an internal server error response with the
 * error message.
 */
const errorController = (error, _req, res, next) => {
    res
        .status((error === null || error === void 0 ? void 0 : error.statusCode) || (constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.INTERNAL_SERVER_ERROR))
        .json((0, utils_1.apiResponse)(false, (error === null || error === void 0 ? void 0 : error.message) || (constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.SOMETHING_WENT_WRONG), null));
};
exports.errorController = errorController;
//# sourceMappingURL=index.js.map