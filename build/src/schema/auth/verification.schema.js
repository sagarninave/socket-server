"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const mongoose_1 = require("mongoose");
const constant_1 = require("../../constant");
const verification = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    token: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    expiredAt: { type: Date, default: (0, utils_1.getNextSeventhDayDateTime)() },
    createdAt: { type: Date, default: Date.now, required: true },
});
verification.set("collection", constant_1.Collections === null || constant_1.Collections === void 0 ? void 0 : constant_1.Collections.VERIFICATION);
exports.default = (0, mongoose_1.model)(constant_1.Collections === null || constant_1.Collections === void 0 ? void 0 : constant_1.Collections.VERIFICATION, verification);
//# sourceMappingURL=verification.schema.js.map