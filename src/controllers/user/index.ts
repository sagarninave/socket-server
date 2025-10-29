import {
  changePasswordService,
  profileService,
  updateProfileService,
  uploadProfilePictureService,
} from "../../services";
import { Response } from "express";
import { apiResponse } from "../../utils";
import { StatusCode, Message } from "../../constant";
import { IAuthRequest, IUser } from "../../interface";

/**
 * The profileController function in TypeScript handles requests to retrieve user profile details and
 * sends appropriate responses based on the outcome.
 */
export const profileController = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  const isUser: IUser = await profileService(req?.user?.id);
  if (isUser) {
    res
      .status(StatusCode?.OK)
      .json(apiResponse(true, Message?.GET_PROFILE, isUser));
  } else {
    res
      .status(StatusCode?.INTERNAL_SERVER_ERROR)
      .json(apiResponse(false, Message?.SOMETHING_WENT_WRONG, null));
  }
};

/**
 * The `updateProfileController` function in TypeScript handles updating a user's profile and sends
 * appropriate responses based on the outcome.
 */
export const updateProfileController = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  const isUser: IUser = await updateProfileService(req?.user?.id, req?.body);
  if (isUser) {
    res
      .status(StatusCode?.OK)
      .json(apiResponse(true, Message?.UPDATE_PROFILE, isUser));
  } else {
    res
      .status(StatusCode?.INTERNAL_SERVER_ERROR)
      .json(apiResponse(false, Message?.SOMETHING_WENT_WRONG, null));
  }
};

/**
 * The function `changePasswordController` in TypeScript handles changing a user's password and sends
 * appropriate responses based on the outcome.
 */
export const changePasswordController = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  const isUser: IUser = await changePasswordService(req?.user?.id, req?.body);
  if (isUser) {
    res
      .status(StatusCode?.OK)
      .json(apiResponse(true, Message?.CHANGE_PASSWORD, isUser));
  } else {
    res
      .status(StatusCode?.INTERNAL_SERVER_ERROR)
      .json(apiResponse(false, Message?.SOMETHING_WENT_WRONG, null));
  }
};

/**
 * The function `uploadProfilePictureController` handles the uploading of a user's profile picture
 * */
export const uploadProfilePictureController = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  const user: IUser = await uploadProfilePictureService(
    req?.user?.id,
    req["file"].path
  );
  if (user) {
    res
      .status(StatusCode?.OK)
      .json(apiResponse(true, Message?.PROFILE_PICTURE_UPLOADED, user));
  } else {
    res
      .status(StatusCode?.INTERNAL_SERVER_ERROR)
      .json(apiResponse(false, Message?.SOMETHING_WENT_WRONG, null));
  }
};
