"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const postman_collection_1 = require("postman-collection");
const constant_1 = require("../../constant");
exports.default = new postman_collection_1.Item({
    name: "Get User Details",
    request: {
        url: new postman_collection_1.Url({
            host: (0, utils_1.postmanRequestUrl)(constant_1.Route.ADMIN, constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.USER),
            path: [":id"],
            variable: [{ key: "id", value: "68c998f39a6c15776f3f3125" }],
            query: [],
        }).toString(),
        method: "GET",
        header: [],
        auth: {
            type: "bearer",
            bearer: [{ key: "token", value: "{{authToken}}" }],
        },
    },
});
//# sourceMappingURL=user.js.map