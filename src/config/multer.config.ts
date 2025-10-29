import { IAuthRequest } from "../interface";
import { Message, StatusCode } from "../constant";
import { HttpException } from "../exception";
import { v4 as UUID } from "uuid";
import { Env } from "../services";
import multer, { StorageEngine } from "multer";
import file from "fs";

const extList: string[] = ["png", "jpg", "gif", "jpeg", "jfif"];
const storagePath: string = String(Env.get("STORAGE_DIRECTORY"));

const destination = (
  _req: IAuthRequest,
  _file: Express.Multer.File,
  cb: (error: Error | null, destination: string) => void
): void => {
  if (!file.existsSync(storagePath)) {
    file.mkdirSync(storagePath);
  }
  cb(null, storagePath);
};

const fileName = (
  _req: IAuthRequest,
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string) => void
): void => {
  cb(null, `${UUID()}-${file?.originalname}`);
};

const storage: StorageEngine = multer.diskStorage({
  destination: destination,
  filename: fileName,
});

const fileFilter = (
  req: IAuthRequest,
  file: Express.Multer.File,
  cb: (value1: unknown, value2: unknown) => void
): void => {
  const fileNameFragments: string[] = file.originalname.split(".");
  const ext: string =
    fileNameFragments[fileNameFragments.length - 1].toLocaleLowerCase();
  if (!extList.includes(ext)) {
    return cb(
      new HttpException(
        StatusCode?.BAD_REQUEST,
        Message?.ONLY_IMAGES_ALLOWED.replace("image", extList.join(", "))
      ),
      false
    );
  }
  cb(null, true);
};

const fileSize = {
  fieldSize: 1024 * 1024,
};

export default multer({
  fileFilter: fileFilter,
  storage: storage,
  limits: fileSize,
});
