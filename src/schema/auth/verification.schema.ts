import { getNextSeventhDayDateTime } from "../../utils";
import { IVerification } from "../../interface";
import { model, Schema } from "mongoose";
import { Collections } from "../../constant";

const verification = new Schema<IVerification>({
  userId: { type: Schema.Types.ObjectId, required: true },
  token: { type: Schema.Types.ObjectId, required: true },
  expiredAt: { type: Date, default: getNextSeventhDayDateTime() },
  createdAt: { type: Date, default: Date.now, required: true },
});

verification.set("collection", Collections?.VERIFICATION);

export default model<IVerification>(Collections?.VERIFICATION, verification);
