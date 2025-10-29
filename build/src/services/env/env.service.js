"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("../../joi");
const dotenv_1 = __importDefault(require("dotenv"));
class Env {
    constructor() {
        Env.loadEnv();
        this.config = Env.validate();
    }
    /**
     * This function loads environment variables from a .env file using the dotenv library in TypeScript.
     */
    static loadEnv() {
        dotenv_1.default.config();
    }
    /**
     * validates the vars object against the schema using the validate method of the Joi library.
     * If there is an error, it throws an error message.
     */
    static validate() {
        /* validating the input environment variables against the Joi schema defined in `envVarSchema`. */
        const { error, value } = joi_1.envJoiSchema.validate(process.env, {
            stripUnknown: true,
        });
        /*
         * checking if there is an error in the validation of the environment variables against the Joi schema.
         * If there is an error, it throws an error message with the details of the error.
         */
        if (error) {
            throw new Error(`Config error: ${error.message}`);
        }
        return value;
    }
    /**
     * The function "get" retrieves a value from a Env object based on a given key.
     */
    get(key) {
        return this.config[key];
    }
}
exports.default = new Env();
//# sourceMappingURL=env.service.js.map