"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../../constant");
const mongoose_1 = require("mongoose");
const session = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, $ref: "user" },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
session.set("collection", constant_1.Collections === null || constant_1.Collections === void 0 ? void 0 : constant_1.Collections.SESSION);
exports.default = (0, mongoose_1.model)(constant_1.Collections === null || constant_1.Collections === void 0 ? void 0 : constant_1.Collections.SESSION, session);
//# sourceMappingURL=session.schema.js.map