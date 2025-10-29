"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postman_collection_1 = require("postman-collection");
const services_1 = require("../services");
const environment = {
    id: "dev-env-id",
    name: String(services_1.Env.get("NODE_ENVIRONMENT")),
    values: [
        new postman_collection_1.Variable({ key: "baseUrl", value: String(services_1.Env.get("ISSUER")) }),
        new postman_collection_1.Variable({ key: "authToken", value: "SOME_TOKEN" }),
    ],
};
exports.default = environment;
//# sourceMappingURL=createEnvironment.js.map