import { Mongoose, Cloudinary } from "./src/config";
import { Env, Scheduler } from "./src/services";
import app from "./src/app";

const port: number = +Env.get("PORT");

app.listen(port, (): void => {
  Mongoose;
  Cloudinary;
  Scheduler;
  process.stdout.write(`listening on http://localhost:${port}\n`);
});
