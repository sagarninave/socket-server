import { VERSION } from "../constant";

export const postmanRequestUrl = (
  module: string = "",
  controller: string = ""
): string => {
  return `{{baseUrl}}${VERSION}${module}${controller}`;
};

export const postmanRequestBody = (body): string =>
  JSON.stringify(body, null, 2);
