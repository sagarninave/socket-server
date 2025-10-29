import { ItemGroup } from "postman-collection";
import signup from "./signup";
import login from "./login";
import verification from "./verification";
import resendVerification from "./resendVerification";
import setNewPassword from "./setNewPassword";
import resetPassword from "./resetPassword";
import logout from "./logout";

const authFolder = new ItemGroup({
  name: "Auth",
  item: [
    signup,
    login,
    verification,
    resendVerification,
    setNewPassword,
    resetPassword,
    logout,
  ],
});

export default authFolder;
