import { ItemGroup } from "postman-collection";
import getUserProfile from "./Profile";
import updateUserProfile from "./updateProfile";
import changePassword from "./changePassword";
import updateProfilePicture from "./updateProfilePicture";

const userFolder = new ItemGroup({
  name: "User",
  item: [
    getUserProfile,
    updateUserProfile,
    changePassword,
    updateProfilePicture,
  ],
});

export default userFolder;
