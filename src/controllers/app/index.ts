/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { Message, StatusCode } from "../../constant";
import { apiResponse } from "../../utils";
import { HttpException } from "../../exception";
import { IAuthRequest } from "../../interface";

/**
 * The `indexController` function in TypeScript sends a "Hello World" response using the Express
 * `Response` object.
 */
export const indexController = (_req: Request, res: Response): void => {
  res
    .status(StatusCode?.OK)
    .json(apiResponse(false, Message?.HELLO_WORLD, null));
};

/**
 * The function `invalidEndpointController` handles requests to invalid endpoints by returning a 404
 * status code and a corresponding error message.
 */
export const invalidEndpointController = (
  req: IAuthRequest,
  res: Response
): void => {
  res
    .status(StatusCode?.NOT_FOUND)
    .json(
      apiResponse(
        false,
        Message?.INVALID_ENDPOINT.replace("<URL>", req.originalUrl),
        null
      )
    );
};

/**
 * The errorController function handles errors by sending an internal server error response with the
 * error message.
 */
export const errorController = (
  error: HttpException,
  _req: IAuthRequest,
  res: Response,
  next: NextFunction
): void => {
  res
    .status(error?.statusCode || StatusCode?.INTERNAL_SERVER_ERROR)
    .json(
      apiResponse(false, error?.message || Message?.SOMETHING_WENT_WRONG, null)
    );
};
