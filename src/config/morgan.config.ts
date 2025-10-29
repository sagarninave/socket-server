import { Request } from "express";
import morgan from "morgan";

morgan.token("host", (req: Request) => req.hostname);
morgan.token("url", (req: Request) => req.url);

export default morgan(":host :method :url :status :response-time ms");
