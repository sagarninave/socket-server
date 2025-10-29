"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scheduler = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
exports.Scheduler = node_cron_1.default.schedule("0 * * * *", () => {
    console.log("Reminder for expiring service sent!");
});
//# sourceMappingURL=index.js.map