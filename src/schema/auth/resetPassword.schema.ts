import { getNextSeventhDayDateTime } from "../../utils";
import { IResetPassword } from "../../interface";
import { model, Schema } from "mongoose";
import { Collections } from "../../constant";

const resetPassword = new Schema<IResetPassword>({
  userId: { type: Schema.Types.ObjectId, required: true },
  token: { type: Schema.Types.ObjectId, required: true },
  expiredAt: { type: Date, default: getNextSeventhDayDateTime() },
  createdAt: { type: Date, default: Date.now, required: true },
});

resetPassword.set("collection", Collections?.RESET_PASSWORD);

export default model<IResetPassword>(
  Collections?.RESET_PASSWORD,
  resetPassword
);
