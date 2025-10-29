import { Collection } from "postman-collection";
import authRequests from "./auth";
import adminRequests from "./admin";
import userRequest from "./user";

const postmanCollection = new Collection({
  info: {
    name: "Boilerplate",
  },
  item: [authRequests, adminRequests, userRequest],
});

export default postmanCollection;
