"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const createCollection_1 = __importDefault(require("./createCollection"));
const createEnvironment_1 = __importDefault(require("./createEnvironment"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const env = String(services_1.Env.get("NODE_ENVIRONMENT"));
if (env === "development") {
    try {
        const collectionPath = path_1.default.resolve("./src/postman/output/collection.json");
        const environmentFilePath = path_1.default.resolve("./src/postman/output/environment.json");
        const outputDirectory = path_1.default.resolve("./src/postman/output");
        if (!fs_1.default.existsSync(outputDirectory))
            fs_1.default.mkdirSync(outputDirectory, { recursive: true });
        fs_1.default.writeFileSync(collectionPath, JSON.stringify(createCollection_1.default, null, 2));
        fs_1.default.writeFileSync(environmentFilePath, JSON.stringify(createEnvironment_1.default, null, 2));
        console.log("✔ Postman environment created successfully.");
        process.exit();
    }
    catch (error) {
        console.log(`❌ Failed created successfully.\nPostman Error: ${error === null || error === void 0 ? void 0 : error.message}`);
        process.exit();
    }
}
else {
    process.exit();
}
//# sourceMappingURL=index.js.map