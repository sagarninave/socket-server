import { Schema } from "mongoose";

export interface IUser {
  _id?: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  avatar?: string;
  role?: string;
  isVerified?: boolean;
  createdAt?: Date;
  lastLogin?: Date | null;
}

export interface ISignup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthUser
  extends Pick<IUser, "firstName" | "lastName" | "email" | "role"> {
  id: Schema.Types.ObjectId;
}

export interface IVerification {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  token: Schema.Types.ObjectId;
  expiredAt?: Date;
  createdAt?: Date;
}

export interface IResetPassword {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  token: Schema.Types.ObjectId;
  expiredAt?: Date;
  createdAt?: Date;
}

export interface ISetNewPassword {
  userId: Schema.Types.ObjectId;
  token: string;
  password: string;
}

export interface ISession {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  accessToken: string;
  refreshToken: string;
  createdAt?: Date;
}

export interface IVerificationReqPayload {
  userId: Schema.Types.ObjectId;
  token: Schema.Types.ObjectId;
}

export interface IResendVerificationPayload {
  email: string;
}

export interface IResetPasswordPayload extends IResendVerificationPayload {}

export interface ISetNewPasswordPayload {
  userId: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}
