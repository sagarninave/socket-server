"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = exports.AuthGuard = void 0;
const auth_guard_1 = __importDefault(require("./auth.guard"));
exports.AuthGuard = auth_guard_1.default;
const role_guard_1 = __importDefault(require("./role.guard"));
exports.RoleGuard = role_guard_1.default;
//# sourceMappingURL=index.js.map