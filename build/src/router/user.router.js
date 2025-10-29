"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controllers/user");
const constant_1 = require("../constant");
const guard_1 = require("../guard");
const config_1 = require("../config");
const exception_1 = require("../exception");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.GET_PROFILE, guard_1.AuthGuard, (0, exception_1.TryCatch)(user_1.profileController));
router.put(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.UPDATE_PROFILE, guard_1.AuthGuard, (0, exception_1.TryCatch)(user_1.updateProfileController));
router.put(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.CHANGE_PASSWORD, guard_1.AuthGuard, (0, exception_1.TryCatch)(user_1.changePasswordController));
router.put(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.UPLOAD_PROFILE_PICTURE, guard_1.AuthGuard, config_1.Multer.single("image"), (0, exception_1.TryCatch)(user_1.uploadProfilePictureController));
exports.default = router;
//# sourceMappingURL=user.router.js.map