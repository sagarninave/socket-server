"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./controllers/app");
const services_1 = require("./services");
const router_1 = require("./router");
const enum_1 = require("./enum");
const config_1 = require("./config");
const constant_1 = require("./constant");
const swagger_json_1 = __importDefault(require("./assets/swagger.json"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: services_1.Env.get("AUDIENCE"), // your React app URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // allow cookies / auth headers if needed
}));
/* The line parse incoming requests with JSON payloads. */
app.use(express_1.default.json());
/* This middleware ensures that requests are limited to a certain count within a specified time frame.*/
app.use(config_1.RateLimiter);
/* The line setting up a route in the Express application for serving Swagger documentation. */
app.use(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.SWAGGER, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
if (services_1.Env.get("NODE_ENVIRONMENT") === enum_1.ENodeEnvironment.DEVELOPMENT)
    app.use(config_1.Morgan);
app.use(express_1.default.static(path_1.default.join(__dirname, String(services_1.Env.get("STORAGE_DIRECTORY")))));
/* These lines of code are setting up index routes */
app.get(constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.INDEX, app_1.indexController);
/* These lines of code are setting up modules routes in an Express application using the `app.use()` method. */
app.use(`${constant_1.VERSION}${constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.AUTH}`, router_1.AuthRouter);
app.use(`${constant_1.VERSION}${constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.USER}`, router_1.UserRouter);
app.use(`${constant_1.VERSION}${constant_1.Route === null || constant_1.Route === void 0 ? void 0 : constant_1.Route.ADMIN}`, router_1.AdminRouter);
/* These lines of code are setting up wildcard route to handle not found api */
app.use(constant_1.Route.NOT_FOUND, app_1.invalidEndpointController);
/* Handles errors occurring during request processing. */
app.use(app_1.errorController);
exports.default = app;
//# sourceMappingURL=app.js.map