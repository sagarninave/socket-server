import { postmanRequestBody, postmanRequestUrl } from "../../utils";
import { Item, Header } from "postman-collection";
import { Route } from "../../constant";

export default new Item({
  name: "Login",
  request: {
    url: postmanRequestUrl(Route?.AUTH, Route?.LOGIN),
    method: "POST",
    body: {
      mode: "raw",
      raw: postmanRequestBody({
        email: "sagarninave@gmail.com",
        password: "Password@123",
      }),
    },
    header: [new Header({ key: "Content-Type", value: "application/json" })],
  },
  events: [
    {
      listen: "test",
      script: {
        type: "text/javascript",
        exec: [
          "const jsonData = pm.response.json();",
          "pm.environment.set('authToken', jsonData.data.accessToken);",
        ],
      },
    },
  ],
});
