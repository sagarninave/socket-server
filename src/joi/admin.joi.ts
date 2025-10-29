import { EUserRoles } from "../enum";
import checkIsBodyAllowed from "./unknown.joi";
import Joi from "joi";

const roles: string[] = Object.values(EUserRoles);
export const updateUserRoleJoiSchema: Joi.ObjectSchema = checkIsBodyAllowed(
  Joi.object({
    userId: Joi.string().required().messages({
      "string.empty": "User ID is required.",
    }),
    role: Joi.string()
      .required()
      .valid(...roles)
      .messages({
        "any.only": `User role must be one of: ${roles.join(", ")}`,
      }),
  })
);
