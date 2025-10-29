import { postmanRequestBody, postmanRequestUrl } from "../../utils";
import { Item, Header } from "postman-collection";
import { Route } from "../../constant";

export default new Item({
  name: "Update User Profile",
  request: {
    url: postmanRequestUrl(Route?.USER, Route?.UPDATE_PROFILE),
    method: "PUT",
    body: {
      mode: "raw",
      raw: postmanRequestBody({
        firstName: "sagar",
        lastName: "ninave",
      }),
    },
    header: [new Header({ key: "Content-Type", value: "application/json" })],
    auth: {
      type: "bearer",
      bearer: [{ key: "token", value: "{{authToken}}" }],
    },
  },
});
