import {
  getAllUsersController,
  getUserController,
  updateUserRoleController,
} from "../controllers/admin";
import { EUserRoles } from "../enum";
import { Route } from "../constant";
import { AuthGuard, RoleGuard } from "../guard";
import { Router } from "express-serve-static-core";
import { TryCatch } from "../exception";
import express from "express";

const router: Router = express.Router();

router.get(
  Route?.GET_ALL_USERS,
  AuthGuard,
  RoleGuard([EUserRoles?.ADMIN, EUserRoles?.MANAGER, EUserRoles?.MEMBER]),
  TryCatch(getAllUsersController)
);

router.get(
  Route?.GET_USER,
  AuthGuard,
  RoleGuard([EUserRoles?.ADMIN, EUserRoles?.MANAGER, EUserRoles?.MEMBER]),
  TryCatch(getUserController)
);

router.put(
  Route?.UPDATE_USER_ROLE,
  AuthGuard,
  RoleGuard([EUserRoles?.ADMIN, EUserRoles?.MANAGER]),
  TryCatch(updateUserRoleController)
);

export default router;
