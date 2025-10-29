"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postman_collection_1 = require("postman-collection");
const Profile_1 = __importDefault(require("./Profile"));
const updateProfile_1 = __importDefault(require("./updateProfile"));
const changePassword_1 = __importDefault(require("./changePassword"));
const updateProfilePicture_1 = __importDefault(require("./updateProfilePicture"));
const userFolder = new postman_collection_1.ItemGroup({
    name: "User",
    item: [
        Profile_1.default,
        updateProfile_1.default,
        changePassword_1.default,
        updateProfilePicture_1.default,
    ],
});
exports.default = userFolder;
//# sourceMappingURL=index.js.map