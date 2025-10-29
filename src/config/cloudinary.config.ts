import { v2 as cloudinary } from "cloudinary";
import { Env } from "../services";

export default cloudinary.config({
  cloud_name: String(Env.get("CLOUDINARY_NAME")),
  api_key: String(Env.get("CLOUDINARY_API_KEY")),
  api_secret: String(Env.get("CLOUDINARY_API_SECRET")),
});
