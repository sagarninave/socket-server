import { postmanRequestBody, postmanRequestUrl } from "../../utils";
import { Item, Header } from "postman-collection";
import { Route } from "../../constant";

export default new Item({
  name: "Set New Password",
  request: {
    url: postmanRequestUrl(Route?.AUTH, Route?.SET_NEW_PASSWORD),
    method: "PUT",
    body: {
      mode: "raw",
      raw: postmanRequestBody({
        userId: "68c998f39a6c15776f3f3125",
        token: "68c9a25cf2d64c61c1655997",
        newPassword: "Password@123",
        confirmPassword: "Password@123",
      }),
    },
    header: [new Header({ key: "Content-Type", value: "application/json" })],
  },
});
