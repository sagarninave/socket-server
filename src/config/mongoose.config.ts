import { EMongoDbEnvironment } from "../enum";
import { Env } from "../services";
import Mongoose from "mongoose";

const mongoDbDatabase: string = String(Env.get("MONGO_DB_DATABASE"));

const getMongoDbUrl = (): string => {
  const env: string = String(Env.get("MONGO_DB_ENVIRONMENT"));
  if (env === EMongoDbEnvironment?.DEVELOPMENT) {
    return `mongodb://localhost:27017/${mongoDbDatabase}`;
  } else {
    const mongoDbUserName: string = String(Env.get("MONGO_DB_USERNAME"));
    const mongoDbPassword: string = String(Env.get("MONGO_DB_PASSWORD"));
    const mongoDbServer: string = String(Env.get("MONGO_DB_SERVER"));
    const mongoDbUrl: string = String(Env.get("MONGO_DB_URL"))
      .replace("<USERNAME>", mongoDbUserName)
      .replace("<PASSWORD>", mongoDbPassword.replace("@", "%40"))
      .replace("<SERVER>", mongoDbServer)
      .replace("<DATABASE>", mongoDbDatabase);
    return mongoDbUrl;
  }
};

Mongoose.connect(getMongoDbUrl());

Mongoose.connection.on("connected", () =>
  process.stdout.write(`Mongo DB connected: ${mongoDbDatabase}\n`)
);

Mongoose.connection.on("error", (error: Error) =>
  process.stdout.write(`Mongo DB error: ${error.message}\n`)
);

Mongoose.connection.on("disconnected", () =>
  process.stdout.write("Mongo DB disconnected\n")
);

export default Mongoose;
