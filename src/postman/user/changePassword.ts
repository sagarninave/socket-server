import { postmanRequestBody, postmanRequestUrl } from "../../utils";
import { Item, Header } from "postman-collection";
import { Route } from "../../constant";

export default new Item({
  name: "Change Password",
  request: {
    url: postmanRequestUrl(Route?.USER, Route?.CHANGE_PASSWORD),
    method: "PUT",
    body: {
      mode: "raw",
      raw: postmanRequestBody({
        currentPassword: "Password@123",
        newPassword: "Password@12345",
        confirmPassword: "Password@12345",
      }),
    },
    header: [new Header({ key: "Content-Type", value: "application/json" })],
    auth: {
      type: "bearer",
      bearer: [{ key: "token", value: "{{authToken}}" }],
    },
  },
});
