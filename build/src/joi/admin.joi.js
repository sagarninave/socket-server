"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRoleJoiSchema = void 0;
const enum_1 = require("../enum");
const unknown_joi_1 = __importDefault(require("./unknown.joi"));
const joi_1 = __importDefault(require("joi"));
const roles = Object.values(enum_1.EUserRoles);
exports.updateUserRoleJoiSchema = (0, unknown_joi_1.default)(joi_1.default.object({
    userId: joi_1.default.string().required().messages({
        "string.empty": "User ID is required.",
    }),
    role: joi_1.default.string()
        .required()
        .valid(...roles)
        .messages({
        "any.only": `User role must be one of: ${roles.join(", ")}`,
    }),
}));
//# sourceMappingURL=admin.joi.js.map