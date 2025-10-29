"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkIsBodyAllowed = (schema) => schema.unknown(false).error((errors) => {
    return errors.map((err) => {
        var _a, _b;
        if (err.code === "object.unknown") {
            const label = (_b = (_a = err.local) === null || _a === void 0 ? void 0 : _a.key) === null || _b === void 0 ? void 0 : _b.replace(/([A-Z])/g, " $1").trim();
            return new Error(`${label.charAt(0).toUpperCase() + label.slice(1)} is not allowed in the request body`);
        }
        return err;
    });
});
exports.default = checkIsBodyAllowed;
//# sourceMappingURL=unknown.joi.js.map