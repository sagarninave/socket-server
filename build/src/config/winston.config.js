"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../enum");
const services_1 = require("../services");
const winston_1 = require("winston");
// import DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, printf } = winston_1.format;
const levels = ["info", "error", "combined"];
// const fileRotateTransport: DailyRotateFile[] = levels?.map(
//   (level: string): DailyRotateFile =>
//     new transports.DailyRotateFile({
//       filename: `logs/${level}/%DATE%.log`,
//       datePattern: "YYYY-MM-DD",
//       maxFiles: "14d",
//     })
// );
const myFormat = printf(({ level, message, timestamps }) => JSON.stringify({
    level: level,
    timestamp: timestamp,
    hostname: message === null || message === void 0 ? void 0 : message.hostname,
    method: message === null || message === void 0 ? void 0 : message.method,
    url: message === null || message === void 0 ? void 0 : message.url,
}));
const winston = (0, winston_1.createLogger)({
    silent: false,
    format: combine(timestamp(), myFormat),
    // transports: fileRotateTransport,
});
if (services_1.Env.get("NODE_ENVIRONMENT") === enum_1.ENodeEnvironment.PRODUCTION) {
    winston.add(new winston_1.transports.Console());
}
exports.default = winston;
//# sourceMappingURL=winston.config.js.map