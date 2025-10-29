/* eslint-disable @typescript-eslint/no-explicit-any */
import { compare } from "bcrypt";
import { ILogin, IUser, IResetPassword, IVerification } from "../../interface";
import { Message, StatusCode } from "../../constant";
import { HttpException } from "../../exception";

/**
 * The function `validateLoginUser` checks if a user is authorized to login based on their verification
 * status and password.
 */
export const validateLoginUser = async (
  user: IUser,
  value: ILogin
): Promise<void> => {
  if (!user)
    throw new HttpException(StatusCode?.UNAUTHORIZED, Message?.UNAUTHORIZED);

  if (user && !user?.isVerified)
    throw new HttpException(StatusCode?.UNAUTHORIZED, Message?.UNAUTHORIZED);

  const isAuthorized: boolean = await compare(value?.password, user?.password);
  if (!isAuthorized)
    throw new HttpException(StatusCode?.UNAUTHORIZED, Message?.UNAUTHORIZED);
};

/**
 * The function `validateUserVerification` checks if a user exists and if their email is already
 * verified.
 */
export const validateUserVerification = (user: IUser): void => {
  if (!user)
    throw new HttpException(StatusCode?.NOT_FOUND, Message?.USER_NOT_EXISTS);

  if (user?.isVerified)
    throw new HttpException(StatusCode.OK, Message?.EMAIL_ALREADY_VERIFIED);
};

/**
 * The function `validateVerification` checks if a verification token is valid based on its expiration
 * date and token value.
 */
export const validateVerification = (
  isVerificationToken: IVerification,
  verificationToken: string
): void => {
  if (!isVerificationToken)
    throw new HttpException(
      StatusCode.BAD_REQUEST,
      Message?.VERIFICATION_TOKEN_EXPIRED
    );

  if (isVerificationToken?.token.toString() !== verificationToken)
    throw new HttpException(
      StatusCode.BAD_REQUEST,
      Message?.VERIFICATION_TOKEN_EXPIRED
    );

  if (new Date(isVerificationToken?.expiredAt) <= new Date())
    throw new HttpException(
      StatusCode.BAD_REQUEST,
      Message?.VERIFICATION_TOKEN_EXPIRED
    );
};

export const setNewPasswordValidation = async (user: IUser, body: any) => {
  if (!user)
    throw new HttpException(StatusCode?.BAD_REQUEST, Message?.USER_NOT_EXISTS);

  if (await compare(body.newPassword, user.password))
    throw new HttpException(
      StatusCode?.BAD_REQUEST,
      Message?.SAME_NEW_CURRENT_PASSWORD
    );
};

/**
 * The function `setNewPasswordTokenValidation` validates a password token against a provided token.
 */
export const setNewPasswordTokenValidation = (
  passwordToken: IResetPassword,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any
): void => {
  if (!passwordToken)
    throw new HttpException(
      StatusCode.BAD_REQUEST,
      Message?.RESEND_RESET_PASSWORD_REQUEST
    );

  if (passwordToken?.token.toString() !== body?.token)
    throw new HttpException(
      StatusCode.BAD_REQUEST,
      Message?.INCORRECT_SET_NEW_PASSWORD_TOKEN
    );

  if (new Date(passwordToken?.expiredAt) <= new Date())
    throw new HttpException(
      StatusCode.BAD_REQUEST,
      Message?.SET_NEW_PASSWORD_TOKEN_EXPIRED
    );
};
