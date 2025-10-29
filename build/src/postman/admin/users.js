"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const postman_collection_1 = require("postman-collection");
const constant_1 = require("../../constant");
exports.default = new postman_collection_1.Item({
    name: "Get Users List",
    request: {
        url: (0, utils_1.postmanRequestUrl)(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.ADMIN, constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.GET_ALL_USERS),
        method: "GET",
        header: [],
        auth: {
            type: "bearer",
            bearer: [{ key: "token", value: "{{authToken}}" }],
        },
    },
});
//# sourceMappingURL=users.js.map