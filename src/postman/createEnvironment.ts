import { Variable } from "postman-collection";
import { Env } from "../services";

const environment = {
  id: "dev-env-id",
  name: String(Env.get("NODE_ENVIRONMENT")),
  values: [
    new Variable({ key: "baseUrl", value: String(Env.get("ISSUER")) }),
    new Variable({ key: "authToken", value: "SOME_TOKEN" }),
  ],
};

export default environment;
