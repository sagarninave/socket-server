import { RegExp } from "../constant";
import checkIsBodyAllowed from "./unknown.joi";
import Joi from "joi";

export const userUpdateSchema: Joi.ObjectSchema = checkIsBodyAllowed(
  Joi.object({
    firstName: Joi.string().required().min(3).max(16).messages({
      "string.empty": "First name is required.",
      "string.base": "First name should contain characters.",
      "string.min": "First name should be minimum 3 character long.",
      "string.max": "First name should be maximum 16 character long.",
    }),
    lastName: Joi.string().required().min(3).max(16).messages({
      "string.empty": "Last name is required.",
      "string.base": "Last name should contain characters.",
      "string.min": "Last name should be minimum 3 character long.",
      "string.max": "Last name should be maximum 16 character long.",
    }),
  })
);

export const changePasswordSchema: Joi.ObjectSchema = checkIsBodyAllowed(
  Joi.object({
    currentPassword: Joi.string().required().messages({
      "string.empty": "Password is required.",
    }),
    newPassword: Joi.string()
      .required()
      .min(8)
      .max(16)
      .pattern(RegExp?.passwordRegExp)
      .messages({
        "string.empty": "New password is required.",
        "string.base": "New password should contain characters.",
        "string.min": "New password should be minimum 8 character long.",
        "string.max": "New password should be maximum 16 character long.",
        "string.pattern.base":
          "New password should include at least one uppercase letter, one lowercase letter, one digit, and one special character",
      }),
    confirmPassword: Joi.any()
      .equal(Joi.ref("newPassword"))
      .required()
      .label("Confirm password")
      .messages({
        "any.only": "Confirm password does not match with new password",
      }),
  })
);
