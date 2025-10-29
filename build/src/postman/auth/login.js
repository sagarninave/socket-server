"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const postman_collection_1 = require("postman-collection");
const constant_1 = require("../../constant");
exports.default = new postman_collection_1.Item({
    name: "Login",
    request: {
        url: (0, utils_1.postmanRequestUrl)(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.AUTH, constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.LOGIN),
        method: "POST",
        body: {
            mode: "raw",
            raw: (0, utils_1.postmanRequestBody)({
                email: "sagarninave@gmail.com",
                password: "Password@123",
            }),
        },
        header: [new postman_collection_1.Header({ key: "Content-Type", value: "application/json" })],
    },
    events: [
        {
            listen: "test",
            script: {
                type: "text/javascript",
                exec: [
                    "const jsonData = pm.response.json();",
                    "pm.environment.set('authToken', jsonData.data.accessToken);",
                ],
            },
        },
    ],
});
//# sourceMappingURL=login.js.map