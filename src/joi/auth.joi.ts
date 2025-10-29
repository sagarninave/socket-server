/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegExp } from "../constant";
import Joi from "joi";
import checkIsBodyAllowed from "./unknown.joi";

export const signupJoiSchema: Joi.ObjectSchema = checkIsBodyAllowed(
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
    email: Joi.string()
      .required()
      .min(8)
      .max(30)
      .pattern(RegExp?.emailRegExp)
      .messages({
        "string.empty": "Email is required.",
        "string.base": "Email should contain characters.",
        "string.min": "Email should be minimum 8 character long.",
        "string.max": "Email should be maximum 30 character long.",
        "string.pattern.base": "Email must be a valid email address",
      }),
    password: Joi.string()
      .required()
      .min(8)
      .max(16)
      .pattern(RegExp?.passwordRegExp)
      .messages({
        "string.empty": "Password is required.",
        "string.base": "Password should contain characters.",
        "string.min": "Password should be minimum 8 character long.",
        "string.max": "Password should be maximum 16 character long.",
        "string.pattern.base":
          "Password should include at least one uppercase letter, one lowercase letter, one digit, and one special character",
      }),
  })
);

export const loginJoiSchema: Joi.ObjectSchema = checkIsBodyAllowed(
  Joi.object({
    email: Joi.string().required().messages({
      "string.empty": "Email is required.",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required.",
    }),
  })
);

export const verificationJoiSchema: Joi.ObjectSchema = checkIsBodyAllowed(
  Joi.object({
    userId: Joi.string().required().messages({
      "string.empty": "User ID is required.",
    }),
    verificationToken: Joi.string().required().messages({
      "string.empty": "Verification token is required.",
    }),
  })
);

export const resendVerificationJoiSchema: Joi.ObjectSchema = checkIsBodyAllowed(
  Joi.object({
    email: Joi.string().required().messages({
      "string.empty": "Email is required.",
    }),
  })
);

export const resetPasswordJoiSchema: Joi.ObjectSchema = checkIsBodyAllowed(
  Joi.object({
    email: Joi.string().required().messages({
      "string.empty": "Email is required.",
    }),
  })
);

export const setNewPasswordJoiSchema: Joi.ObjectSchema = checkIsBodyAllowed(
  Joi.object({
    userId: Joi.string().required().messages({
      "string.empty": "User ID is required.",
    }),
    token: Joi.string().required().messages({
      "string.empty": "Token is required.",
    }),
    newPassword: Joi.string().required().messages({
      "string.empty": "Password is required.",
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
