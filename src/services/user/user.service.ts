import { changePasswordValidation, uploadPictureToCloudinaryService } from ".";
import { changePasswordSchema, userUpdateSchema } from "../../joi";
import { IChangePassword, IUser } from "../../interface";
import { Message, StatusCode } from "../../constant";
import { changePasswordEmailSend } from "../email";
import { HttpException } from "../../exception";
import { UserSchema } from "../../schema";
import { removeFile } from "../../utils";
import { ValidationResult } from "joi";
import { Schema } from "mongoose";

/**
 * The profileService function retrieves user profile information excluding sensitive data based on the
 * provided userId.
 */
export const profileService = async (
  userId: Schema.Types.ObjectId
): Promise<IUser | null> => {
  return UserSchema.findById(userId).select(
    "_id firstName lastName email role avatar"
  );
};

/**
 * The function `updateProfileService` updates a user's profile information in a TypeScript
 * application.
 */
export const updateProfileService = async (
  userId: Schema.Types.ObjectId,
  body: Partial<IUser>
): Promise<IUser | null> => {
  const { error, value } = userUpdateSchema.validate(body);
  if (error) throw new HttpException(StatusCode.BAD_REQUEST, error.message);

  const user = await UserSchema.findById(userId);
  if (!user)
    throw new HttpException(StatusCode.UNAUTHORIZED, Message.UNAUTHORIZED);

  if (value.firstName) user.firstName = value.firstName;
  if (value.lastName) user.lastName = value.lastName;

  return await user.save();
};

/**
 * The function `changePasswordService` in TypeScript is used to change a user's password after
 * validating the input and updating the user's password in the database.
 */
export const changePasswordService = async (
  userId: Schema.Types.ObjectId,
  body: IChangePassword
): Promise<IUser | null> => {
  const { error, value }: ValidationResult =
    changePasswordSchema.validate(body);
  if (error) throw new HttpException(StatusCode.BAD_REQUEST, error.message);

  const user = await UserSchema.findById(userId);

  changePasswordValidation(user, value);

  user.password = value.newPassword;
  const updatedUser = await user.save();

  const emailSent = await changePasswordEmailSend(updatedUser);

  return updatedUser && emailSent ? updatedUser : null;
};

/**
 * The function `uploadProfilePictureService` uploads a user's profile picture to a cloud service and
 * updates the user's avatar URL in the database.
 */
export const uploadProfilePictureService = async (
  userId: Schema.Types.ObjectId,
  filePath: string
): Promise<IUser | null> => {
  const [user, uploaded] = await Promise.all([
    UserSchema.findById(userId),
    uploadPictureToCloudinaryService(filePath),
  ]);

  if (!user || !uploaded) return null;

  user.avatar = uploaded.url;
  const updatedUser = await user.save();

  removeFile(filePath);

  return updatedUser;
};
