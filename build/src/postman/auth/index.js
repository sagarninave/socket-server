"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postman_collection_1 = require("postman-collection");
const signup_1 = __importDefault(require("./signup"));
const login_1 = __importDefault(require("./login"));
const verification_1 = __importDefault(require("./verification"));
const resendVerification_1 = __importDefault(require("./resendVerification"));
const setNewPassword_1 = __importDefault(require("./setNewPassword"));
const resetPassword_1 = __importDefault(require("./resetPassword"));
const logout_1 = __importDefault(require("./logout"));
const authFolder = new postman_collection_1.ItemGroup({
    name: "Auth",
    item: [
        signup_1.default,
        login_1.default,
        verification_1.default,
        resendVerification_1.default,
        setNewPassword_1.default,
        resetPassword_1.default,
        logout_1.default,
    ],
});
exports.default = authFolder;
//# sourceMappingURL=index.js.map