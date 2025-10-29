import { StatusCode } from "../constant";

class HttpException extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message.replace(/['"]+/g, ""));
    this.statusCode = statusCode ?? StatusCode?.INTERNAL_SERVER_ERROR;

    Object.setPrototypeOf(this, HttpException.prototype);
  }
}

export default HttpException;
