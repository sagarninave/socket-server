import { IResetPassword, IUser } from "../../interface";
import { ResetPasswordSchema } from "../../schema";
import { getNextSeventhDayDateTime } from "../../utils";
import { resetPasswordEmailSend } from "../email";
import Mongoose from "mongoose";

/**
 * The function creates a reset password token for a user if one does not already exist.
 */
export const createResetPasswordToken = async (
  user: IUser
): Promise<IResetPassword> => {
  const isResetTokenAlready: IResetPassword = await ResetPasswordSchema.findOne(
    { userId: user?._id }
  );
  if (isResetTokenAlready) {
    return updateResetPasswordToken(user, isResetTokenAlready);
  } else {
    return createNewResetPasswordToken(user);
  }
};

/**
 * The function `updateResetPasswordToken` updates a reset password token for a user and sends a reset
 * password email.
 */
const updateResetPasswordToken = async (
  user: IUser,
  isResetTokenAlready: IResetPassword
): Promise<IResetPassword> => {
  const updateValue = {
    token: new Mongoose.Types.ObjectId(),
    expiredAt: getNextSeventhDayDateTime(),
  };
  const isResetPasswordTokenUpdated = await ResetPasswordSchema.updateOne(
    { _id: isResetTokenAlready?._id },
    {
      $set: updateValue,
    }
  );
  if (isResetPasswordTokenUpdated) {
    const resetPasswordEmailSent = await resetPasswordEmailSend(
      user,
      updateValue?.token.toString()
    );
    if (resetPasswordEmailSent) return isResetTokenAlready;
    return null;
  }
  return null;
};

/**
 * The function creates a new reset password token for a user and sends a reset password email.
 */
const createNewResetPasswordToken = async (
  user: IUser
): Promise<IResetPassword> => {
  const isResetEmailTokenCreated: IResetPassword =
    await new ResetPasswordSchema({
      userId: user?._id,
      token: new Mongoose.Types.ObjectId(),
    }).save();
  if (isResetEmailTokenCreated) {
    const resetPasswordEmailSent = await resetPasswordEmailSend(
      user,
      isResetEmailTokenCreated?.token.toString()
    );
    if (resetPasswordEmailSent) return isResetEmailTokenCreated;
    return null;
  }
  return null;
};
