import { IUser, IToken } from "../../interface";
import { encrypt } from "../../utils";
import { Env } from "../";
import Jwt from "jsonwebtoken";

/**
 * The function `getLoginToken` generates access and refresh tokens for a user based on provided user
 * information and environment configuration.
 */
export const getLoginToken = (user: IUser): IToken => {
  const jwtSecretKey: string = Env.get("JWT_ACCESS_TOKEN_SECRET_KEY") as string;
  const jwtSecretKeyExpiry: string = Env.get(
    "JWT_ACCESS_TOKEN_SECRET_KEY_EXPIRY"
  ) as string;

  const jwtRefreshKey: string = Env.get(
    "JWT_REFRESH_TOKEN_SECRET_KEY"
  ) as string;
  const jwtRefreshKeyExpiry: string = Env.get(
    "JWT_REFRESH_TOKEN_SECRET_KEY_EXPIRY"
  ) as string;

  const encryptionKey: string = Env.get("ENCRYPTION_KEY") as string;
  const issuer: string = Env.get("ISSUER") as string;
  const audience: string = Env.get("AUDIENCE") as string;

  const tokenUser: IUser = {
    _id: user?._id,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    role: user?.role,
  };

  const accessToken: string = Jwt.sign(tokenUser, jwtSecretKey, {
    expiresIn: jwtSecretKeyExpiry,
    issuer: encrypt(issuer, encryptionKey),
    audience: encrypt(audience, encryptionKey),
  });
  const refreshToken: string = Jwt.sign(tokenUser, jwtRefreshKey, {
    expiresIn: jwtRefreshKeyExpiry,
    issuer: encrypt(issuer, encryptionKey),
    audience: encrypt(audience, encryptionKey),
  });

  return {
    accessToken,
    refreshToken,
  } as IToken;
};
