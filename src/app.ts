import {
  errorController,
  indexController,
  invalidEndpointController,
} from "./controllers/app";
import { Env } from "./services";
import { AdminRouter, AuthRouter, UserRouter } from "./router";
import { Express } from "express-serve-static-core";
import { ENodeEnvironment } from "./enum";
import { Morgan, RateLimiter } from "./config";
import { Route, VERSION } from "./constant";
import SwaggerDocument from "./assets/swagger.json";
import swagger from "swagger-ui-express";
import express from "express";
import path from "path";
import cors from "cors";

const app: Express = express();

app.use(
  cors({
    origin: Env.get("AUDIENCE"), // your React app URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // allow cookies / auth headers if needed
  })
);

/* The line parse incoming requests with JSON payloads. */
app.use(express.json());

/* This middleware ensures that requests are limited to a certain count within a specified time frame.*/
app.use(RateLimiter);

/* The line setting up a route in the Express application for serving Swagger documentation. */
app.use(Route?.SWAGGER, swagger.serve, swagger.setup(SwaggerDocument));

if (Env.get("NODE_ENVIRONMENT") === ENodeEnvironment.DEVELOPMENT)
  app.use(Morgan);

app.use(
  express.static(path.join(__dirname, String(Env.get("STORAGE_DIRECTORY"))))
);

/* These lines of code are setting up index routes */
app.get(Route?.INDEX, indexController);

/* These lines of code are setting up modules routes in an Express application using the `app.use()` method. */
app.use(`${VERSION}${Route?.AUTH}`, AuthRouter);
app.use(`${VERSION}${Route?.USER}`, UserRouter);
app.use(`${VERSION}${Route?.ADMIN}`, AdminRouter);

/* These lines of code are setting up wildcard route to handle not found api */
app.use(Route.NOT_FOUND, invalidEndpointController);

/* Handles errors occurring during request processing. */
app.use(errorController);

export default app;
