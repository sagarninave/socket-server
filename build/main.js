"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./src/config");
const services_1 = require("./src/services");
const app_1 = __importDefault(require("./src/app"));
const port = +services_1.Env.get("PORT");
app_1.default.listen(port, () => {
    config_1.Mongoose;
    config_1.Cloudinary;
    services_1.Scheduler;
    process.stdout.write(`listening on http://localhost:${port}\n`);
});
//# sourceMappingURL=main.js.map