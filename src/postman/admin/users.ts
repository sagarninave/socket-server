import { postmanRequestUrl } from "../../utils";
import { Item } from "postman-collection";
import { Route } from "../../constant";

export default new Item({
  name: "Get Users List",
  request: {
    url: postmanRequestUrl(Route?.ADMIN, Route?.GET_ALL_USERS),
    method: "GET",
    header: [],
    auth: {
      type: "bearer",
      bearer: [{ key: "token", value: "{{authToken}}" }],
    },
  },
});
