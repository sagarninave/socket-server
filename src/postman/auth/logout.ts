import { postmanRequestUrl } from "../../utils";
import { Item, Header } from "postman-collection";
import { Route } from "../../constant";

export default new Item({
  name: "Logout",
  request: {
    url: postmanRequestUrl(Route?.AUTH, Route?.LOG_OUT),
    method: "PUT",
    header: [new Header({ key: "Content-Type", value: "application/json" })],
    auth: {
      type: "bearer",
      bearer: [{ key: "token", value: "{{authToken}}" }],
    },
  },
});
