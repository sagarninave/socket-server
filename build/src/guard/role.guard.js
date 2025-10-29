"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../constant");
const exception_1 = require("../exception");
/**
 * The RoleGuard function checks if the user's role is included in a specified array of roles and
 * throws a forbidden exception if not.
 */
const RoleGuard = (roles) => (0, exception_1.TryCatch)((req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
    if (!role || !roles.includes(role)) {
        throw new exception_1.HttpException(constant_1.StatusCode.FORBIDDEN, constant_1.Message.FORBIDDEN);
    }
    next();
}));
exports.default = RoleGuard;
//# sourceMappingURL=role.guard.js.map