import { postmanRequestUrl } from "../../utils";
import { Item, Url } from "postman-collection";
import { Route } from "../../constant";

export default new Item({
  name: "Get User Details",
  request: {
    url: new Url({
      host: postmanRequestUrl(Route.ADMIN, Route?.USER),
      path: [":id"],
      variable: [{ key: "id", value: "68c998f39a6c15776f3f3125" }],
      query: [],
    }).toString(),
    method: "GET",
    header: [],
    auth: {
      type: "bearer",
      bearer: [{ key: "token", value: "{{authToken}}" }],
    },
  },
});
