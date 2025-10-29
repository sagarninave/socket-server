import { Request } from "express";
import { IAuthUser } from "./auth.interface";

export interface IAuthRequest extends Request {
  user?: IAuthUser;
}
