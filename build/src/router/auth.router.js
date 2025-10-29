"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controllers/auth");
const guard_1 = require("../guard");
const constant_1 = require("../constant");
const exception_1 = require("../exception");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.SIGNUP, (0, exception_1.TryCatch)(auth_1.signupController));
router.post(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.LOGIN, (0, exception_1.TryCatch)(auth_1.loginController));
router.put(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.VERIFICATION, (0, exception_1.TryCatch)(auth_1.verificationController));
router.put(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.RESEND_VERIFICATION, (0, exception_1.TryCatch)(auth_1.resendVerificationController));
router.put(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.RESET_PASSWORD, (0, exception_1.TryCatch)(auth_1.resetPasswordController));
router.put(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.SET_NEW_PASSWORD, (0, exception_1.TryCatch)(auth_1.setNewPasswordController));
router.put(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.LOG_OUT, guard_1.AuthGuard, (0, exception_1.TryCatch)(auth_1.logoutController));
exports.default = router;
//# sourceMappingURL=auth.router.js.map