import { postmanRequestUrl } from "../../utils";
import { Item, Header, FormParam } from "postman-collection";
import { Route } from "../../constant";

export default new Item({
  name: "Update Profile Picture",
  request: {
    url: postmanRequestUrl(Route?.USER, Route?.UPLOAD_PROFILE_PICTURE),
    method: "PUT",
    body: {
      mode: "formdata",
      formdata: [
        new FormParam({
          key: "image",
          value: "./pathway.png", // file path
        }),
      ],
    },
    header: [new Header({ key: "Content-Type", value: "application/json" })],
    auth: {
      type: "bearer",
      bearer: [{ key: "token", value: "{{authToken}}" }],
    },
  },
});
