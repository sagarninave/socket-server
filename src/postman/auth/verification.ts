import { postmanRequestBody, postmanRequestUrl } from "../../utils";
import { Item, Header } from "postman-collection";
import { Route } from "../../constant";

export default new Item({
  name: "Verification",
  request: {
    url: postmanRequestUrl(Route?.AUTH, Route?.VERIFICATION),
    method: "PUT",
    body: {
      mode: "raw",
      raw: postmanRequestBody({
        userId: "68c998f39a6c15776f3f3125",
        verificationToken: "68c9a25cf2d64c61c1655997",
      }),
    },
    header: [new Header({ key: "Content-Type", value: "application/json" })],
  },
});
