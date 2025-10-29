/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from "joi";

const checkIsBodyAllowed = (schema: Joi.ObjectSchema) =>
  schema.unknown(false).error((errors: any) => {
    return errors.map((err) => {
      if (err.code === "object.unknown") {
        const label = err.local?.key?.replace(/([A-Z])/g, " $1").trim();
        return new Error(
          `${
            label.charAt(0).toUpperCase() + label.slice(1)
          } is not allowed in the request body`
        );
      }
      return err;
    });
  });

export default checkIsBodyAllowed;
