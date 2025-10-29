import {
  signupController,
  loginController,
  verificationController,
  resendVerificationController,
  resetPasswordController,
  setNewPasswordController,
  logoutController,
} from "../controllers/auth";
import { AuthGuard } from "../guard";
import { Router } from "express-serve-static-core";
import { Route } from "../constant";
import { TryCatch } from "../exception";
import express from "express";

const router: Router = express.Router();

router.post(Route?.SIGNUP, TryCatch(signupController));
router.post(Route?.LOGIN, TryCatch(loginController));
router.put(Route?.VERIFICATION, TryCatch(verificationController));
router.put(Route?.RESEND_VERIFICATION, TryCatch(resendVerificationController));
router.put(Route?.RESET_PASSWORD, TryCatch(resetPasswordController));
router.put(Route?.SET_NEW_PASSWORD, TryCatch(setNewPasswordController));
router.put(Route?.LOG_OUT, AuthGuard, TryCatch(logoutController));

export default router;
