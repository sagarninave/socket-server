"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const postman_collection_1 = require("postman-collection");
const constant_1 = require("../../constant");
exports.default = new postman_collection_1.Item({
    name: "Update Profile Picture",
    request: {
        url: (0, utils_1.postmanRequestUrl)(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.USER, constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.UPLOAD_PROFILE_PICTURE),
        method: "PUT",
        body: {
            mode: "formdata",
            formdata: [
                new postman_collection_1.FormParam({
                    key: "image",
                    value: "./pathway.png", // file path
                }),
            ],
        },
        header: [new postman_collection_1.Header({ key: "Content-Type", value: "application/json" })],
        auth: {
            type: "bearer",
            bearer: [{ key: "token", value: "{{authToken}}" }],
        },
    },
});
//# sourceMappingURL=updateProfilePicture.js.map