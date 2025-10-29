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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResetPasswordToken = void 0;
const schema_1 = require("../../schema");
const utils_1 = require("../../utils");
const email_1 = require("../email");
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * The function creates a reset password token for a user if one does not already exist.
 */
const createResetPasswordToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const isResetTokenAlready = yield schema_1.ResetPasswordSchema.findOne({ userId: user === null || user === void 0 ? void 0 : user._id });
    if (isResetTokenAlready) {
        return updateResetPasswordToken(user, isResetTokenAlready);
    }
    else {
        return createNewResetPasswordToken(user);
    }
});
exports.createResetPasswordToken = createResetPasswordToken;
/**
 * The function `updateResetPasswordToken` updates a reset password token for a user and sends a reset
 * password email.
 */
const updateResetPasswordToken = (user, isResetTokenAlready) => __awaiter(void 0, void 0, void 0, function* () {
    const updateValue = {
        token: new mongoose_1.default.Types.ObjectId(),
        expiredAt: (0, utils_1.getNextSeventhDayDateTime)(),
    };
    const isResetPasswordTokenUpdated = yield schema_1.ResetPasswordSchema.updateOne({ _id: isResetTokenAlready === null || isResetTokenAlready === void 0 ? void 0 : isResetTokenAlready._id }, {
        $set: updateValue,
    });
    if (isResetPasswordTokenUpdated) {
        const resetPasswordEmailSent = yield (0, email_1.resetPasswordEmailSend)(user, updateValue === null || updateValue === void 0 ? void 0 : updateValue.token.toString());
        if (resetPasswordEmailSent)
            return isResetTokenAlready;
        return null;
    }
    return null;
});
/**
 * The function creates a new reset password token for a user and sends a reset password email.
 */
const createNewResetPasswordToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const isResetEmailTokenCreated = yield new schema_1.ResetPasswordSchema({
        userId: user === null || user === void 0 ? void 0 : user._id,
        token: new mongoose_1.default.Types.ObjectId(),
    }).save();
    if (isResetEmailTokenCreated) {
        const resetPasswordEmailSent = yield (0, email_1.resetPasswordEmailSend)(user, isResetEmailTokenCreated === null || isResetEmailTokenCreated === void 0 ? void 0 : isResetEmailTokenCreated.token.toString());
        if (resetPasswordEmailSent)
            return isResetEmailTokenCreated;
        return null;
    }
    return null;
});
//# sourceMappingURL=auth.supportive.service.js.map