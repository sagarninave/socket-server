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
exports.updateUserRoleService = exports.getUserService = exports.getAllUsersService = void 0;
const admin_supportive_service_1 = require("./admin.supportive.service");
const constant_1 = require("../../constant");
const joi_1 = require("../../joi");
const exception_1 = require("../../exception");
const schema_1 = require("../../schema");
/**
 * This function retrieves all users from the database while excluding certain fields like password,
 * isVerified, createdAt, and lastLogin.
 */
const getAllUsersService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoQuery = (0, admin_supportive_service_1.getAllUsersBuildQuery)(query);
    return schema_1.UserSchema.aggregate(mongoQuery);
});
exports.getAllUsersService = getAllUsersService;
/**
 * The function `getUserService` retrieves user information based on the provided `userId`.
 */
const getUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield schema_1.UserSchema.findById(userId).select("_id firstName lastName email role avatar");
});
exports.getUserService = getUserService;
/**
 * The function updateUserRoleService updates the role of a user in a database and returns the updated user object.
 */
const updateUserRoleService = (currentUserId, body) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = joi_1.updateUserRoleJoiSchema.validate(body);
    if (error)
        throw new exception_1.HttpException(constant_1.StatusCode.BAD_REQUEST, error.message);
    if (currentUserId === value.userId) {
        throw new exception_1.HttpException(constant_1.StatusCode.BAD_REQUEST, constant_1.Message.CAN_NOT_CHANGE_ROLE);
    }
    const user = yield schema_1.UserSchema.findById(value.userId);
    if (!user)
        throw new exception_1.HttpException(constant_1.StatusCode.NOT_FOUND, constant_1.Message.USER_NOT_EXISTS);
    user.role = value.role;
    const updatedUser = yield user.save();
    if (!updatedUser)
        return null;
    return {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        role: updatedUser.role,
    };
});
exports.updateUserRoleService = updateUserRoleService;
//# sourceMappingURL=admin.service.js.map