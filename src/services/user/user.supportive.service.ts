import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { Env } from "../env";
import { compare } from "bcrypt";
import { StatusCode, Message } from "../../constant";
import { HttpException } from "../../exception";
import { IChangePassword, IUser } from "../../interface";

export const changePasswordValidation = async (
  user: IUser,
  value: IChangePassword
): Promise<void> => {
  if (!user)
    throw new HttpException(StatusCode.UNAUTHORIZED, Message.UNAUTHORIZED);

  if (!(await compare(value.currentPassword, user.password)))
    throw new HttpException(
      StatusCode.BAD_REQUEST,
      Message.NOT_MATCH_CURRENT_PASSWORD
    );

  if (await compare(value.newPassword, user.password))
    throw new HttpException(
      StatusCode.BAD_REQUEST,
      Message.SAME_NEW_CURRENT_PASSWORD
    );
};

/**
 * The function `uploadPictureToCloudinaryService` uploads a picture to Cloudinary using the provided file path.
 */
export const uploadPictureToCloudinaryService = async (
  filePath: string
): Promise<UploadApiResponse> =>
  await cloudinary.uploader.upload(filePath, {
    folder: String(Env.get("CLOUDINARY_STORAGE_FOLDER")),
    use_filename: true,
    unique_filename: false,
    resource_type: "image",
  });
