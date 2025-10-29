"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postman_collection_1 = require("postman-collection");
const auth_1 = __importDefault(require("./auth"));
const admin_1 = __importDefault(require("./admin"));
const user_1 = __importDefault(require("./user"));
const postmanCollection = new postman_collection_1.Collection({
    info: {
        name: "Boilerplate",
    },
    item: [auth_1.default, admin_1.default, user_1.default],
});
exports.default = postmanCollection;
//# sourceMappingURL=createCollection.js.map