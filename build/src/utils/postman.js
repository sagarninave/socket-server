"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postmanRequestBody = exports.postmanRequestUrl = void 0;
const constant_1 = require("../constant");
const postmanRequestUrl = (module = "", controller = "") => {
    return `{{baseUrl}}${constant_1.VERSION}${module}${controller}`;
};
exports.postmanRequestUrl = postmanRequestUrl;
const postmanRequestBody = (body) => JSON.stringify(body, null, 2);
exports.postmanRequestBody = postmanRequestBody;
//# sourceMappingURL=postman.js.map