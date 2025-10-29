import { postmanRequestUrl } from "../../utils";
import { Item, Header } from "postman-collection";
import { Route } from "../../constant";

export default new Item({
  name: "Get User Profile",
  request: {
    url: postmanRequestUrl(Route?.USER, Route?.GET_PROFILE),
    method: "GET",
    header: [new Header({ key: "Content-Type", value: "application/json" })],
    auth: {
      type: "bearer",
      bearer: [{ key: "token", value: "{{authToken}}" }],
    },
  },
});
