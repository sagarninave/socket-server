import {
  getAllUsersService,
  getUserService,
  updateUserRoleService,
} from "../../services";
import { IAuthRequest, IUser } from "../../interface";
import { StatusCode, Message } from "../../constant";
import { apiResponse } from "../../utils";
import { Response } from "express";

/**
 * The function getAllUsersController handles requests to retrieve all users and sends appropriate
 * responses based on the outcome.
 */
export const getAllUsersController = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  const isUser: IUser[] = await getAllUsersService(req.query);
  if (isUser) {
    res
      .status(StatusCode?.OK)
      .json(apiResponse(true, Message?.GET_ALL_USERS, isUser));
  } else {
    res
      .status(StatusCode?.INTERNAL_SERVER_ERROR)
      .json(apiResponse(false, Message?.SOMETHING_WENT_WRONG, null));
  }
};

/**
 * The function getUserController retrieves a user based on the provided ID and sends a response with
 * the user data or an error message.
 */
export const getUserController = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  const isUser: IUser = await getUserService(req?.params?.id);
  if (isUser) {
    res
      .status(StatusCode?.OK)
      .json(apiResponse(true, Message?.GET_USER, isUser));
  } else {
    res
      .status(StatusCode?.INTERNAL_SERVER_ERROR)
      .json(apiResponse(false, Message?.SOMETHING_WENT_WRONG, null));
  }
};

/**
 * The function updateUserRoleController updates a user's role and sends a response based on the
 * outcome.
 */
export const updateUserRoleController = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  const isUser: IUser = await updateUserRoleService(req?.user?.id, req.body);
  if (isUser) {
    res
      .status(StatusCode?.OK)
      .json(apiResponse(true, Message?.UPDATE_USER_ROLE, isUser));
  } else {
    res
      .status(StatusCode?.INTERNAL_SERVER_ERROR)
      .json(apiResponse(false, Message?.SOMETHING_WENT_WRONG, null));
  }
};
