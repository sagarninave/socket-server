import { IAuthRequest, IAuthUser } from "../interface";
import { HttpException, TryCatch } from "../exception";
import { Message, StatusCode } from "../constant";
import { Response, NextFunction } from "express";
import { decrypt } from "../utils";
import { Env } from "../services";
import jwt from "jsonwebtoken";

/**
 * The AuthGuard function is used to verify and decode a JWT token from the request headers for
 * authentication purposes.
 */
const AuthGuard = TryCatch(
  async (
    req: IAuthRequest,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token: string = req.headers["authorization"];
    if (!token) throwHttpTokenException();

    const tokenKeys = token.split(" ");
    if (tokenKeys.length < 2) throwHttpTokenException();

    const isDecoded: unknown = await getVerifiedToken(tokenKeys[1]);
    checkTokenAndExpiry(isDecoded);
    checkIssuerAndAudience(isDecoded);

    req.user = getRequestUser(isDecoded);
    next();
  }
);

/**
 * The function `throwHttpTokenException` throws an `HttpException` with an unauthorized token message
 * and status code.
 */
const throwHttpTokenException = (message = ""): void => {
  throw new HttpException(
    StatusCode?.UNAUTHORIZED,
    message || Message?.UNAUTHORIZED_TOKEN
  );
};

/**
 * The function `getVerifiedToken` asynchronously verifies a token using a JWT secret key retrieved
 * from the environment configuration.
 */
const getVerifiedToken = async (token: string): Promise<unknown> => {
  try {
    return await jwt.verify(token, Env.get("JWT_ACCESS_TOKEN_SECRET_KEY"));
  } catch (error) {
    throwHttpTokenException(Message?.INVALID_JWT);
  }
};

/**
 * The function `checkTokenAndExpiry` validates a decoded token and checks its expiry date.
 */
const checkTokenAndExpiry = (isDecoded): void => {
  if (!isDecoded) throwHttpTokenException();

  const expiryDate = new Date(isDecoded?.exp * 1000);
  if (isDecoded && new Date() > expiryDate) throwHttpTokenException();
};

/**
 * The function `checkIssuerAndAudience` validates the issuer and audience of a decoded token using
 * encryption keys and environment configuration.
 */
const checkIssuerAndAudience = (isDecoded): void => {
  const encryptionKey: string = String(Env.get("ENCRYPTION_KEY"));
  const issuer: string = String(Env.get("ISSUER"));
  const audience: string = String(Env.get("AUDIENCE"));

  const audienceDecoded: string = decrypt(isDecoded?.aud, encryptionKey);
  const issuerDecoded: string = decrypt(isDecoded?.iss, encryptionKey);

  if (issuerDecoded !== issuer) throwHttpTokenException();
  if (audienceDecoded !== audience) throwHttpTokenException();
};

/**
 * The function getRequestUser returns user information based on a decoded object.
 */
const getRequestUser = (isDecoded): IAuthUser => ({
  id: isDecoded?._id,
  firstName: isDecoded?.firstName,
  lastName: isDecoded?.lastName,
  email: isDecoded?.email,
  role: isDecoded?.role,
});

export default AuthGuard;
