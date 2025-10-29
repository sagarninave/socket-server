import { Env } from "../services";
import PostmanCollection from "./createCollection";
import Environment from "./createEnvironment";
import path from "path";
import fs from "fs";

const env: string = String(Env.get("NODE_ENVIRONMENT"));

if (env === "development") {
  try {
    const collectionPath: string = path.resolve(
      "./src/postman/output/collection.json"
    );
    const environmentFilePath: string = path.resolve(
      "./src/postman/output/environment.json"
    );

    const outputDirectory = path.resolve("./src/postman/output");
    if (!fs.existsSync(outputDirectory))
      fs.mkdirSync(outputDirectory, { recursive: true });

    fs.writeFileSync(
      collectionPath,
      JSON.stringify(PostmanCollection, null, 2)
    );

    fs.writeFileSync(environmentFilePath, JSON.stringify(Environment, null, 2));

    console.log("✔ Postman environment created successfully.");
    process.exit();
  } catch (error) {
    console.log(
      `❌ Failed created successfully.\nPostman Error: ${error?.message}`
    );
    process.exit();
  }
} else {
  process.exit();
}
