import { IUser } from ".";

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IGetUser
  extends Pick<
    IUser,
    "_id" | "firstName" | "lastName" | "email" | "role" | "avatar"
  > {}

export interface IUpdateUser extends IGetUser {}

export interface IGetAllUsersQueryParams {
  name?: string;
  role?: string;
  limit?: number | string;
  offset?: number | string;
}
