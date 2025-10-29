import { ItemGroup } from "postman-collection";
import updateUserRole from "./updateUserRole";
import users from "./users";
import user from "./user";

const adminFolder = new ItemGroup({
  name: "Admin",
  item: [users, user, updateUserRole],
});

export default adminFolder;
