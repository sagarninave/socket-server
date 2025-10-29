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
exports.updateUserRoleController = exports.getUserController = exports.getAllUsersController = void 0;
const services_1 = require("../../services");
const constant_1 = require("../../constant");
const utils_1 = require("../../utils");
/**
 * The function getAllUsersController handles requests to retrieve all users and sends appropriate
 * responses based on the outcome.
 */
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUser = yield (0, services_1.getAllUsersService)(req.query);
    if (isUser) {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.OK)
            .json((0, utils_1.apiResponse)(true, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.GET_ALL_USERS, isUser));
    }
    else {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.INTERNAL_SERVER_ERROR)
            .json((0, utils_1.apiResponse)(false, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.SOMETHING_WENT_WRONG, null));
    }
});
exports.getAllUsersController = getAllUsersController;
/**
 * The function getUserController retrieves a user based on the provided ID and sends a response with
 * the user data or an error message.
 */
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isUser = yield (0, services_1.getUserService)((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (isUser) {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.OK)
            .json((0, utils_1.apiResponse)(true, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.GET_USER, isUser));
    }
    else {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.INTERNAL_SERVER_ERROR)
            .json((0, utils_1.apiResponse)(false, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.SOMETHING_WENT_WRONG, null));
    }
});
exports.getUserController = getUserController;
/**
 * The function updateUserRoleController updates a user's role and sends a response based on the
 * outcome.
 */
const updateUserRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const isUser = yield (0, services_1.updateUserRoleService)((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id, req.body);
    if (isUser) {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.OK)
            .json((0, utils_1.apiResponse)(true, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.UPDATE_USER_ROLE, isUser));
    }
    else {
        res
            .status(constant_1.StatusCode === null || constant_1.StatusCode === void 0 ? void 0 : constant_1.StatusCode.INTERNAL_SERVER_ERROR)
            .json((0, utils_1.apiResponse)(false, constant_1.Message === null || constant_1.Message === void 0 ? void 0 : constant_1.Message.SOMETHING_WENT_WRONG, null));
    }
});
exports.updateUserRoleController = updateUserRoleController;
//# sourceMappingURL=index.js.map