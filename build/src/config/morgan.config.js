"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
morgan_1.default.token("host", (req) => req.hostname);
morgan_1.default.token("url", (req) => req.url);
exports.default = (0, morgan_1.default)(":host :method :url :status :response-time ms");
//# sourceMappingURL=morgan.config.js.map