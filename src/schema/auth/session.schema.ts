import { Collections } from "../../constant";
import { ISession } from "../../interface";
import { model, Schema } from "mongoose";

const session = new Schema<ISession>({
  userId: { type: Schema.Types.ObjectId, required: true, $ref: "user" },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

session.set("collection", Collections?.SESSION);

export default model<ISession>(Collections?.SESSION, session);
