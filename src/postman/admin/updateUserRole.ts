import { postmanRequestBody, postmanRequestUrl } from "../../utils";
import { Header, Item } from "postman-collection";
import { Route } from "../../constant";

export default new Item({
  name: "Update User Role",
  request: {
    url: postmanRequestUrl(Route.ADMIN, Route?.UPDATE_USER_ROLE),
    method: "PUT",
    body: {
      mode: "raw",
      raw: postmanRequestBody({
        userId: "68c998f39a6c15776f3f3125",
        role: "member",
      }),
    },
    header: [
      new Header({
        key: "Content-Type",
        value: "application/json",
      }),
    ],
    auth: {
      type: "bearer",
      bearer: [{ key: "token", value: "{{authToken}}" }],
    },
  },
});
