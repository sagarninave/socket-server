import {
  resetPasswordService,
  loginService,
  resendVerificationService,
  signupService,
  verificationService,
  setNewPasswordService,
  logoutService,
} from "../../services";
import { Request, Response } from "express";
import { Message, StatusCode } from "../../constant";
import { apiResponse } from "../../utils";
import {
  IResendVerificationPayload,
  IResetPassword,
  IResetPasswordPayload,
  IToken,
  IUser,
} from "../../interface";

/**
 * Handles user signupController requests, calling a service to create a new user and returning responses accordingly.
 */
export const signupController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const isUserCreated: IUser = await signupService(req.body);
  if (isUserCreated) {
    res
      .status(StatusCode?.CREATED)
      .json(apiResponse(true, Message?.USER_REGISTER, null));
  } else {
    res
      .status(StatusCode?.INTERNAL_SERVER_ERROR)
      .json(apiResponse(false, Message?.SOMETHING_WENT_WRONG, null));
  }
};

/**
 * The `loginController` function in TypeScript handles user loginController by calling a service, checking if the user
 * exists, and returning an appropriate response.
 */
export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token: IToken = await loginService(req.body);
  if (token) {
    res
      .status(StatusCode?.OK)
      .json(apiResponse(true, Message?.USER_LOGGED_IN, token));
  } else {
    res
      .status(StatusCode?.INTERNAL_SERVER_ERROR)
      .json(apiResponse(false, Message?.SOMETHING_WENT_WRONG, null));
  }
};

/**
 * The verificationController function in TypeScript handles email verification and sends appropriate
 * responses based on the verification status.
 */
export const verificationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const isVerified = await verificationService(req.body);
  if (isVerified) {
    res
      .status(StatusCode?.OK)
      .json(apiResponse(true, Message?.EMAIL_VERIFICATION, null));
  } else {
    res
      .status(StatusCode?.INTERNAL_SERVER_ERROR)
      .json(apiResponse(false, Message?.SOMETHING_WENT_WRONG, null));
  }
};

/**
 * The function `resendVerificationController` handles resending email verification based on the
 * verification status.
 */
export const resendVerificationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const isVerified = await resendVerificationService(
    req.params as unknown as IResendVerificationPayload
  );
  if (isVerified) {
    res
      .status(StatusCode?.OK)
      .json(apiResponse(true, Message?.EMAIL_VERIFICATION_RESEND, null));
  } else {
    res
      .status(StatusCode?.INTERNAL_SERVER_ERROR)
      .json(apiResponse(false, Message?.SOMETHING_WENT_WRONG, null));
  }
};

/**
 * The resetPasswordController function handles the logic for resending email verification for
 * forgotten passwords.
 */
export const resetPasswordController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const isResetEmail: IResetPassword = await resetPasswordService(
    req.params as unknown as IResetPasswordPayload
  );
  if (isResetEmail) {
    res
      .status(StatusCode?.OK)
      .json(apiResponse(true, Message?.RESET_PASSWORD_EMAIL, null));
  } else {
    res
      .status(StatusCode?.INTERNAL_SERVER_ERROR)
      .json(apiResponse(false, Message?.SOMETHING_WENT_WRONG, null));
  }
};

/**
 * The function setNewPasswordController handles setting a new password and sends appropriate responses
 * based on the outcome.
 */
export const setNewPasswordController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const updatedUser: IUser = await setNewPasswordService(req.body);
  if (updatedUser) {
    res
      .status(StatusCode?.OK)
      .json(apiResponse(true, Message?.SET_NEW_PASSWORD, null));
  } else {
    res
      .status(StatusCode?.INTERNAL_SERVER_ERROR)
      .json(apiResponse(false, Message?.SOMETHING_WENT_WRONG, null));
  }
};

/**
 * The `logoutController` function handles logging out a user and returns appropriate responses based
 * on the outcome.
 */
export const logoutController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const isLoggedOut = await logoutService(req?.headers?.authorization);
  if (isLoggedOut) {
    res.status(StatusCode?.OK).json(apiResponse(true, Message?.LOG_OUT, null));
  } else {
    res
      .status(StatusCode?.INTERNAL_SERVER_ERROR)
      .json(apiResponse(false, Message?.SOMETHING_WENT_WRONG, null));
  }
};
