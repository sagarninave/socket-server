import { IAuthRequest } from "../interface";
import { Message, StatusCode } from "../constant";
import { Response, NextFunction } from "express";
import { HttpException, TryCatch } from "../exception";

/**
 * The RoleGuard function checks if the user's role is included in a specified array of roles and
 * throws a forbidden exception if not.
 */
const RoleGuard = (roles: string[]) =>
  TryCatch(
    async (
      req: IAuthRequest,
      _res: Response,
      next: NextFunction
    ): Promise<void> => {
      const role: string | undefined = req.user?.role;

      if (!role || !roles.includes(role)) {
        throw new HttpException(StatusCode.FORBIDDEN, Message.FORBIDDEN);
      }

      next();
    }
  );

export default RoleGuard;
