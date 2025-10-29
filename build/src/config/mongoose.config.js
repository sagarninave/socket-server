"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../enum");
const services_1 = require("../services");
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDbDatabase = String(services_1.Env.get("MONGO_DB_DATABASE"));
const getMongoDbUrl = () => {
    const env = String(services_1.Env.get("MONGO_DB_ENVIRONMENT"));
    if (env === (enum_1.EMongoDbEnvironment === null || enum_1.EMongoDbEnvironment === void 0 ? void 0 : enum_1.EMongoDbEnvironment.DEVELOPMENT)) {
        return `mongodb://localhost:27017/${mongoDbDatabase}`;
    }
    else {
        const mongoDbUserName = String(services_1.Env.get("MONGO_DB_USERNAME"));
        const mongoDbPassword = String(services_1.Env.get("MONGO_DB_PASSWORD"));
        const mongoDbServer = String(services_1.Env.get("MONGO_DB_SERVER"));
        const mongoDbUrl = String(services_1.Env.get("MONGO_DB_URL"))
            .replace("<USERNAME>", mongoDbUserName)
            .replace("<PASSWORD>", mongoDbPassword.replace("@", "%40"))
            .replace("<SERVER>", mongoDbServer)
            .replace("<DATABASE>", mongoDbDatabase);
        return mongoDbUrl;
    }
};
mongoose_1.default.connect(getMongoDbUrl());
mongoose_1.default.connection.on("connected", () => process.stdout.write(`Mongo DB connected: ${mongoDbDatabase}\n`));
mongoose_1.default.connection.on("error", (error) => process.stdout.write(`Mongo DB error: ${error.message}\n`));
mongoose_1.default.connection.on("disconnected", () => process.stdout.write("Mongo DB disconnected\n"));
exports.default = mongoose_1.default;
//# sourceMappingURL=mongoose.config.js.map