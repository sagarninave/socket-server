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
const enum_1 = require("../../enum");
const bcrypt_1 = require("bcrypt");
const services_1 = require("../../services");
const mongoose_1 = require("mongoose");
const constant_1 = require("../../constant");
const user = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    role: {
        type: String,
        enum: Object.values(enum_1.EUserRoles),
        default: enum_1.EUserRoles === null || enum_1.EUserRoles === void 0 ? void 0 : enum_1.EUserRoles.MEMBER,
        required: false,
    },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now, required: true },
    lastLogin: { type: Date, required: false },
});
user.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!this.isModified("password"))
                return next();
            const salt = yield (0, bcrypt_1.genSalt)(+services_1.Env.get("PASSWORD_SALT"));
            if (salt) {
                const hashedPassword = yield (0, bcrypt_1.hash)(this.password, salt);
                if (hashedPassword) {
                    this.password = hashedPassword;
                    next();
                }
            }
        }
        catch (error) {
            return next(error);
        }
    });
});
user.set("collection", constant_1.Collections === null || constant_1.Collections === void 0 ? void 0 : constant_1.Collections.USER);
exports.default = (0, mongoose_1.model)(constant_1.Collections === null || constant_1.Collections === void 0 ? void 0 : constant_1.Collections.USER, user);
//# sourceMappingURL=user.schema.js.map