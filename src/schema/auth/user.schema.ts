import { IUser } from "../../interface";
import { EUserRoles } from "../../enum";
import { genSalt, hash } from "bcrypt";
import { Env } from "../../services";
import { model, Schema, CallbackWithoutResultAndOptionalError } from "mongoose";
import { Collections } from "../../constant";

const user = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  role: {
    type: String,
    enum: Object.values(EUserRoles),
    default: EUserRoles?.MEMBER,
    required: false,
  },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, required: true },
  lastLogin: { type: Date, required: false },
});

user.pre("save", async function (next: CallbackWithoutResultAndOptionalError) {
  try {
    if (!this.isModified("password")) return next();
    const salt: string = await genSalt(+Env.get("PASSWORD_SALT"));
    if (salt) {
      const hashedPassword: string = await hash(this.password, salt);
      if (hashedPassword) {
        this.password = hashedPassword;
        next();
      }
    }
  } catch (error) {
    return next(error);
  }
});

user.set("collection", Collections?.USER);

export default model<IUser>(Collections?.USER, user);
