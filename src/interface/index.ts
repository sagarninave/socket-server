/* eslint-disable @typescript-eslint/no-explicit-any */
export * from "./auth.interface";
export * from "./user.interface";
export * from "./admin.interface";
export * from "./email.interface";
export * from "./request.interface";

export interface IResponse {
  success: boolean;
  message: string;
  data: unknown;
}

export interface IStatusCode {
  [key: string]: number;
}

export interface IEnvJoiSchema {
  [key: string]: string;
}

export interface IRegExp {
  [key: string]: RegExp;
}

export interface IObject {
  [key: string]: any;
}
