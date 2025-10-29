import { postmanRequestUrl } from "../../utils";
import { Item, Header, Url } from "postman-collection";
import { Route } from "../../constant";

export default new Item({
  name: "Reset Password",
  request: {
    url: new Url({
      host: postmanRequestUrl(
        Route.AUTH,
        Route?.RESET_PASSWORD.replace("/:email", "")
      ),
      path: [":email"],
      variable: [{ key: "email", value: "sagarninave@gmail.com" }],
    }).toString(),
    method: "PUT",
    header: [new Header({ key: "Content-Type", value: "application/json" })],
  },
});
