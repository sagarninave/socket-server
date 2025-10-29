import {
  changePasswordController,
  profileController,
  updateProfileController,
  uploadProfilePictureController,
} from "../controllers/user";
import { Router } from "express-serve-static-core";
import { Route } from "../constant";
import { AuthGuard } from "../guard";
import { Multer } from "../config";
import { TryCatch } from "../exception";
import express from "express";

const router: Router = express.Router();

router.get(Route?.GET_PROFILE, AuthGuard, TryCatch(profileController));
router.put(Route?.UPDATE_PROFILE, AuthGuard, TryCatch(updateProfileController));
router.put(
  Route?.CHANGE_PASSWORD,
  AuthGuard,
  TryCatch(changePasswordController)
);
router.put(
  Route?.UPLOAD_PROFILE_PICTURE,
  AuthGuard,
  Multer.single("image"),
  TryCatch(uploadProfilePictureController)
);

export default router;
