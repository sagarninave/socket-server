"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const services_1 = require("../services");
exports.default = cloudinary_1.v2.config({
    cloud_name: String(services_1.Env.get("CLOUDINARY_NAME")),
    api_key: String(services_1.Env.get("CLOUDINARY_API_KEY")),
    api_secret: String(services_1.Env.get("CLOUDINARY_API_SECRET")),
});
//# sourceMappingURL=cloudinary.config.js.map