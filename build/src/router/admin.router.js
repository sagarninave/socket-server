"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("../controllers/admin");
const enum_1 = require("../enum");
const constant_1 = require("../constant");
const guard_1 = require("../guard");
const exception_1 = require("../exception");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.GET_ALL_USERS, guard_1.AuthGuard, (0, guard_1.RoleGuard)([enum_1.EUserRoles === null || enum_1.EUserRoles === void 0 ? void 0 : enum_1.EUserRoles.ADMIN, enum_1.EUserRoles === null || enum_1.EUserRoles === void 0 ? void 0 : enum_1.EUserRoles.MANAGER, enum_1.EUserRoles === null || enum_1.EUserRoles === void 0 ? void 0 : enum_1.EUserRoles.MEMBER]), (0, exception_1.TryCatch)(admin_1.getAllUsersController));
router.get(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.GET_USER, guard_1.AuthGuard, (0, guard_1.RoleGuard)([enum_1.EUserRoles === null || enum_1.EUserRoles === void 0 ? void 0 : enum_1.EUserRoles.ADMIN, enum_1.EUserRoles === null || enum_1.EUserRoles === void 0 ? void 0 : enum_1.EUserRoles.MANAGER, enum_1.EUserRoles === null || enum_1.EUserRoles === void 0 ? void 0 : enum_1.EUserRoles.MEMBER]), (0, exception_1.TryCatch)(admin_1.getUserController));
router.put(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.UPDATE_USER_ROLE, guard_1.AuthGuard, (0, guard_1.RoleGuard)([enum_1.EUserRoles === null || enum_1.EUserRoles === void 0 ? void 0 : enum_1.EUserRoles.ADMIN, enum_1.EUserRoles === null || enum_1.EUserRoles === void 0 ? void 0 : enum_1.EUserRoles.MANAGER]), (0, exception_1.TryCatch)(admin_1.updateUserRoleController));
exports.default = router;
//# sourceMappingURL=admin.router.js.map