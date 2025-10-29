import { postmanRequestBody, postmanRequestUrl } from "../../utils";
import { Item, Header } from "postman-collection";
import { Route } from "../../constant";

export default new Item({
  name: "Sign up",
  request: {
    url: postmanRequestUrl(Route?.AUTH, Route?.SIGNUP),
    method: "POST",
    body: {
      mode: "raw",
      raw: postmanRequestBody({
        firstName: "sagar",
        lastName: "ninave",
        email: "sagarninave@gmail.com",
        password: "Password@123",
      }),
    },
    header: [new Header({ key: "Content-Type", value: "application/json" })],
  },
});
