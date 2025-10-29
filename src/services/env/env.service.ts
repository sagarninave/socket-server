import { IEnvJoiSchema } from "../../interface";
import { envJoiSchema } from "../../joi";
import Joi from "joi";
import dotenv from "dotenv";

class Env {
  private readonly config: IEnvJoiSchema;

  constructor() {
    Env.loadEnv();
    this.config = Env.validate();
  }

  /**
   * This function loads environment variables from a .env file using the dotenv library in TypeScript.
   */
  private static loadEnv(): void {
    dotenv.config();
  }

  /**
   * validates the vars object against the schema using the validate method of the Joi library.
   * If there is an error, it throws an error message.
   */
  private static validate(): IEnvJoiSchema {
    /* validating the input environment variables against the Joi schema defined in `envVarSchema`. */
    const { error, value }: Joi.ValidationResult = envJoiSchema.validate(
      process.env,
      {
        stripUnknown: true,
      }
    );

    /*
     * checking if there is an error in the validation of the environment variables against the Joi schema.
     * If there is an error, it throws an error message with the details of the error.
     */
    if (error) {
      throw new Error(`Config error: ${error.message}`);
    }

    return value as IEnvJoiSchema;
  }

  /**
   * The function "get" retrieves a value from a Env object based on a given key.
   */
  get(key: string): unknown {
    return this.config[key];
  }
}

export default new Env();
