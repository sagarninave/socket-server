import { Schema } from "mongoose";

export interface IUpdateUserRole {
  userId: Schema.Types.ObjectId;
  role: string;
}
