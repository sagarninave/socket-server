"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = exports.UserRouter = exports.AuthRouter = void 0;
const auth_router_1 = __importDefault(require("./auth.router"));
exports.AuthRouter = auth_router_1.default;
const user_router_1 = __importDefault(require("./user.router"));
exports.UserRouter = user_router_1.default;
const admin_router_1 = __importDefault(require("./admin.router"));
exports.AdminRouter = admin_router_1.default;
//# sourceMappingURL=index.js.map