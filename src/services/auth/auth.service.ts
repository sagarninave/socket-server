import { Message, StatusCode } from "../../constant";
import {
  ISignup,
  ILogin,
  IUser,
  IToken,
  IVerification,
  IResetPassword,
  IVerificationReqPayload,
  IResendVerificationPayload,
  ISetNewPasswordPayload,
  IResetPasswordPayload,
} from "../../interface/auth.interface";
import {
  loginJoiSchema,
  resendVerificationJoiSchema,
  resetPasswordJoiSchema,
  setNewPasswordJoiSchema,
  signupJoiSchema,
  verificationJoiSchema,
} from "../../joi";
import {
  ResetPasswordSchema,
  SessionSchema,
  UserSchema,
  VerificationSchema,
} from "../../schema";
import {
  createResetPasswordToken,
  getLoginToken,
  setNewPasswordTokenValidation,
  setNewPasswordValidation,
  validateLoginUser,
  validateUserVerification,
  validateVerification,
} from ".";
import {
  signupEmailSend,
  verificationEmailSend,
  loginEmailSend,
} from "../email";
import { ValidationResult } from "joi";
import { HttpException } from "../../exception";
import Mongoose from "mongoose";

/**
 * The `signupService` function in TypeScript handles user signup by validating input, creating a new
 * user, sending a signup email, and verifying the email address.
 */
export const signupService = async (body: ISignup): Promise<IUser | null> => {
  const { error, value } = signupJoiSchema.validate(body);
  if (error) throw new HttpException(StatusCode.BAD_REQUEST, error.message);

  const { firstName, lastName, email: rawEmail, password } = value;
  const email = rawEmail.toLowerCase().trim();

  const existingUser = await UserSchema.findOne({ email });
  if (existingUser) {
    throw new HttpException(StatusCode.CONFLICT, Message.USER_ALREADY_EXISTS);
  }

  const userCreated = await new UserSchema({
    firstName,
    lastName,
    email,
    password,
  }).save();
  if (!userCreated) return null;

  const verificationToken = await new VerificationSchema({
    userId: userCreated._id,
    token: new Mongoose.Types.ObjectId(),
  }).save();
  if (!verificationToken) return null;

  const [signupEmailSent, verificationEmailSent] = await Promise.allSettled([
    signupEmailSend(userCreated),
    verificationEmailSend(userCreated, verificationToken.token.toString()),
  ]);

  return signupEmailSent && verificationEmailSent ? userCreated : null;
};

/**
 * The loginService function validates user login credentials, checks authorization, updates last login
 * time, sends a login email, and returns a login token.
 */
export const loginService = async (body: ILogin): Promise<IToken | null> => {
  const { error, value } = loginJoiSchema.validate(body);
  if (error) throw new HttpException(StatusCode.BAD_REQUEST, error.message);

  const email = value.email.toLowerCase().trim();

  const user = await UserSchema.findOne({ email });
  await validateLoginUser(user, value); // Throws if invalid

  const token = getLoginToken(user);
  if (!token?.accessToken || !token?.refreshToken) return null;

  user.lastLogin = new Date();
  const updatedUser = await user.save();

  const session = await SessionSchema.create({
    userId: user._id,
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
  });

  const emailSent = await loginEmailSend(user);

  return updatedUser && session && emailSent ? token : null;
};

/**
 * The function `verificationService` validates a user's verification token and updates their
 * verification status in a TypeScript application.
 */
export const verificationService = async (
  body: IVerificationReqPayload
): Promise<IUser | null> => {
  const { error, value }: ValidationResult =
    verificationJoiSchema.validate(body);
  if (error) {
    throw new HttpException(StatusCode.BAD_REQUEST, error.message);
  }

  const { userId, verificationToken } = value;

  const user = await UserSchema.findById(userId);
  if (!user) {
    throw new HttpException(StatusCode.NOT_FOUND, Message.USER_NOT_EXISTS);
  }
  validateUserVerification(user);

  const tokenRecord = await VerificationSchema.findOne({ userId });
  validateVerification(tokenRecord, verificationToken);

  user.isVerified = true;
  const updatedUser = await user.save();

  if (!updatedUser) return null;

  const { acknowledged, deletedCount } = await VerificationSchema.deleteOne({
    _id: tokenRecord?._id,
  });

  return acknowledged && deletedCount ? updatedUser : null;
};

/**
 * The function `resendVerificationService` validates a query, retrieves a user by email, checks if a
 * verification token exists for the user, and resends an email verification token if one is found.
 */
export const resendVerificationService = async (
  body: IResendVerificationPayload
): Promise<IVerification | null> => {
  const { error, value }: ValidationResult =
    resendVerificationJoiSchema.validate(body);
  if (error) {
    throw new HttpException(StatusCode.BAD_REQUEST, error.message);
  }

  const email = value.email.toLowerCase().trim();

  const user = await UserSchema.findOne({ email });
  if (!user) {
    throw new HttpException(StatusCode.NOT_FOUND, Message.USER_NOT_EXISTS);
  }

  const verificationToken = await new VerificationSchema({
    userId: user._id,
    token: new Mongoose.Types.ObjectId(),
  }).save();

  const emailSent = await verificationEmailSend(
    user,
    String(verificationToken.token)
  );

  return emailSent ? verificationToken : null;
};

/**
 * The function `resetPasswordService` in TypeScript handles resetting a user's password by validating
 * input, retrieving user information, and creating a reset password token.
 */
export const resetPasswordService = async (
  body: IResetPasswordPayload
): Promise<IResetPassword | null> => {
  const { error, value }: ValidationResult =
    resetPasswordJoiSchema.validate(body);
  if (error) throw new HttpException(StatusCode?.BAD_REQUEST, error?.message);

  const email: string = value?.email.toLocaleLowerCase().trim();
  const user: IUser = await UserSchema.findOne({ email });
  if (!user)
    throw new HttpException(StatusCode?.BAD_REQUEST, Message?.USER_NOT_EXISTS);

  return await createResetPasswordToken(user);
};

/**
 * The setNewPasswordService function in TypeScript sets a new password for a user after validating
 * input and deleting the reset password token.
 */
export const setNewPasswordService = async (
  body: ISetNewPasswordPayload
): Promise<IUser | null> => {
  const { error, value }: ValidationResult =
    setNewPasswordJoiSchema.validate(body);
  if (error) throw new HttpException(StatusCode.BAD_REQUEST, error.message);

  const user = await UserSchema.findById(value.userId);
  await setNewPasswordValidation(user, value);

  const passwordToken = await ResetPasswordSchema.findOne({
    userId: value.userId,
  });
  setNewPasswordTokenValidation(passwordToken, value);

  user.password = value.newPassword;
  const isUserUpdated = await user.save();

  if (!isUserUpdated) return null;

  const { acknowledged, deletedCount } = await ResetPasswordSchema.deleteOne({
    _id: passwordToken?._id,
  });

  if (acknowledged && deletedCount) return isUserUpdated;

  return null;
};

/**
 * This TypeScript function logs out a user by deleting their session based on the provided access
 * token.
 */
export const logoutService = async (accessToken: string): Promise<boolean> => {
  const isSession = await SessionSchema.deleteOne({
    accessToken: accessToken.split(" ")[1],
  });
  if (isSession?.acknowledged && isSession?.deletedCount) return true;
  return null;
};
