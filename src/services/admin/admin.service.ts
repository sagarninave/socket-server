/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGetUser, IUpdateUser, IUpdateUserRole } from "../../interface";
import { getAllUsersBuildQuery } from "./admin.supportive.service";
import { Message, StatusCode } from "../../constant";
import { updateUserRoleJoiSchema } from "../../joi";
import { PipelineStage, Schema } from "mongoose";
import { HttpException } from "../../exception";
import { UserSchema } from "../../schema";
import { ValidationResult } from "joi";

/**
 * This function retrieves all users from the database while excluding certain fields like password,
 * isVerified, createdAt, and lastLogin.
 */
export const getAllUsersService = async (query): Promise<IGetUser[]> => {
  const mongoQuery: PipelineStage[] = getAllUsersBuildQuery(query);
  return UserSchema.aggregate<IGetUser>(mongoQuery);
};

/**
 * The function `getUserService` retrieves user information based on the provided `userId`.
 */
export const getUserService = async (
  userId: Schema.Types.ObjectId | string
): Promise<IGetUser> =>
  await UserSchema.findById<IGetUser>(userId).select(
    "_id firstName lastName email role avatar"
  );

/**
 * The function updateUserRoleService updates the role of a user in a database and returns the updated user object.
 */
export const updateUserRoleService = async (
  currentUserId: Schema.Types.ObjectId,
  body: IUpdateUserRole
): Promise<IUpdateUser | null> => {
  const { error, value }: ValidationResult =
    updateUserRoleJoiSchema.validate(body);
  if (error) throw new HttpException(StatusCode.BAD_REQUEST, error.message);

  if (currentUserId === value.userId) {
    throw new HttpException(
      StatusCode.BAD_REQUEST,
      Message.CAN_NOT_CHANGE_ROLE
    );
  }

  const user = await UserSchema.findById(value.userId);
  if (!user)
    throw new HttpException(StatusCode.NOT_FOUND, Message.USER_NOT_EXISTS);

  user.role = value.role;
  const updatedUser = await user.save();

  if (!updatedUser) return null;

  return {
    _id: updatedUser._id,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    email: updatedUser.email,
    role: updatedUser.role,
  };
};
