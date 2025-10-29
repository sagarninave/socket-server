"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const postman_collection_1 = require("postman-collection");
const constant_1 = require("../../constant");
exports.default = new postman_collection_1.Item({
    name: "Verification",
    request: {
        url: (0, utils_1.postmanRequestUrl)(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.AUTH, constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.VERIFICATION),
        method: "PUT",
        body: {
            mode: "raw",
            raw: (0, utils_1.postmanRequestBody)({
                userId: "68c998f39a6c15776f3f3125",
                verificationToken: "68c9a25cf2d64c61c1655997",
            }),
        },
        header: [new postman_collection_1.Header({ key: "Content-Type", value: "application/json" })],
    },
});
//# sourceMappingURL=verification.js.map