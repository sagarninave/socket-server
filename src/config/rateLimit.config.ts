import { Request, Response } from "express";
import { Message, StatusCode } from "../constant";
import { apiResponse } from "../utils";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

const RateLimiter: RateLimitRequestHandler = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  handler: (_req: Request, res: Response): void => {
    res
      .status(StatusCode?.TOO_MANY_REQUESTS)
      .json(apiResponse(false, Message?.RATE_LIMIT, null));
  },
});

export default RateLimiter;
