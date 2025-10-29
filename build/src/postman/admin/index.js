"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postman_collection_1 = require("postman-collection");
const updateUserRole_1 = __importDefault(require("./updateUserRole"));
const users_1 = __importDefault(require("./users"));
const user_1 = __importDefault(require("./user"));
const adminFolder = new postman_collection_1.ItemGroup({
    name: "Admin",
    item: [users_1.default, user_1.default, updateUserRole_1.default],
});
exports.default = adminFolder;
//# sourceMappingURL=index.js.map