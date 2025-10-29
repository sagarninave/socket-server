"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const postman_collection_1 = require("postman-collection");
const constant_1 = require("../../constant");
exports.default = new postman_collection_1.Item({
    name: "Resend Verification",
    request: {
        url: new postman_collection_1.Url({
            host: (0, utils_1.postmanRequestUrl)(constant_1.Route.AUTH, constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.RESEND_VERIFICATION.replace("/:email", "")),
            path: [":email"],
            variable: [{ key: "email", value: "sagarninave@gmail.com" }],
        }).toString(),
        method: "PUT",
        header: [new postman_collection_1.Header({ key: "Content-Type", value: "application/json" })],
    },
});
//# sourceMappingURL=resendVerification.js.map