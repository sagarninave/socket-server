"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersBuildQuery = void 0;
const constant_1 = require("../../constant");
const exception_1 = require("../../exception");
const getAllUsersBuildQuery = (query) => {
    const { name, role, limit = 5, offset = 0 } = query;
    const parsedLimit = Number(limit);
    const parsedOffset = Number(offset);
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
        throw new exception_1.HttpException(constant_1.StatusCode.BAD_REQUEST, constant_1.Message.LIMIT_REQUIRED);
    }
    const conditions = [];
    if (name) {
        conditions.push({ firstName: { $regex: name, $options: "i" } }, { lastName: { $regex: name, $options: "i" } });
    }
    if (role) {
        conditions.push({ role: { $regex: role, $options: "i" } });
    }
    const pipeline = [];
    if (conditions.length > 0) {
        pipeline.push({ $match: { $or: conditions } });
    }
    if (parsedOffset > 0) {
        pipeline.push({ $skip: parsedOffset });
    }
    pipeline.push({
        $project: { firstName: 1, lastName: 1, email: 1, role: 1 },
    });
    if (parsedLimit) {
        pipeline.push({ $limit: parsedLimit });
    }
    return pipeline;
};
exports.getAllUsersBuildQuery = getAllUsersBuildQuery;
//# sourceMappingURL=admin.supportive.service.js.map